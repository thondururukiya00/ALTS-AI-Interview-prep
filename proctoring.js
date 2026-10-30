/**
 * ===================================================
 * ALTS AI Powered Interview Assistant
 * Anti-Cheat Security Module: proctoring.js
 * Real-time Sensor Matrix, 3-Strike Rule,
 * Tab-switch & Shortcut Guard (Webcam removed)
 * ===================================================
 */

(function () {
    "use strict";

    const MAX_STRIKES = 3;
    let strikes = parseInt(localStorage.getItem("proctoringStrikes") || "0", 10);
    let audioContext = null;
    let isTerminated = false;

    // DOM Elements
    const terminalEl = document.getElementById("auditTerminal");
    const strikeCountLabel = document.getElementById("strikeCountLabel");
    const sensorTabEl = document.getElementById("sensorTab");
    const sensorFullscreenEl = document.getElementById("sensorFullscreen");
    const proctorStatusChip = document.getElementById("proctorStatusChip");

    /**
     * Web Audio API Warning Tone
     */
    function playWarningTone(isCritical = false) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            if (!audioContext) audioContext = new AudioCtx();
            if (audioContext.state === "suspended") audioContext.resume();

            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = isCritical ? "sawtooth" : "sine";
            const now = audioContext.currentTime;

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
            osc.connect(gain);
            gain.connect(audioContext.destination);
        } catch (e) {
            // Audio context gesture restricted
        }
    }

    /**
     * Audit Log Appender
     */
    function logEvent(tag, message, type = "info") {
        if (!terminalEl) return;

        const timeStr = new Date().toTimeString().split(" ")[0];
        const entry = document.createElement("div");
        entry.className = "log-entry";

        let tagClass = "log-tag-info";
        if (type === "warn") tagClass = "log-tag-warn";
        if (type === "danger") tagClass = "log-tag-danger";
        if (type === "ok") tagClass = "log-tag-ok";

        entry.innerHTML = `
            <span class="log-time">[${timeStr}]</span>
            <span class="${tagClass}">[${tag}]</span>
            <span class="log-msg">${message}</span>
        `;

        terminalEl.appendChild(entry);
        terminalEl.scrollTop = terminalEl.scrollHeight;

        // Persist to localStorage
        try {
            const logs = JSON.parse(localStorage.getItem("proctoringLogs") || "[]");
            logs.push({ time: timeStr, tag, message, type });
            if (logs.length > 50) logs.shift();
            localStorage.setItem("proctoringLogs", JSON.stringify(logs));
        } catch (e) {}
    }

    /**
     * Strike Counter & Enforcement Engine
     */
    function updateStrikeUI() {
        if (strikeCountLabel) {
            strikeCountLabel.textContent = `${strikes} / ${MAX_STRIKES} Strikes`;
        }

        for (let i = 1; i <= 3; i++) {
            const slot = document.getElementById(`strikeSlot${i}`);
            if (slot) {
                if (i <= strikes) {
                    slot.classList.add("armed");
                } else {
                    slot.classList.remove("armed");
                }
            }
        }

        if (strikes > 0 && proctorStatusChip) {
            proctorStatusChip.classList.add("flagged");
            proctorStatusChip.innerHTML = `<span class="rec-pulse-dot"></span> PROCTOR FLAGGED (${strikes} STRIKES)`;
        } else if (proctorStatusChip) {
            proctorStatusChip.classList.remove("flagged");
            proctorStatusChip.innerHTML = `<span class="rec-pulse-dot"></span> ENCLAVE SECURED • ZERO STRIKES`;
        }

        localStorage.setItem("proctoringStrikes", strikes.toString());

        if (strikes >= MAX_STRIKES && !isTerminated) {
            triggerAdministrativeTermination();
        }
    }

    function addStrike(reason) {
        if (isTerminated) return;

        strikes++;
        playWarningTone(strikes >= MAX_STRIKES);
        logEvent("BREACH_DETECTED", `${reason} (Strike ${strikes}/${MAX_STRIKES})`, "danger");
        updateStrikeUI();
    }

    /**
     * Termination Modal
     */
    function triggerAdministrativeTermination() {
        isTerminated = true;
        logEvent("SESSION_TERMINATED", "Exceeded allowable strike limit. Candidate session flagged for review.", "danger");

        let modal = document.getElementById("terminationModalOverlay");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "terminationModalOverlay";
            modal.className = "proctor-modal-overlay";
            modal.innerHTML = `
                <div class="proctor-modal-card">
                    <div class="proctor-modal-icon danger">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <h2>Assessment Session Terminated</h2>
                    <p>
                        Your session has exceeded the maximum threshold of <strong>3 Integrity Strikes</strong>. 
                        Violations have been logged and appended to your candidate evaluation dossier.
                    </p>
                    <div class="proctor-modal-actions">
                        <button type="button" class="btn-modal-primary" onclick="window.location.href='result.html'">
                            Proceed to Dossier Review
                        </button>
                        <button type="button" class="btn-modal-secondary" onclick="window.clearStrikesForTesting()">
                            Reset Strikes (Testing Mode)
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    }

    window.clearStrikesForTesting = function () {
        strikes = 0;
        localStorage.setItem("proctoringStrikes", "0");
        const overlay = document.getElementById("terminationModalOverlay");
        if (overlay) overlay.remove();
        isTerminated = false;
        logEvent("STRIKE_RESET", "Proctoring strikes cleared by administrative action.", "ok");
        updateStrikeUI();
    };

    /**
     * Autonomous Integrity Monitor (Non-Camera)
     */
    function initIntegrityMonitor() {
        logEvent("INTEGRITY_ONLINE", "Autonomous security enclave active: Focus lock, tab defense & shortcut intercept armed.", "ok");
        localStorage.setItem("proctoringCamStatus", "System Integrity: Active");
    }

    window.initCamera = initIntegrityMonitor;

    /**
     * Tab Switching & Focus Loss Detection
     */
    let lastBlurTimestamp = 0;

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (sensorTabEl) {
                sensorTabEl.textContent = "Defocused (Tab Switch)";
                sensorTabEl.className = "sensor-val alert-breach";
            }
            addStrike("Tab hidden or window switched away from assessment");
        } else {
            if (sensorTabEl) {
                sensorTabEl.textContent = "Active (Focused)";
                sensorTabEl.className = "sensor-val active-safe";
            }
            logEvent("TAB_RETURN", "Candidate returned focus to examination environment.", "info");
        }
    });

    window.addEventListener("blur", () => {
        const now = Date.now();
        if (now - lastBlurTimestamp < 1500) return; // Debounce rapid focus flutter
        lastBlurTimestamp = now;

        if (sensorTabEl) {
            sensorTabEl.textContent = "Window Blurred";
            sensorTabEl.className = "sensor-val alert-breach";
        }
        addStrike("Window blur detected (Alt-Tab, OS switcher, or secondary window click)");
    });

    window.addEventListener("focus", () => {
        if (sensorTabEl) {
            sensorTabEl.textContent = "Active (Focused)";
            sensorTabEl.className = "sensor-val active-safe";
        }
    });

    /**
     * Context Menu Blocking (Right-Click)
     */
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        playWarningTone(false);
        logEvent("CONTEXT_MENU_BLOCKED", "Unauthorized right-click inspection attempted and blocked.", "warn");
    });

    /**
     * Developer Tools & Shortcut Restrictions
     */
    window.addEventListener("keydown", (e) => {
        const key = e.key;
        const keyCode = e.keyCode || e.which;

        // F12 DevTools
        const isF12 = key === "F12" || keyCode === 123;

        // Ctrl+Shift+I / Cmd+Option+I (Inspect)
        const isInspect = (e.ctrlKey || e.metaKey) && e.shiftKey && (key === "I" || key === "i");

        // Ctrl+Shift+J / Cmd+Option+J (Console)
        const isConsole = (e.ctrlKey || e.metaKey) && e.shiftKey && (key === "J" || key === "j");

        // Ctrl+Shift+C (Element Picker)
        const isPicker = (e.ctrlKey || e.metaKey) && e.shiftKey && (key === "C" || key === "c");

        // Ctrl+U (View Source)
        const isViewSource = (e.ctrlKey || e.metaKey) && (key === "U" || key === "u");

        // Ctrl+S (Save Page)
        const isSavePage = (e.ctrlKey || e.metaKey) && (key === "S" || key === "s");

        if (isF12 || isInspect || isConsole || isPicker || isViewSource || isSavePage) {
            e.preventDefault();
            e.stopPropagation();
            playWarningTone(false);
            logEvent("DEVTOOLS_SHORTCUT", `Restricted shortcut intercepted: ${key || keyCode}`, "warn");
        }
    });

    /**
     * Fullscreen Monitor
     */
    function updateFullscreenSensor() {
        const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
        if (sensorFullscreenEl) {
            if (isFs) {
                sensorFullscreenEl.textContent = "Enforced Active";
                sensorFullscreenEl.className = "sensor-val active-safe";
            } else {
                sensorFullscreenEl.textContent = "Windowed Mode";
                sensorFullscreenEl.className = "sensor-val";
            }
        }
    }

    document.addEventListener("fullscreenchange", updateFullscreenSensor);
    document.addEventListener("webkitfullscreenchange", updateFullscreenSensor);

    /**
     * Simulation Handlers (Exposed globally for UI testing buttons)
     */
    window.simTabSwitch = function () {
        addStrike("Simulation: Tab switched or blurred");
    };

    window.simDevTools = function () {
        logEvent("SIM_DEVTOOLS", "Simulation: DevTools shortcut intercepted", "warn");
        playWarningTone(false);
    };

    window.simRightClick = function () {
        logEvent("SIM_CONTEXT", "Simulation: Right-click context menu blocked", "warn");
        playWarningTone(false);
    };

    window.clearAuditTerminal = function () {
        if (terminalEl) terminalEl.innerHTML = "";
        localStorage.removeItem("proctoringLogs");
        logEvent("LOGS_CLEARED", "Terminal buffer refreshed.", "info");
    };

    /**
     * Hydrate Candidate Details from data.json or fallback
     */
    async function hydrateCandidateMeta() {
        try {
            const res = await fetch("data.json");
            if (!res.ok) return;
            const data = await res.json();
            if (data.candidate) {
                const nameEl = document.getElementById("procCandidateName");
                const idEl = document.getElementById("procCandidateId");
                const trackEl = document.getElementById("procCandidateTrack");
                if (nameEl && data.candidate.name) nameEl.textContent = data.candidate.name;
                if (idEl && data.candidate.candidateId) idEl.textContent = data.candidate.candidateId;
                if (trackEl && data.candidate.track) trackEl.textContent = data.candidate.track;
            }
        } catch (e) {
            // Static fallback preserved
        }
    }

    // Initialize on page load
    document.addEventListener("DOMContentLoaded", () => {
        updateStrikeUI();
        updateFullscreenSensor();
        hydrateCandidateMeta();
        logEvent("SYSTEM_READY", "ALTS Anti-Cheat Enclave initialized and armed.", "ok");
        logEvent("METRICS_LOADED", "3-Strike Policy Active: Tab-switch, DevTools & ContextMenu restricted.", "info");
        initIntegrityMonitor();
    });

})();
