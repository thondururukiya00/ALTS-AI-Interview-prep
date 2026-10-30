/**
 * ===================================================
 * ALTS AI Interview Preparation Assistant - Dashboard
 * Module: dashboard.js
 * ===================================================
 */

(function () {
    "use strict";

    // Auth Guard: Require login first
    const authenticatedUser = localStorage.getItem("userEmail");
    if (!authenticatedUser || !authenticatedUser.trim()) {
        window.location.replace("login.html");
        return;
    }

    // Application State
    let dashboardConfig = null;

    // Default Fallback Data (ensures zero downtime if data.json fetch is restricted)
    const fallbackData = {
        system: {
            name: "ALTS AI Powered Interview Assistant",
            tagline: "Intelligent 4-Stage Campus & Corporate Hiring Assessment",
            version: "2026.4.1"
        },
        candidate: {
            name: "Thonduru Rukiya",
            email: "rukiya.thonduru@alts.edu",
            candidateId: "ALTS-2026-9041",
            track: "SDE LEVEL-1 TRACK",
            proctorStatus: "PROCTOR ARMED"
        },
        questionSets: {
            activeSet: 1,
            totalSets: 5,
            tag: "Anti-Repeat Active",
            description: "Every round contains calibrated questions ordered strictly from Easy ➔ Medium ➔ Hard."
        },
        executiveMetrics: [
            {
                id: "rounds",
                icon: "fa-solid fa-cubes-stacked",
                colorClass: "metric-blue",
                label: "Total Rounds",
                value: "4 Calibrated Stages"
            },
            {
                id: "duration",
                icon: "fa-regular fa-clock",
                colorClass: "metric-green",
                label: "Total Duration",
                value: "65 Mins Scheduled"
            },
            {
                id: "marks",
                icon: "fa-solid fa-award",
                colorClass: "metric-purple",
                label: "Max Composite Marks",
                value: "400 Total Points"
            },
            {
                id: "proctor",
                icon: "fa-solid fa-shield-halved",
                colorClass: "metric-amber",
                label: "Anti-Cheat Protocol",
                value: "Focus & 3 Strikes"
            }
        ],
        dossier: {
            title: "ALTS Assessment Evaluation Dossier",
            scoreBadge: "398 / 400 (99.5%)",
            status: "Strong Hire Recommended",
            description: "Multi-stage evaluation dossier ready for Thonduru Rukiya • Status: Strong Hire Recommended",
            targetUrl: "result.html"
        },
        rounds: [
            {
                roundNumber: 1,
                badge: "Round 01",
                cardClass: "round-aptitude",
                title: "Aptitude & Logical Reasoning",
                icon: "fa-solid fa-brain",
                description: "Solve progressive multiple-choice questions assessing quantitative ability, series, logical reasoning, and permutations.",
                difficultyFlow: [
                    { level: "Easy", className: "diff-easy" },
                    { level: "Medium", className: "diff-medium" },
                    { level: "Hard", className: "diff-hard" }
                ],
                topics: ["Quant", "Ratios & Work", "Logical Deduction", "Probability"],
                meta: {
                    duration: "30 Mins",
                    questions: "5 Questions",
                    marks: "100 Marks"
                },
                targetUrl: "aptitude.html"
            },
            {
                roundNumber: 2,
                badge: "Round 02",
                cardClass: "round-gd",
                title: "AI Group Discussion",
                icon: "fa-solid fa-comments",
                description: "Voice-enabled interactive topic discussion. Present clear articulation, structured thoughts, pros/cons, and persuasive conclusions.",
                difficultyFlow: [
                    { level: "Fundamentals", className: "diff-easy" },
                    { level: "Analysis", className: "diff-medium" },
                    { level: "Impact", className: "diff-hard" }
                ],
                topics: ["Voice Recognition", "AI Evaluation", "Critical Thinking"],
                meta: {
                    duration: "5 Mins",
                    questions: "1 Selected Topic",
                    marks: "100 Marks"
                },
                targetUrl: "gd.html"
            },
            {
                roundNumber: 3,
                badge: "Round 03",
                cardClass: "round-tech",
                title: "Technical & Coding Round",
                icon: "fa-solid fa-code",
                description: "Real-time coding challenges covering basic programming, data structures (Search, Arrays, Stacks), and object-oriented fundamentals.",
                difficultyFlow: [
                    { level: "Basic Coding", className: "diff-easy" },
                    { level: "DSA / OOP", className: "diff-medium" },
                    { level: "Algorithmic", className: "diff-hard" }
                ],
                topics: ["C", "Python", "Java", "Data Structures"],
                meta: {
                    duration: "20 Mins",
                    questions: "5 Coding Problems",
                    marks: "100 Marks"
                },
                targetUrl: "tech.html"
            },
            {
                roundNumber: 4,
                badge: "Round 04",
                cardClass: "round-hr",
                title: "HR & Behavioral Round",
                icon: "fa-solid fa-user-tie",
                description: "Voice-driven HR behavioral assessment. Evaluate candidate cultural fit, conflict resolution, work ethic, and situational maturity.",
                difficultyFlow: [
                    { level: "Background", className: "diff-easy" },
                    { level: "Behavioral", className: "diff-medium" },
                    { level: "Situational", className: "diff-hard" }
                ],
                topics: ["Self-Awareness", "Conflict Handling", "Leadership", "Ethics"],
                meta: {
                    duration: "10 Mins",
                    questions: "5 Questions",
                    marks: "100 Marks"
                },
                targetUrl: "hr.html"
            }
        ],
        securityGuidelines: [
            {
                icon: "fa-solid fa-triangle-exclamation",
                title: "Tab Switching",
                detail: "Switching tabs or windows during an active test will be flagged."
            },
            {
                icon: "fa-solid fa-ban",
                title: "Shortcuts & Inspection",
                detail: "Right-click and dev-tool keys are disabled inside assessment rounds."
            },
            {
                icon: "fa-solid fa-bars-progress",
                title: "Single Continuous Session",
                detail: "Complete all 4 rounds in sequence for the overall composite rating."
            },
            {
                icon: "fa-solid fa-chart-line",
                title: "Adaptive Scoring",
                detail: "Each round holds 100 marks (400 total) with weighted evaluation."
            },
            {
                icon: "fa-solid fa-rotate-right",
                title: "Set Anti-Repetition",
                detail: "Your next interview attempt will automatically cycle to a fresh non-repeating set."
            },
            {
                icon: "fa-solid fa-file-circle-check",
                title: "Final Performance Report",
                detail: "An analytics card with individual round breakdowns is generated at the end."
            }
        ]
    };

    /**
     * Fetch JSON configuration asynchronously
     */
    async function loadConfiguration() {
        try {
            const response = await fetch("data.json");
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn("[ALTS] Loading fallback configuration:", error.message);
            return fallbackData;
        }
    }

    /**
     * Render Candidate Profile & Set Information
     */
    function renderCandidateProfile(candidate) {
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");
        const storedId = localStorage.getItem("candidateId");
        const storedTrack = localStorage.getItem("candidateTrack");

        const name = storedName && storedName.trim() ? storedName : candidate.name;
        const email = storedEmail && storedEmail.trim() ? storedEmail : candidate.email;
        const candidateId = storedId && storedId.trim() ? storedId : candidate.candidateId;
        const track = storedTrack && storedTrack.trim() ? storedTrack : candidate.track;

        const displayNameEl = document.getElementById("candidateDisplayName");
        const trackBadgeEl = document.getElementById("candidateTrackBadge");
        const proctorBadgeEl = document.getElementById("candidateProctorBadge");
        const emailEl = document.getElementById("userEmailDisplay");

        if (displayNameEl) displayNameEl.textContent = `Welcome, ${name}!`;
        if (trackBadgeEl) trackBadgeEl.textContent = track;
        if (proctorBadgeEl) {
            proctorBadgeEl.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${candidate.proctorStatus}`;
        }
        if (emailEl) {
            emailEl.innerHTML = `Logged in: <strong>${email}</strong> • Candidate ID: <strong>${candidateId}</strong>`;
        }
    }

    /**
     * Render Active Set Information
     */
    function renderQuestionSet(setInfo) {
        let setNum = Number(localStorage.getItem("currentInterviewSet"));
        if (!setNum || setNum < 1 || setNum > setInfo.totalSets) {
            setNum = setInfo.activeSet || 1;
            localStorage.setItem("currentInterviewSet", setNum.toString());
        }

        const currentSetLabel = document.getElementById("currentSetLabel");
        const startSetLabel = document.getElementById("startSetLabel");
        const setDesc = document.getElementById("setDesc");

        if (currentSetLabel) currentSetLabel.textContent = `Set ${setNum} of ${setInfo.totalSets}`;
        if (startSetLabel) startSetLabel.textContent = `Set ${setNum}`;
        if (setDesc) setDesc.innerHTML = setInfo.description;
    }

    /**
     * Render 4-Column Executive Metric Blocks
     */
    function renderMetrics(metrics) {
        const container = document.getElementById("metricsGrid");
        if (!container || !Array.isArray(metrics)) return;

        container.innerHTML = metrics.map(item => `
            <div class="metric-card" id="metric-${item.id}">
                <div class="metric-icon ${item.colorClass}">
                    <i class="${item.icon}"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">${item.label}</span>
                    <strong class="metric-value">${item.value}</strong>
                </div>
            </div>
        `).join("");
    }

    /**
     * Render Symmetrical 2-Column Round Cards
     */
    function renderRounds(rounds) {
        const container = document.getElementById("roundsGrid");
        if (!container || !Array.isArray(rounds)) return;

        container.innerHTML = rounds.map(round => {
            const flowHtml = round.difficultyFlow.map((step, idx) => `
                <span class="diff-step ${step.className}">
                    <i class="fa-solid fa-circle"></i> ${step.level}
                </span>
                ${idx < round.difficultyFlow.length - 1 ? '<i class="fa-solid fa-arrow-right flow-arrow"></i>' : ''}
            `).join("");

            const pillsHtml = round.topics.map(t => `<span class="pill">${t}</span>`).join("");

            return `
                <div class="round-card ${round.cardClass}" onclick="window.location.href='${round.targetUrl}'" title="Click to launch ${round.title}">
                    <div class="round-top">
                        <span class="step-badge">${round.badge}</span>
                        <div class="difficulty-flow" title="Difficulty progression">
                            ${flowHtml}
                        </div>
                    </div>

                    <div class="round-body">
                        <div class="round-icon">
                            <i class="${round.icon}"></i>
                        </div>
                        <div class="round-content">
                            <h3>${round.title}</h3>
                            <p>${round.description}</p>
                            <div class="topics-pills">
                                ${pillsHtml}
                            </div>
                        </div>
                    </div>

                    <div class="round-footer">
                        <span class="meta-tag"><i class="fa-regular fa-clock"></i> ${round.meta.duration}</span>
                        <span class="meta-tag"><i class="fa-solid fa-list-check"></i> ${round.meta.questions}</span>
                        <span class="meta-tag score-tag"><i class="fa-solid fa-trophy"></i> ${round.meta.marks}</span>
                    </div>
                </div>
            `;
        }).join("");
    }

    /**
     * Render Dossier Card
     */
    function renderDossier(dossier) {
        const container = document.getElementById("dossierCard");
        if (!container || !dossier) return;

        const storedName = localStorage.getItem("userName") || "Thonduru Rukiya";

        container.innerHTML = `
            <div class="dossier-left">
                <div class="dossier-icon">
                    <i class="fa-solid fa-file-shield"></i>
                </div>
                <div>
                    <div class="dossier-header-row">
                        <h4>${dossier.title}</h4>
                        <span class="dossier-score-badge">${dossier.scoreBadge}</span>
                    </div>
                    <p class="dossier-desc">Multi-stage evaluation dossier ready for <strong>${storedName}</strong> • Status: <strong>${dossier.status}</strong></p>
                </div>
            </div>
            <button class="btn-view-dossier" onclick="showResult()">
                <i class="fa-solid fa-square-poll-vertical"></i> View Performance Dossier
            </button>
        `;
    }

    /**
     * Render Security & Proctoring Guidelines
     */
    function renderInstructions(guidelines) {
        const container = document.getElementById("instructionGrid");
        if (!container || !Array.isArray(guidelines)) return;

        container.innerHTML = guidelines.map(g => `
            <li class="instruction-item">
                <i class="${g.icon}"></i>
                <div>
                    <strong>${g.title}:</strong> ${g.detail}
                </div>
            </li>
        `).join("");
    }

    /**
     * Cycle through question sets (1 to 5)
     */
    window.cycleInterviewSet = function () {
        const totalSets = (dashboardConfig && dashboardConfig.questionSets.totalSets) || 5;
        let currentSet = Number(localStorage.getItem("currentInterviewSet")) || 1;
        let nextSet = (currentSet % totalSets) + 1;

        localStorage.setItem("currentInterviewSet", nextSet.toString());
        localStorage.setItem("lastInterviewSet", nextSet.toString());

        const currentSetLabel = document.getElementById("currentSetLabel");
        const startSetLabel = document.getElementById("startSetLabel");

        if (currentSetLabel) currentSetLabel.textContent = `Set ${nextSet} of ${totalSets}`;
        if (startSetLabel) startSetLabel.textContent = `Set ${nextSet}`;

        showProctorToast(`Active question set updated to Set ${nextSet} of ${totalSets}.`);
    };

    /**
     * Launch Interview (Round 1)
     */
    window.startInterview = function () {
        let setNum = Number(localStorage.getItem("currentInterviewSet"));
        if (!setNum || setNum < 1 || setNum > 5) {
            setNum = 1;
            localStorage.setItem("currentInterviewSet", "1");
        }
        localStorage.setItem("lastInterviewSet", setNum.toString());

        // Reset proctoring metrics for a clean assessment run
        localStorage.setItem("proctoringStrikes", "0");
        localStorage.setItem("proctoringLogs", JSON.stringify([]));
        localStorage.setItem("proctoringFlagged", "false");
        localStorage.setItem("proctoringFullscreenExits", "0");
        localStorage.setItem("proctoringCamStatus", "Verified Online");

        window.location.href = "aptitude.html";
    };

    /**
     * Navigate to Results
     */
    window.showResult = function () {
        window.location.href = "result.html";
    };

    /**
     * End Session & Logout
     */
    window.logout = function () {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
    };

    /**
     * Proctoring Toast Notification Helper
     */
    function showProctorToast(message) {
        let toast = document.getElementById("proctorToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "proctorToast";
            toast.className = "proctor-toast";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
        toast.classList.add("visible");
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove("visible");
        }, 3000);
    }

    /**
     * Security & Proctoring Event Listeners
     */
    function attachProctoringListeners() {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                showProctorToast("Security Notice: Tab unfocused. Maintain focus on assessment window.");
            }
        });

        window.addEventListener("blur", () => {
            showProctorToast("Security Notice: Window focus lost.");
        });
    }

    /**
     * App Bootstrap
     */
    async function init() {
        dashboardConfig = await loadConfiguration();

        renderCandidateProfile(dashboardConfig.candidate);
        renderQuestionSet(dashboardConfig.questionSets);
        renderMetrics(dashboardConfig.executiveMetrics);
        renderRounds(dashboardConfig.rounds);
        renderDossier(dashboardConfig.dossier);
        renderInstructions(dashboardConfig.securityGuidelines);

        attachProctoringListeners();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

