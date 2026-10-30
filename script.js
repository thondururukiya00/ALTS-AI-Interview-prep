// =========================================================
// Enterprise AI Interview Proctoring System
// (Webcam HUD, Fullscreen Enforcement, Multi-Tab & Blur Defense, Strike System)
// =========================================================
(function initProctoringEngine() {
    const currentPath = window.location.pathname.toLowerCase();
    const isInterviewPage = currentPath.includes("aptitude.html") ||
        currentPath.includes("gd.html") ||
        currentPath.includes("tech.html") ||
        currentPath.includes("hr.html");

    if (!isInterviewPage) return;

    // Ensure proctoring stylesheet is loaded
    if (!document.querySelector('link[href*="proctoring.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "proctoring.css";
        document.head.appendChild(link);
    }

    const MAX_STRIKES = 3;
    let webcamStream = null;
    let isRequestingCamera = false;
    let isModalOpen = false;
    let isNavigatingAway = false;
    let lastViolationTime = 0;

    // Determine current round name for logs
    function getCurrentRoundName() {
        if (currentPath.includes("aptitude.html")) return "Round 1 (Aptitude)";
        if (currentPath.includes("gd.html")) return "Round 2 (GD)";
        if (currentPath.includes("tech.html")) return "Round 3 (Technical)";
        if (currentPath.includes("hr.html")) return "Round 4 (HR)";
        return "Interview Round";
    }

    // Audio Alert via Web Audio API (Native, no external MP3 dependencies)
    function playWarningTone(isCritical = false) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = isCritical ? "sawtooth" : "sine";
            const now = ctx.currentTime;
            if (isCritical) {
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(880, now + 0.15);
                osc.frequency.setValueAtTime(440, now + 0.3);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else {
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            }
        } catch (e) {
            // Audio context not allowed prior to user gesture or disabled
        }
    }

    // Floating Security Toast Notification
    function showProctorToast(message) {
        let toast = document.getElementById("proctorToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "proctorToast";
            toast.className = "proctor-toast";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>${message}</span>`;
        toast.classList.add("visible");
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove("visible");
        }, 3000);
    }

    // Fullscreen helper
    function requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => { });
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    function isFullscreenActive() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    }

    // Strikes and Log Management
    function getStrikes() {
        return parseInt(localStorage.getItem("proctoringStrikes"), 10) || 0;
    }

    function setStrikes(count) {
        localStorage.setItem("proctoringStrikes", count.toString());
    }

    function getViolationLogs() {
        try {
            return JSON.parse(localStorage.getItem("proctoringLogs")) || [];
        } catch (e) {
            return [];
        }
    }

    function addViolationLog(reason) {
        const logs = getViolationLogs();
        logs.push({
            time: new Date().toLocaleTimeString(),
            round: getCurrentRoundName(),
            reason: reason
        });
        localStorage.setItem("proctoringLogs", JSON.stringify(logs));
    }

    // Update the HUD Badge
    function updateHudStrikeBadge(strikes) {
        const badge = document.getElementById("proctorStrikeBadge");
        if (!badge) return;

        badge.className = "proctor-strike-badge";
        if (strikes === 0) {
            badge.classList.add("clean");
            badge.innerHTML = `<i class="fa-solid fa-shield-check"></i> 0 / ${MAX_STRIKES} Strikes`;
        } else if (strikes === 1) {
            badge.classList.add("warn-1");
            badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> 1 / ${MAX_STRIKES} Strike`;
        } else if (strikes === 2) {
            badge.classList.add("warn-2");
            badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> 2 / ${MAX_STRIKES} Strikes`;
        } else {
            badge.classList.add("danger");
            badge.innerHTML = `<i class="fa-solid fa-ban"></i> Flagged (${strikes}/${MAX_STRIKES})`;
        }
    }

    // Violation Modal Dialog
    function showViolationModal(reason, currentStrikes) {
        if (isNavigatingAway) return;
        isModalOpen = true;

        const oldModal = document.getElementById("proctorModalOverlay");
        if (oldModal) oldModal.remove();

        const isDisqualified = currentStrikes >= MAX_STRIKES;
        playWarningTone(isDisqualified);

        const overlay = document.createElement("div");
        overlay.id = "proctorModalOverlay";
        overlay.className = "proctor-modal-overlay";

        let strikesHtml = "";
        for (let i = 1; i <= MAX_STRIKES; i++) {
            const filled = i <= currentStrikes ? "filled" : "";
            strikesHtml += `
                <div class="proctor-strike-dot">
                    <div class="proctor-strike-circle ${filled}">
                        ${filled ? '<i class="fa-solid fa-xmark"></i>' : i}
                    </div>
                    <span>Strike ${i}</span>
                </div>
            `;
        }

        overlay.innerHTML = `
            <div class="proctor-modal">
                <div class="proctor-modal-icon">
                    <i class="fa-solid ${isDisqualified ? 'fa-ban' : 'fa-triangle-exclamation'}"></i>
                </div>
                <h2>${isDisqualified ? 'Assessment Disqualified / Flagged' : 'Security Warning: Violation Detected'}</h2>
                <p class="proctor-modal-desc">
                    <strong>${reason}</strong>
                    <br><br>
                    <span style="color: #94a3b8; font-size: 13px;">
                        ${isDisqualified
                ? 'Maximum allowed infractions exceeded. Your session has been flagged for audit review. Redirecting to final results...'
                : 'All tests must strictly remain in full-screen mode without switching tabs or losing focus.'}
                    </span>
                </p>

                <div class="proctor-modal-strikes">
                    ${strikesHtml}
                </div>

                <div class="proctor-modal-actions">
                    ${isDisqualified
                ? `<button id="proctorModalProceedBtn" class="proctor-modal-btn danger">
                                <i class="fa-solid fa-flag"></i> Submit Assessment & View Report
                           </button>`
                : `<button id="proctorModalResumeBtn" class="proctor-modal-btn">
                                <i class="fa-solid fa-expand"></i> Re-enter Fullscreen & Resume
                           </button>`
            }
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        if (isDisqualified) {
            localStorage.setItem("proctoringFlagged", "true");
            const btn = document.getElementById("proctorModalProceedBtn");
            if (btn) {
                btn.addEventListener("click", () => {
                    isNavigatingAway = true;
                    overlay.remove();
                    window.location.href = "result.html";
                });
            }
            // Auto redirect after 4 seconds if no action taken
            setTimeout(() => {
                if (!isNavigatingAway) {
                    isNavigatingAway = true;
                    window.location.href = "result.html";
                }
            }, 4000);
        } else {
            const btn = document.getElementById("proctorModalResumeBtn");
            if (btn) {
                btn.addEventListener("click", () => {
                    requestFullscreen();
                    isModalOpen = false;
                    overlay.remove();
                });
            }
        }
    }

    // Violation Recorder with Debounce
    function recordViolation(reason) {
        if (isNavigatingAway || isRequestingCamera) return;

        const now = Date.now();
        if (now - lastViolationTime < 2500) return; // Prevent rapid cascade
        lastViolationTime = now;

        let strikes = getStrikes() + 1;
        setStrikes(strikes);
        addViolationLog(reason);
        updateHudStrikeBadge(strikes);
        showViolationModal(reason, strikes);
    }

    // Build Floating PIP HUD
    function renderProctorHud() {
        if (document.getElementById("proctorHud")) return;

        const hud = document.createElement("div");
        hud.id = "proctorHud";
        hud.className = "proctor-hud";

        hud.innerHTML = `
            <div class="proctor-header" id="proctorHeader">
                <div class="proctor-title-wrap">
                    <span class="proctor-rec-dot"></span>
                    <span>AI Proctor Active</span>
                </div>
                <button id="proctorToggleBtn" class="proctor-toggle-btn" title="Minimize / Expand HUD">
                    <i class="fa-solid fa-compress" id="proctorToggleIcon"></i>
                </button>
            </div>
            <div class="proctor-body">
                <div class="proctor-video-wrap">
                    <video id="proctorVideo" class="proctor-video" autoplay playsinline muted></video>
                    <div class="proctor-face-mesh">
                        <span class="proctor-live-badge"><i class="fa-solid fa-shield"></i> LIVE FEED</span>
                    </div>
                    <div id="proctorCamFallback" class="proctor-cam-fallback" style="display: none;">
                        <i class="fa-solid fa-video-slash"></i>
                        <span>Webcam feed unavailable or denied.</span>
                        <button id="proctorRetryCamBtn" class="proctor-retry-cam-btn">Request Access</button>
                    </div>
                </div>
            </div>
            <div class="proctor-footer">
                <div class="proctor-status-row">
                    <span style="color: #94a3b8; font-size: 11px;">Status:</span>
                    <span id="proctorStrikeBadge" class="proctor-strike-badge clean">
                        <i class="fa-solid fa-shield-check"></i> 0 / ${MAX_STRIKES} Strikes
                    </span>
                </div>
                <div class="proctor-action-row">
                    <button id="proctorFullscreenBtn" class="proctor-btn-fullscreen" title="Toggle Fullscreen Mode">
                        <i class="fa-solid fa-expand"></i> Fullscreen Mode
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(hud);
        updateHudStrikeBadge(getStrikes());

        // Toggle Minimize / Expand
        const toggleBtn = document.getElementById("proctorToggleBtn");
        const toggleIcon = document.getElementById("proctorToggleIcon");
        toggleBtn.addEventListener("click", () => {
            hud.classList.toggle("minimized");
            if (hud.classList.contains("minimized")) {
                toggleIcon.className = "fa-solid fa-expand";
            } else {
                toggleIcon.className = "fa-solid fa-compress";
            }
        });

        // Fullscreen Button
        const fsBtn = document.getElementById("proctorFullscreenBtn");
        fsBtn.addEventListener("click", () => {
            if (!isFullscreenActive()) {
                requestFullscreen();
            } else {
                showProctorToast("Fullscreen is already active.");
            }
        });

        // Retry Camera Button
        const retryBtn = document.getElementById("proctorRetryCamBtn");
        if (retryBtn) {
            retryBtn.addEventListener("click", setupWebcam);
        }

        // Initialize Webcam
        setupWebcam();
    }

    // Webcam Setup
    function setupWebcam() {
        const video = document.getElementById("proctorVideo");
        const fallback = document.getElementById("proctorCamFallback");
        if (!video) return;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            if (fallback) fallback.style.display = "flex";
            localStorage.setItem("proctoringCamStatus", "Not Supported");
            return;
        }

        isRequestingCamera = true;
        navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 320 },
                height: { ideal: 240 },
                facingMode: "user"
            },
            audio: false
        })
            .then(stream => {
                isRequestingCamera = false;
                webcamStream = stream;
                video.srcObject = stream;
                video.play().catch(() => { });
                if (fallback) fallback.style.display = "none";
                localStorage.setItem("proctoringCamStatus", "Verified Online");
            })
            .catch(err => {
                isRequestingCamera = false;
                if (fallback) fallback.style.display = "flex";
                localStorage.setItem("proctoringCamStatus", "Permission Denied / Unavailable");
                console.warn("Proctoring Webcam Access:", err.message);
            });
    }

    // Attach Event Listeners
    function attachProctorSecurityListeners() {
        // 1. Right Click Defense
        document.addEventListener("contextmenu", e => {
            e.preventDefault();
            showProctorToast("Right-click is disabled during proctored assessments.");
        });

        // 2. Keyboard Shortcuts (F12, DevTools, View Source, Print, Save)
        document.addEventListener("keydown", e => {
            const isF12 = e.key === "F12";
            const isDevTools = e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c");
            const isViewSource = e.ctrlKey && (e.key === "U" || e.key === "u");
            const isSaveOrPrint = e.ctrlKey && (e.key === "S" || e.key === "s" || e.key === "P" || e.key === "p");

            if (isF12 || isDevTools || isViewSource || isSaveOrPrint) {
                e.preventDefault();
                recordViolation(`Restricted developer / inspection shortcut triggered (${e.key}).`);
            }
        });

        // 3. Tab Visibility Switching
        document.addEventListener("visibilitychange", () => {
            if (document.hidden && !isNavigatingAway && !isRequestingCamera) {
                recordViolation("Tab switched away or browser minimized during assessment.");
            }
        });

        // 4. Window Focus Loss (Blur)
        window.addEventListener("blur", () => {
            if (!isNavigatingAway && !isRequestingCamera && !isModalOpen) {
                setTimeout(() => {
                    if (!document.hasFocus() && !isNavigatingAway && !isRequestingCamera && !isModalOpen) {
                        recordViolation("Window focus lost (switched application or secondary monitor clicked).");
                    }
                }, 350);
            }
        });

        // 5. Fullscreen Exit Detection
        const fsEvents = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
        fsEvents.forEach(evt => {
            document.addEventListener(evt, () => {
                const fsExits = parseInt(localStorage.getItem("proctoringFullscreenExits"), 10) || 0;
                localStorage.setItem("proctoringFullscreenExits", (fsExits + 1).toString());

                if (!isFullscreenActive() && !isNavigatingAway && !isModalOpen) {
                    recordViolation("Exited mandatory proctored full-screen mode.");
                }
            });
        });

        // 6. Copy / Cut Protection on Question Content
        document.addEventListener("copy", e => {
            if (currentPath.includes("tech.html")) {
                const target = e.target;
                if (target && target.id === "codeEditor") return; // Allow coding editor copy
            }
            e.preventDefault();
            showProctorToast("Copying content is disabled during assessments.");
        });

        document.addEventListener("cut", e => {
            if (currentPath.includes("tech.html")) {
                const target = e.target;
                if (target && target.id === "codeEditor") return;
            }
            e.preventDefault();
            showProctorToast("Cutting content is disabled during assessments.");
        });

        // 7. Mark navigation on beforeunload to prevent false strikes on round change
        window.addEventListener("beforeunload", () => {
            isNavigatingAway = true;
            if (webcamStream) {
                webcamStream.getTracks().forEach(track => track.stop());
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            renderProctorHud();
            attachProctorSecurityListeners();
        });
    } else {
        renderProctorHud();
        attachProctorSecurityListeners();
    }
})();


// ==========================================
// Global Toast & Round Transition Modal System
// ==========================================
window.showToast = function (message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.style.cssText = "position:fixed; top:24px; right:24px; z-index:999999; display:flex; flex-direction:column; gap:10px;";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const icons = {
        success: "fa-circle-check",
        error: "fa-triangle-exclamation",
        info: "fa-circle-info"
    };

    toast.className = `modern-toast toast-${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${icons[type] || 'fa-circle-info'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));

    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
};

window.showRoundTransitionModal = function (roundTitle, scoreText, nextRoundTitle, targetUrl) {
    const overlay = document.createElement("div");
    overlay.className = "proctor-modal-overlay";
    overlay.style.cssText = "position:fixed; inset:0; background:rgba(24, 21, 18, 0.82); z-index:100000; display:flex; align-items:center; justify-content:center; padding:20px;";

    overlay.innerHTML = `
        <div style="background:#faf8f5; border:1px solid #181512; max-width:480px; width:100%; padding:40px 36px; text-align:center; color:#181512; font-family:'Plus Jakarta Sans', sans-serif;">
            <div style="width:54px; height:54px; margin:0 auto 20px; border-radius:50%; background:rgba(200, 90, 50, 0.1); border:1px solid #c85a32; color:#c85a32; display:flex; align-items:center; justify-content:center; font-size:24px;">
                <i class="fa-solid fa-check"></i>
            </div>
            <h2 style="font-family:'Fraunces', Georgia, serif; font-size:24px; font-weight:500; margin-bottom:10px; color:#181512; letter-spacing:-0.02em;">${roundTitle} Completed</h2>
            <div style="display:inline-block; margin:8px 0 16px; padding:6px 16px; background:#f5f2eb; border:1px solid #dedad0; color:#c85a32; font-family:'Space Grotesk', sans-serif; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em;">
                ${scoreText}
            </div>
            <p style="color:#524d46; font-size:13.5px; line-height:1.6; margin-bottom:28px;">
                Your responses have been recorded and catalogued. Preparing calibrated assessment environment for <strong>${nextRoundTitle}</strong>...
            </p>
            <button id="modalAdvanceBtn" style="background:#181512; color:#faf8f5; border:1px solid #181512; padding:13px 28px; font-size:12.5px; font-family:'Space Grotesk', sans-serif; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; cursor:pointer; display:inline-flex; align-items:center; gap:10px; transition:all 0.2s ease;">
                <span>Proceed to ${nextRoundTitle}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    const advanceBtn = document.getElementById("modalAdvanceBtn");
    if (advanceBtn) {
        advanceBtn.addEventListener('mouseenter', () => { advanceBtn.style.background = '#c85a32'; advanceBtn.style.borderColor = '#c85a32'; });
        advanceBtn.addEventListener('mouseleave', () => { advanceBtn.style.background = '#181512'; advanceBtn.style.borderColor = '#181512'; });
    }

    let advanced = false;
    const advance = () => {
        if (advanced) return;
        advanced = true;
        overlay.remove();
        window.location.href = targetUrl;
    };

    if (advanceBtn) advanceBtn.addEventListener("click", advance);
    setTimeout(advance, 2200);
};

// ===============================
// Auth System (Login & Sign Up)
// ===============================

let authMode = "login"; // "login" or "signup"

function showAuthMessage(message, type) {
    const authMessage = document.getElementById("authMessage");
    if (authMessage) {
        authMessage.textContent = message;
        authMessage.className = "auth-message " + (type === "success" ? "success" : "error");
    }
}

function clearAuthMessage() {
    const authMessage = document.getElementById("authMessage");
    if (authMessage) {
        authMessage.textContent = "";
        authMessage.className = "auth-message";
    }
}

function toggleAuthMode() {
    authMode = authMode === "login" ? "signup" : "login";
    clearAuthMessage();

    const formTitle = document.getElementById("formTitle");
    const formSubtitle = document.getElementById("formSubtitle");
    const submitBtn = document.getElementById("submitBtn");
    const authToggleText = document.getElementById("authToggleText");
    const authToggleLink = document.getElementById("authToggleLink");

    const nameBox = document.getElementById("nameBox");
    const nameInput = document.getElementById("name");
    const confirmPasswordBox = document.getElementById("confirmPasswordBox");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordInput = document.getElementById("password");

    if (authMode === "signup") {
        if (formTitle) formTitle.textContent = "Create Account";
        if (formSubtitle) formSubtitle.textContent = "Sign up to begin your interview preparation";
        if (submitBtn) submitBtn.textContent = "Create Account";
        if (authToggleText) authToggleText.textContent = "Already have an account? ";
        if (authToggleLink) authToggleLink.textContent = "Login";

        // Show Name & Confirm Password fields
        if (nameBox) nameBox.style.display = "flex";
        if (nameInput) {
            nameInput.required = true;
            nameInput.value = "";
        }

        if (confirmPasswordBox) confirmPasswordBox.style.display = "flex";
        if (confirmPasswordInput) {
            confirmPasswordInput.required = true;
            confirmPasswordInput.value = "";
        }

        if (passwordInput) {
            passwordInput.setAttribute("placeholder", "Create Password");
            passwordInput.setAttribute("autocomplete", "new-password");
        }
    } else {
        if (formTitle) formTitle.textContent = "Welcome Back";
        if (formSubtitle) formSubtitle.textContent = "Login to continue";
        if (submitBtn) submitBtn.textContent = "Login";
        if (authToggleText) authToggleText.textContent = "New User? ";
        if (authToggleLink) authToggleLink.textContent = "Create Account";

        // Hide Name & Confirm Password fields
        if (nameBox) nameBox.style.display = "none";
        if (nameInput) {
            nameInput.required = false;
            nameInput.value = "";
        }

        if (confirmPasswordBox) confirmPasswordBox.style.display = "none";
        if (confirmPasswordInput) {
            confirmPasswordInput.required = false;
            confirmPasswordInput.value = "";
        }

        if (passwordInput) {
            passwordInput.setAttribute("placeholder", "Password");
            passwordInput.setAttribute("autocomplete", "current-password");
        }
    }
}

// Password Visibility Toggles
function setupPasswordToggle(toggleBtnId, inputId) {
    const toggleBtn = document.getElementById(toggleBtnId);
    const inputEl = document.getElementById(inputId);

    if (toggleBtn && inputEl) {
        toggleBtn.addEventListener("click", function () {
            const isPassword = inputEl.getAttribute("type") === "password";
            inputEl.setAttribute("type", isPassword ? "text" : "password");
            this.classList.toggle("fa-eye", !isPassword);
            this.classList.toggle("fa-eye-slash", isPassword);
        });
    }
}

setupPasswordToggle("togglePassword", "password");
setupPasswordToggle("toggleConfirmPassword", "confirmPassword");

// Login & Signup Form Submission
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAuthMessage();

        const nameEl = document.getElementById("name");
        const emailEl = document.getElementById("email");
        const passwordEl = document.getElementById("password");
        const confirmPasswordEl = document.getElementById("confirmPassword");

        const name = nameEl ? nameEl.value.trim() : "";
        const email = emailEl ? emailEl.value.trim() : "";
        const password = passwordEl ? passwordEl.value : "";
        const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value : "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Retrieve registered users from localStorage
        let registeredUsers = {};
        try {
            registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || {};
        } catch (err) {
            registeredUsers = {};
        }

        if (authMode === "signup") {
            // Validate Name
            if (!name) {
                showAuthMessage("Please enter your full name.", "error");
                if (nameEl) nameEl.focus();
                return;
            }
            if (name.length < 2) {
                showAuthMessage("Name must be at least 2 characters long.", "error");
                if (nameEl) nameEl.focus();
                return;
            }

            // Validate Email
            if (!email) {
                showAuthMessage("Please enter your email address.", "error");
                if (emailEl) emailEl.focus();
                return;
            }
            if (!emailRegex.test(email)) {
                showAuthMessage("Please enter a valid email address.", "error");
                if (emailEl) emailEl.focus();
                return;
            }

            // Validate Password
            if (!password) {
                showAuthMessage("Please enter a password.", "error");
                if (passwordEl) passwordEl.focus();
                return;
            }
            if (password.length < 6) {
                showAuthMessage("Password must be at least 6 characters long.", "error");
                if (passwordEl) passwordEl.focus();
                return;
            }

            // Validate Confirm Password
            if (!confirmPassword) {
                showAuthMessage("Please confirm your password.", "error");
                if (confirmPasswordEl) confirmPasswordEl.focus();
                return;
            }
            if (password !== confirmPassword) {
                showAuthMessage("Passwords do not match. Please re-enter.", "error");
                if (confirmPasswordEl) confirmPasswordEl.focus();
                return;
            }

            // Check if user already exists
            if (registeredUsers[email.toLowerCase()]) {
                showAuthMessage("An account with this email already exists. Please log in.", "error");
                return;
            }

            // Save new user with name, email, password
            registeredUsers[email.toLowerCase()] = {
                name: name,
                email: email,
                password: password
            };
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userName", name);

            showAuthMessage("Account created successfully! Redirecting to Dashboard...", "success");
            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 800);

        } else {
            // Login Mode
            if (!email || !password) {
                showAuthMessage("Please enter both Email and Password.", "error");
                return;
            }

            if (!emailRegex.test(email)) {
                showAuthMessage("Please enter a valid email address.", "error");
                return;
            }

            const user = registeredUsers[email.toLowerCase()];
            if (user && user.password !== password) {
                showAuthMessage("Incorrect password. Please try again.", "error");
                return;
            }

            // Successful login
            localStorage.setItem("userEmail", email);
            if (user && user.name) {
                localStorage.setItem("userName", user.name);
            } else {
                let derivedName = email.split("@")[0].replace(/[._-]/g, " ");
                derivedName = derivedName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                localStorage.setItem("userName", derivedName);
            }

            showAuthMessage("Login successful! Redirecting to Dashboard...", "success");
            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 600);
        }
    });
}

function logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "login.html";
}

// ===============================
// Navigation
// ===============================

function startInterview() {
    let setNum = Number(localStorage.getItem("currentInterviewSet"));
    if (!setNum || setNum < 1 || setNum > 5) {
        setNum = 1;
        localStorage.setItem("currentInterviewSet", 1);
    }
    localStorage.setItem("lastInterviewSet", setNum);
    // Reset proctoring state for fresh session
    localStorage.setItem("proctoringStrikes", "0");
    localStorage.setItem("proctoringLogs", JSON.stringify([]));
    localStorage.setItem("proctoringFlagged", "false");
    localStorage.setItem("proctoringFullscreenExits", "0");
    localStorage.setItem("proctoringCamStatus", "Verified Online");
    window.location.href = "aptitude.html";
}

function goToGD() {
    window.location.href = "gd.html";
}

function goToTechnical() {
    window.location.href = "tech.html";
}

function goToHR() {
    window.location.href = "hr.html";
}

function showResult() {
    window.location.href = "result.html";
}

// ===============================
// Save Marks
// ===============================

function saveMarks(round, marks) {

    localStorage.setItem(round, marks);

}

// ===============================
// Result
// ===============================

function calculateResult() {

    let aptitude = Number(localStorage.getItem("aptitude")) || 0;
    let gd = Number(localStorage.getItem("gd")) || 0;
    let technical = Number(localStorage.getItem("technical")) || 0;
    let hr = Number(localStorage.getItem("hr")) || 0;

    let total = aptitude + gd + technical + hr;
    let percentage = (total / 400) * 100;

    if (document.getElementById("aptitudeMarks"))
        document.getElementById("aptitudeMarks").innerHTML = aptitude;

    if (document.getElementById("gdMarks"))
        document.getElementById("gdMarks").innerHTML = gd;

    if (document.getElementById("technicalMarks"))
        document.getElementById("technicalMarks").innerHTML = technical;

    if (document.getElementById("hrMarks"))
        document.getElementById("hrMarks").innerHTML = hr;

    if (document.getElementById("totalMarks"))
        document.getElementById("totalMarks").innerHTML = total;

    if (document.getElementById("percentage"))
        document.getElementById("percentage").innerHTML = percentage.toFixed(2) + "%";

    let performance = "Needs Improvement";

    if (percentage >= 85)
        performance = "Excellent";
    else if (percentage >= 70)
        performance = "Good";
    else if (percentage >= 50)
        performance = "Average";

    if (document.getElementById("performance"))
        document.getElementById("performance").innerHTML = performance;

}

// ==========================================
// Candidate Profile & Session Auto-Seeder
// ==========================================
(function seedCandidateProfile() {
    try {
        let users = JSON.parse(localStorage.getItem("registeredUsers")) || {};
        if (!users["rukiya.thonduru@alts.edu"]) {
            users["rukiya.thonduru@alts.edu"] = {
                name: "Thonduru Rukiya",
                email: "rukiya.thonduru@alts.edu",
                password: "password123",
                candidateId: "ALTS-2026-9041",
                track: "SDE Level-1 Track"
            };
            localStorage.setItem("registeredUsers", JSON.stringify(users));
        }

        if (!localStorage.getItem("userName")) {
            localStorage.setItem("userName", "Thonduru Rukiya");
            localStorage.setItem("userEmail", "rukiya.thonduru@alts.edu");
            localStorage.setItem("candidateId", "ALTS-2026-9041");
            localStorage.setItem("candidateTrack", "SDE Level-1 Track");
            localStorage.setItem("currentInterviewSet", "1");
            localStorage.setItem("aptitude", "100");
            localStorage.setItem("gd", "100");
            localStorage.setItem("technical", "100");
            localStorage.setItem("hr", "98");
        }
    } catch (e) {}
})();

window.autoFillDemoLogin = function() {
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    if (emailEl) emailEl.value = "rukiya.thonduru@alts.edu";
    if (passwordEl) passwordEl.value = "password123";
    localStorage.setItem("userName", "Thonduru Rukiya");
    localStorage.setItem("userEmail", "rukiya.thonduru@alts.edu");
    localStorage.setItem("candidateId", "ALTS-2026-9041");
    localStorage.setItem("candidateTrack", "SDE Level-1 Track");
    if (window.showAuthMessage) {
        showAuthMessage("Auto-filled candidate: Thonduru Rukiya. Click Login to enter.", "success");
    }
};
