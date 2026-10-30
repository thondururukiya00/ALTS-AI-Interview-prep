/**
 * ===================================================
 * ALTS AI Interview Preparation Assistant - Dashboard
 * Module: dashboard.js
 * Dynamic Real-Time Evaluation & Assessment Tracking
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

    // Helper: Retrieve all stage scores & completion states from localStorage
    function getCandidateProgress() {
        const aptRaw = localStorage.getItem("aptitude");
        const gdRaw = localStorage.getItem("gd");
        const techRaw = localStorage.getItem("technical") !== null ? localStorage.getItem("technical") : localStorage.getItem("tech");
        const hrRaw = localStorage.getItem("hr");

        const hasAptitude = aptRaw !== null && aptRaw !== undefined && aptRaw !== "";
        const hasGd = gdRaw !== null && gdRaw !== undefined && gdRaw !== "";
        const hasTech = techRaw !== null && techRaw !== undefined && techRaw !== "";
        const hasHr = hrRaw !== null && hrRaw !== undefined && hrRaw !== "";

        const aptitudeScore = hasAptitude ? Math.max(0, Math.min(100, Number(aptRaw))) : 0;
        const gdScore = hasGd ? Math.max(0, Math.min(100, Number(gdRaw))) : 0;
        const techScore = hasTech ? Math.max(0, Math.min(100, Number(techRaw))) : 0;
        const hrScore = hasHr ? Math.max(0, Math.min(100, Number(hrRaw))) : 0;

        const completedCount = [hasAptitude, hasGd, hasTech, hasHr].filter(Boolean).length;
        const totalScore = (hasAptitude ? aptitudeScore : 0) +
                           (hasGd ? gdScore : 0) +
                           (hasTech ? techScore : 0) +
                           (hasHr ? hrScore : 0);

        const percentage = (totalScore / 400) * 100;

        return {
            hasAptitude,
            hasGd,
            hasTech,
            hasHr,
            aptitudeScore,
            gdScore,
            techScore,
            hrScore,
            completedCount,
            totalScore,
            percentage,
            isAllCompleted: completedCount === 4
        };
    }

    // Default Fallback Data (ensures zero downtime if data.json fetch is restricted)
    const fallbackData = {
        system: {
            name: "ALTS AI Powered Interview Assistant",
            tagline: "Practice and prepare for your job interview in 4 simple rounds",
            version: "2026.4.1"
        },
        candidate: {
            name: "Thonduru Rukiya",
            email: "rukiya.thonduru@alts.edu",
            candidateId: "ALTS-2026-9041",
            track: "SDE LEVEL-1 TRACK",
            proctorStatus: "SECURITY ACTIVE"
        },
        questionSets: {
            activeSet: 1,
            totalSets: 5,
            tag: "No Repeated Questions",
            description: "Every round contains calibrated questions ordered strictly from Easy ➔ Medium ➔ Hard."
        },
        executiveMetrics: [
            {
                id: "rounds",
                icon: "fa-solid fa-cubes-stacked",
                colorClass: "metric-blue",
                label: "Total Rounds",
                value: "4 Practice Rounds"
            },
            {
                id: "duration",
                icon: "fa-regular fa-clock",
                colorClass: "metric-green",
                label: "Total Time",
                value: "65 Minutes"
            },
            {
                id: "marks",
                icon: "fa-solid fa-award",
                colorClass: "metric-purple",
                label: "Total Score",
                value: "400 Points Max"
            },
            {
                id: "proctor",
                icon: "fa-solid fa-shield-halved",
                colorClass: "metric-amber",
                label: "Interview Rules",
                value: "3 Strikes Allowed"
            }
        ],
        dossier: {
            title: "Your Interview Score & Performance Report",
            scoreBadge: "0 / 400 (Not Started)",
            status: "Ready to Begin",
            description: "Your interview score card, detailed breakdown, and feedback will be ready after completing rounds.",
            targetUrl: "result.html"
        },
        rounds: [
            {
                roundNumber: 1,
                badge: "Round 01",
                cardClass: "round-aptitude",
                title: "Round 1: Math & Logical Reasoning",
                icon: "fa-solid fa-brain",
                description: "Multiple-choice questions testing math, logical thinking, patterns, and quick problem-solving.",
                difficultyFlow: [
                    { level: "Easy", className: "diff-easy" },
                    { level: "Medium", className: "diff-medium" },
                    { level: "Hard", className: "diff-hard" }
                ],
                topics: ["Quant", "Ratios & Work", "Logical Deduction", "Probability"],
                meta: {
                    duration: "30 Mins",
                    questions: "20 Questions",
                    marks: "100 Marks"
                },
                targetUrl: "aptitude.html"
            },
            {
                roundNumber: 2,
                badge: "Round 02",
                cardClass: "round-gd",
                title: "Round 2: Group Discussion (GD)",
                icon: "fa-solid fa-comments",
                description: "Speak or type your thoughts on a given topic. Express clear ideas, pros, cons, and a final conclusion.",
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
                title: "Round 3: Coding & Technical",
                icon: "fa-solid fa-code",
                description: "Write and run code in Python, C, or Java to solve programming and data structure problems.",
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
                title: "Round 4: HR & Personal Interview",
                icon: "fa-solid fa-user-tie",
                description: "Voice or text interview answering common HR questions about yourself, your goals, and teamwork.",
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

        if (displayNameEl) displayNameEl.textContent = name;
        if (trackBadgeEl) trackBadgeEl.textContent = track;
        if (proctorBadgeEl) {
            proctorBadgeEl.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${candidate.proctorStatus}`;
        }
        if (emailEl) {
            emailEl.innerHTML = `Auth User: <strong>${email}</strong> &bull; Candidate ID: <strong>${candidateId}</strong>`;
        }

        // Update sidebar user card
        const sidebarName = document.querySelector(".sidebar-user-card .user-name");
        const sidebarRole = document.querySelector(".sidebar-user-card .user-role");
        const sidebarAvatar = document.querySelector(".sidebar-user-card .user-avatar");
        if (sidebarName) sidebarName.textContent = name;
        if (sidebarRole) sidebarRole.textContent = candidateId;
        if (sidebarAvatar) {
            const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "TR";
            sidebarAvatar.textContent = initials;
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
     * Render 4-Column Executive Metric Blocks with Live Progress
     */
    function renderMetrics(metrics) {
        const container = document.getElementById("metricsGrid");
        if (!container || !Array.isArray(metrics)) return;

        const progress = getCandidateProgress();

        container.innerHTML = metrics.map(item => {
            let displayValue = item.value;
            let displayLabel = item.label;

            if (item.id === "rounds") {
                if (progress.isAllCompleted) {
                    displayValue = "4 / 4 Completed (100%)";
                    displayLabel = "Rounds Completed";
                } else if (progress.completedCount > 0) {
                    displayValue = `${progress.completedCount} of 4 Finished`;
                    displayLabel = "Rounds Finished";
                }
            } else if (item.id === "marks") {
                if (progress.isAllCompleted) {
                    displayValue = `${progress.totalScore} / 400 Points`;
                    displayLabel = "Final Total Score";
                } else if (progress.completedCount > 0) {
                    displayValue = `${progress.totalScore} / 400 pts`;
                    displayLabel = "Current Score";
                }
            }

            return `
                <div class="metric-card" id="metric-${item.id}">
                    <div class="metric-icon ${item.colorClass}">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="metric-info">
                        <span class="metric-label">${displayLabel}</span>
                        <strong class="metric-value">${displayValue}</strong>
                    </div>
                </div>
            `;
        }).join("");
    }

    /**
     * Render Symmetrical 2-Column Round Cards with Live Status
     */
    function renderRounds(rounds) {
        const container = document.getElementById("roundsGrid");
        if (!container || !Array.isArray(rounds)) return;

        const progress = getCandidateProgress();

        const roundStatusMap = {
            1: { completed: progress.hasAptitude, score: progress.aptitudeScore },
            2: { completed: progress.hasGd, score: progress.gdScore },
            3: { completed: progress.hasTech, score: progress.techScore },
            4: { completed: progress.hasHr, score: progress.hrScore }
        };

        container.innerHTML = rounds.map((round, idx) => {
            const st = roundStatusMap[round.roundNumber] || { completed: false, score: 0 };
            const prevCompleted = idx === 0 || (roundStatusMap[rounds[idx - 1].roundNumber] && roundStatusMap[rounds[idx - 1].roundNumber].completed);

            let topBadge = `<span class="step-badge">${round.badge}</span>`;
            let footerMeta = `<span class="meta-tag score-tag"><i class="fa-solid fa-trophy"></i> ${round.meta.marks}</span>`;

            if (st.completed) {
                topBadge = `<span class="step-badge" style="background:#10b981; color:#fff; border-color:#10b981;"><i class="fa-solid fa-circle-check"></i> Completed</span>`;
                footerMeta = `<span class="meta-tag score-tag" style="background:rgba(16,185,129,0.15); color:#10b981; border:1px solid #10b981; font-weight:700;"><i class="fa-solid fa-award"></i> Scored: ${st.score}/100</span>`;
            } else if (prevCompleted) {
                topBadge = `<span class="step-badge" style="background:var(--primary); color:#fff; border-color:var(--primary);"><i class="fa-solid fa-arrow-right"></i> Next Up</span>`;
            }

            const flowHtml = round.difficultyFlow.map((step, fIdx) => `
                <span class="diff-step ${step.className}">
                    <i class="fa-solid fa-circle"></i> ${step.level}
                </span>
                ${fIdx < round.difficultyFlow.length - 1 ? '<i class="fa-solid fa-arrow-right flow-arrow"></i>' : ''}
            `).join("");

            const pillsHtml = round.topics.map(t => `<span class="pill">${t}</span>`).join("");

            return `
                <div class="round-card ${round.cardClass}" onclick="window.location.href='${round.targetUrl}'" title="Click to launch ${round.title}" style="${st.completed ? 'border-color: rgba(16,185,129,0.4); box-shadow: 0 4px 14px rgba(16,185,129,0.1);' : ''}">
                    <div class="round-top">
                        ${topBadge}
                        <div class="difficulty-flow" title="Difficulty progression">
                            ${flowHtml}
                        </div>
                    </div>

                    <div class="round-body">
                        <div class="round-icon" style="${st.completed ? 'background: rgba(16,185,129,0.15); color: #10b981; border-color: rgba(16,185,129,0.3);' : ''}">
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
                        ${footerMeta}
                    </div>
                </div>
            `;
        }).join("");
    }

    /**
     * Render Examination Ledger Table Dynamically based on Actual Round Completion
     */
    function renderStageTable(filterQuery = "") {
        const tableBody = document.getElementById("stageTableBody");
        const compositeEl = document.getElementById("compositeLedgerText");
        if (!tableBody) return;

        const progress = getCandidateProgress();

        const stages = [
            {
                num: "01",
                title: "Quantitative Aptitude",
                hash: "0x9f4a8b",
                engine: "Logic & Algorithmic Quant",
                allocated: "30m / 100pts",
                completed: progress.hasAptitude,
                score: progress.aptitudeScore,
                targetUrl: "aptitude.html",
                stageName: "Stage 1"
            },
            {
                num: "02",
                title: "Dialectical Discussion",
                hash: "0x3d1c9e",
                engine: "Speech & NLP Debate",
                allocated: "05m / 100pts",
                completed: progress.hasGd,
                score: progress.gdScore,
                targetUrl: "gd.html",
                stageName: "Stage 2"
            },
            {
                num: "03",
                title: "Technical & Code",
                hash: "0x7e2b14",
                engine: "DSA, Multi-Language IDE",
                allocated: "20m / 100pts",
                completed: progress.hasTech,
                score: progress.techScore,
                targetUrl: "tech.html",
                stageName: "Stage 3"
            },
            {
                num: "04",
                title: "Behavioral & Leadership",
                hash: "0x8a7f14",
                engine: "Autonomous Audio & Text Q&A",
                allocated: "10m / 100pts",
                completed: progress.hasHr,
                score: progress.hrScore,
                targetUrl: "hr.html",
                stageName: "Stage 4"
            }
        ];

        // Optional query filter
        const query = (filterQuery || "").toLowerCase().trim();
        const filteredStages = stages.filter(st => {
            if (!query) return true;
            return st.title.toLowerCase().includes(query) ||
                   st.engine.toLowerCase().includes(query) ||
                   st.hash.toLowerCase().includes(query) ||
                   st.num.includes(query);
        });

        tableBody.innerHTML = filteredStages.map((st, idx) => {
            const isCompleted = st.completed;
            const originalIdx = stages.findIndex(s => s.num === st.num);
            const isNext = !isCompleted && (originalIdx === 0 || stages[originalIdx - 1].completed);

            let statusBadge = '';
            let scoreCol = '';
            let actionBtn = '';

            if (isCompleted) {
                statusBadge = `<span class="badge-status badge-verified" style="background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);"><i class="fa-solid fa-circle-check"></i> VERIFIED COMPLETE</span>`;
                scoreCol = `<strong style="font-family: var(--font-mono); font-size: 14.5px; color: #10b981;">${st.score}/100</strong>`;
                actionBtn = `<a href="${st.targetUrl}" class="btn-table-action" style="color: #10b981; border-color: rgba(16,185,129,0.3); font-weight: 600;"><i class="fa-solid fa-rotate-right"></i> Review</a>`;
            } else if (isNext) {
                statusBadge = `<span class="badge-status badge-progress" style="background: rgba(112,51,255,0.12); color: var(--primary); border: 1px solid rgba(112,51,255,0.3);"><i class="fa-solid fa-play"></i> READY TO START</span>`;
                scoreCol = `<span style="font-family: var(--font-mono); font-size: 12.5px; color: var(--primary); font-weight: 700;">NEXT ROUND</span>`;
                actionBtn = `<a href="${st.targetUrl}" class="btn-table-action primary" style="background: var(--primary); color: #ffffff; font-weight: 700;">Start Round &rarr;</a>`;
            } else {
                statusBadge = `<span class="badge-status badge-pending">SCHEDULED QUEUE</span>`;
                scoreCol = `<span style="font-family: var(--font-mono); font-size: 12.5px; color: var(--muted-foreground);">QUEUED</span>`;
                actionBtn = `<a href="${st.targetUrl}" class="btn-table-action" style="opacity: 0.65;">Queue</a>`;
            }

            return `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 32px; height: 32px; border-radius: 0.8rem; background: ${isCompleted ? 'rgba(16, 185, 129, 0.15)' : (isNext ? 'var(--primary)' : 'var(--surface-alt)')}; border: 1px solid ${isCompleted ? '#10b981' : (isNext ? 'var(--primary)' : 'var(--border)')}; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: ${isCompleted ? '#10b981' : (isNext ? '#ffffff' : 'var(--muted-foreground)')};">
                                ${st.num}
                            </div>
                            <div>
                                <strong style="display: block; font-weight: 700;">${st.title}</strong>
                                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--muted-foreground);">hash: ${st.hash}</span>
                            </div>
                        </div>
                    </td>
                    <td>${st.engine}</td>
                    <td><span style="font-family: var(--font-mono);">${st.allocated}</span></td>
                    <td>${statusBadge}</td>
                    <td>${scoreCol}</td>
                    <td style="text-align: right;">${actionBtn}</td>
                </tr>
            `;
        }).join("");

        if (compositeEl) {
            if (progress.isAllCompleted) {
                compositeEl.innerHTML = `Active Candidate Ledger &bull; Composite: <strong style="font-family: var(--font-mono); color: #10b981; font-size: 15px;">${progress.totalScore} / 400 (${progress.percentage.toFixed(1)}%)</strong> &bull; <span style="color: #10b981; font-weight: 700;"><i class="fa-solid fa-circle-check"></i> ALL 4 ROUNDS COMPLETE</span>`;
            } else if (progress.completedCount > 0) {
                compositeEl.innerHTML = `Active Candidate Ledger &bull; Composite: <strong style="font-family: var(--font-mono); color: var(--primary);">${progress.totalScore} / 400</strong> &bull; <span>${progress.completedCount} of 4 Rounds Completed</span>`;
            } else {
                compositeEl.innerHTML = `Active Candidate Ledger &bull; Composite: <strong style="font-family: var(--font-mono); color: var(--muted-foreground);">0 / 400</strong> &bull; <span>0 of 4 Completed</span>`;
            }
        }
    }

    /**
     * Render Dossier Card with Real Evaluation Scores
     */
    function renderDossier(dossier) {
        const container = document.getElementById("dossierCard");
        if (!container || !dossier) return;

        const storedName = localStorage.getItem("userName") || "Thonduru Rukiya";
        const progress = getCandidateProgress();

        let badgeText = "";
        let statusText = "";
        let descText = "";
        let btnText = "";

        if (progress.isAllCompleted) {
            const pct = progress.percentage.toFixed(1);
            badgeText = `${progress.totalScore} / 400 (${pct}%)`;
            statusText = pct >= 80 ? "Strong Hire Recommended" : (pct >= 60 ? "Conditional Hire" : "Assessment Completed");
            descText = `Full 4-stage evaluation complete for <strong>${storedName}</strong>. All scores recorded and verified.`;
            btnText = `<i class="fa-solid fa-square-poll-vertical"></i> View Final Assessment Report`;
        } else if (progress.completedCount > 0) {
            badgeText = `${progress.totalScore} / 400 (${progress.completedCount}/4 Done)`;
            statusText = `In Progress (${progress.completedCount}/4 Completed)`;
            descText = `${progress.completedCount} of 4 assessment rounds finished for <strong>${storedName}</strong>. Current score: <strong>${progress.totalScore} pts</strong>.`;
            btnText = `<i class="fa-solid fa-chart-line"></i> View Current Score Card`;
        } else {
            badgeText = "0 / 400 (Not Started)";
            statusText = "Ready to Begin";
            descText = `Your interview score card, detailed breakdown, and feedback will be ready after completing rounds.`;
            btnText = `<i class="fa-solid fa-play"></i> Start Assessment (Round 1)`;
        }

        container.innerHTML = `
            <div class="dossier-left">
                <div class="dossier-icon" style="${progress.isAllCompleted ? 'background: rgba(16,185,129,0.15); color: #10b981; border-color: rgba(16,185,129,0.3);' : ''}">
                    <i class="fa-solid fa-file-shield"></i>
                </div>
                <div>
                    <div class="dossier-header-row">
                        <h4>${dossier.title}</h4>
                        <span class="dossier-score-badge" style="${progress.isAllCompleted ? 'background: rgba(16,185,129,0.18); color: #10b981; border-color: rgba(16,185,129,0.3);' : ''}">${badgeText}</span>
                    </div>
                    <p class="dossier-desc">${descText} &bull; Status: <strong>${statusText}</strong></p>
                </div>
            </div>
            <button class="btn-view-dossier" onclick="${progress.completedCount === 0 ? 'startInterview()' : 'showResult()'}" style="${progress.isAllCompleted ? 'background: linear-gradient(135deg, #059669, #10b981); box-shadow: 0 4px 14px rgba(16,185,129,0.3);' : ''}">
                ${btnText}
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
     * Internal Non-Repeating Set Selector (3 Sets: 1, 2, 3)
     */
    function getOrRotateNextSet() {
        const TOTAL_SETS = 3;
        let used = [];
        try {
            used = JSON.parse(localStorage.getItem("usedSetsHistory")) || [];
        } catch (e) {
            used = [];
        }

        // Available sets from 1..3 not yet used
        let available = [1, 2, 3].filter(s => !used.includes(s));

        // When all 3 sets are exhausted, cycle to the next set without repeating the last one
        if (available.length === 0) {
            const lastSet = Number(localStorage.getItem("lastInterviewSet")) || 1;
            used = [lastSet];
            available = [1, 2, 3].filter(s => s !== lastSet);
        }

        const chosenSet = available[0] || 1;
        used.push(chosenSet);

        localStorage.setItem("usedSetsHistory", JSON.stringify(used));
        localStorage.setItem("currentInterviewSet", chosenSet.toString());
        localStorage.setItem("lastInterviewSet", chosenSet.toString());

        return chosenSet;
    }
    window.getOrRotateNextSet = getOrRotateNextSet;

    /**
     * Cycle through question sets internally (noop for backward compat)
     */
    window.cycleInterviewSet = function () {
        getOrRotateNextSet();
    };

    /**
     * Launch Interview (Round 1) - Silently selects non-repeating set
     */
    window.startInterview = function () {
        getOrRotateNextSet();
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

        // Attach live search filter to stage search input
        const searchInput = document.getElementById("stageSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                renderStageTable(this.value);
            });
        }
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
        renderStageTable();
        if (window.syncCloudScores) window.syncCloudScores();
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
