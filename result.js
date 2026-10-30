// ==========================================
// AI Interview Preparation Assistant
// Result Page
// ==========================================

// Candidate Profile Information
let candidateName = localStorage.getItem("userName") || "Thonduru Rukiya";
let candidateId = localStorage.getItem("candidateId") || "ALTS-2026-9041";
let trackName = localStorage.getItem("candidateTrack") || "SDE Level-1 Track";

const nameDisplayEl = document.getElementById("candidateNameHeader");
if (nameDisplayEl) nameDisplayEl.textContent = candidateName;

const idDisplayEl = document.getElementById("candidateIdDisplay");
if (idDisplayEl) idDisplayEl.textContent = candidateId;

const trackDisplayEl = document.getElementById("candidateTrackDisplay");
if (trackDisplayEl) trackDisplayEl.textContent = trackName;

// Get Scores from localStorage (with calibrated candidate defaults)
let aptitude = localStorage.getItem("aptitude") !== null ? Number(localStorage.getItem("aptitude")) : 100;
let gd = localStorage.getItem("gd") !== null ? Number(localStorage.getItem("gd")) : 100;
let technical = localStorage.getItem("technical") !== null ? Number(localStorage.getItem("technical")) : (localStorage.getItem("tech") !== null ? Number(localStorage.getItem("tech")) : 100);
let hr = localStorage.getItem("hr") !== null ? Number(localStorage.getItem("hr")) : 98;

// Display Individual Scores
document.getElementById("aptitudeMarks").innerHTML = aptitude;
document.getElementById("gdMarks").innerHTML = gd;
document.getElementById("technicalMarks").innerHTML = technical;
document.getElementById("hrMarks").innerHTML = hr;

// Calculate Total
let total = aptitude + gd + technical + hr;

// Display Total
document.getElementById("totalMarks").innerHTML = total;

// Calculate Percentage
let percentage = (total / 400) * 100;

// Display Percentage
document.getElementById("percentage").innerHTML =
percentage.toFixed(2) + "%";

// Performance
let performance = "";

if (percentage >= 90) {

    performance = "Excellent";

}
else if (percentage >= 75) {

    performance = "Very Good";

}
else if (percentage >= 60) {

    performance = "Good";

}
else if (percentage >= 40) {

    performance = "Average";

}
else {

    performance = "Needs Improvement";

}

// Display Performance
document.getElementById("performance").innerHTML = performance;

// ==========================================
// Executive Circular Gauge & Competency Bars
// ==========================================
const gaugeEl = document.getElementById("gaugePercentage");
if (gaugeEl) {
    gaugeEl.textContent = (percentage >= 99 ? percentage.toFixed(1) : Math.round(percentage)) + "%";
}

const gaugeCircle = document.getElementById("gaugeCircle");
if (gaugeCircle) {
    const circumference = 339.29; // 2 * PI * 54
    const offset = circumference - (circumference * percentage) / 100;
    setTimeout(() => {
        gaugeCircle.style.strokeDashoffset = offset;
    }, 150);
}

// Hiring Status Chip
const hiringChip = document.getElementById("hiringStatusChip");
const hiringText = document.getElementById("hiringStatusText");
if (hiringChip && hiringText) {
    if (percentage >= 80) {
        hiringChip.className = "hiring-status-chip hire";
        hiringText.textContent = "Strong Hire Recommended";
    } else if (percentage >= 60) {
        hiringChip.className = "hiring-status-chip conditional";
        hiringText.textContent = "Conditional Hire / Needs Follow-up";
    } else {
        hiringChip.className = "hiring-status-chip review";
        hiringText.textContent = "Needs Further Practice & Improvement";
    }
}

// Populate Skill Competency Progress Matrix
const setSkillBar = (displayId, barId, marks) => {
    const displayEl = document.getElementById(displayId);
    const barEl = document.getElementById(barId);
    if (displayEl) displayEl.textContent = marks;
    if (barEl) {
        setTimeout(() => {
            barEl.style.width = Math.min(marks, 100) + "%";
        }, 200);
    }
};

setSkillBar("aptitudeScoreDisplay", "aptitudeBar", aptitude);
setSkillBar("gdScoreDisplay", "gdBar", gd);
setSkillBar("technicalScoreDisplay", "technicalBar", technical);
setSkillBar("hrScoreDisplay", "hrBar", hr);

// ==========================================
// Assessment Integrity & Proctoring Summary
// ==========================================
const strikes = parseInt(localStorage.getItem("proctoringStrikes"), 10) || 0;
const isFlagged = localStorage.getItem("proctoringFlagged") === "true";
const camStatus = localStorage.getItem("proctoringCamStatus") || "Verified Online";
const fsExits = parseInt(localStorage.getItem("proctoringFullscreenExits"), 10) || 0;

let logs = [];
try {
    logs = JSON.parse(localStorage.getItem("proctoringLogs")) || [];
} catch (e) {
    logs = [];
}

// 1. System Integrity status
const camEl = document.getElementById("integrityCamStatus");
if (camEl) {
    camEl.textContent = "Focus & Defense Active";
    camEl.style.color = "#059669";
}

// 2. Fullscreen status
const fsEl = document.getElementById("integrityFullscreenStatus");
if (fsEl) {
    if (fsExits === 0) {
        fsEl.textContent = "100% Compliant";
        fsEl.style.color = "#059669";
    } else {
        fsEl.textContent = `Exited ${fsExits} Time(s)`;
        fsEl.style.color = fsExits > 2 ? "#dc2626" : "#d97706";
    }
}

// 3. Strikes
const strikesEl = document.getElementById("integrityStrikes");
if (strikesEl) {
    strikesEl.textContent = `${strikes} / 3 Strikes`;
    if (strikes >= 3 || isFlagged) {
        strikesEl.style.color = "#dc2626";
    } else if (strikes > 0) {
        strikesEl.style.color = "#d97706";
    } else {
        strikesEl.style.color = "#059669";
    }
}

// 4. Badge & Risk Level
const badgeEl = document.getElementById("integrityBadge");
const riskEl = document.getElementById("integrityRiskLevel");

if (isFlagged || strikes >= 3) {
    if (badgeEl) {
        badgeEl.textContent = "Flagged (Integrity Breach)";
        badgeEl.className = "integrity-badge flagged";
    }
    if (riskEl) {
        riskEl.textContent = "High Risk (Disqualified / Manual Audit)";
        riskEl.style.color = "#dc2626";
    }
} else if (strikes > 0) {
    if (badgeEl) {
        badgeEl.textContent = "Caution (Warnings Logged)";
        badgeEl.className = "integrity-badge";
        badgeEl.style.background = "#fffbeb";
        badgeEl.style.color = "#d97706";
        badgeEl.style.border = "1px solid #fef3c7";
    }
    if (riskEl) {
        riskEl.textContent = "Medium Risk (Suspicious Activity)";
        riskEl.style.color = "#d97706";
    }
} else {
    if (badgeEl) {
        badgeEl.textContent = "Verified (Passed Clean)";
        badgeEl.className = "integrity-badge verified";
    }
    if (riskEl) {
        riskEl.textContent = "Low Risk (High Integrity)";
        riskEl.style.color = "#059669";
    }
}

// 5. Populate Audit Logs
const logsContainer = document.getElementById("integrityLogs");
if (logsContainer) {
    if (logs.length > 0) {
        logsContainer.innerHTML = logs.map(l => `
            <div class="integrity-log-item">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <strong>[${l.time}] ${l.round}:</strong> ${l.reason}
            </div>
        `).join("");
    } else {
        logsContainer.innerHTML = `<div class="integrity-log-empty"><i class="fa-solid fa-shield-check" style="color: #10b981; margin-right: 6px;"></i> No infractions detected. Candidate adhered strictly to all assessment rules.</div>`;
    }
}

// Restart Interview
document.getElementById("restartBtn")
.addEventListener("click", function () {

    localStorage.removeItem("aptitude");
    localStorage.removeItem("gd");
    localStorage.removeItem("technical");
    localStorage.removeItem("tech");
    localStorage.removeItem("hr");

    // Reset proctoring metrics
    localStorage.setItem("proctoringStrikes", "0");
    localStorage.setItem("proctoringLogs", JSON.stringify([]));
    localStorage.setItem("proctoringFlagged", "false");
    localStorage.setItem("proctoringFullscreenExits", "0");
    localStorage.setItem("proctoringCamStatus", "Verified Online");

    // Automatically advance to the next set so the previous set DOES NOT repeat!
    const totalSets = 5;
    let currentSet = Number(localStorage.getItem("currentInterviewSet")) || 1;
    let nextSet = (currentSet % totalSets) + 1;
    localStorage.setItem("currentInterviewSet", nextSet);
    localStorage.setItem("lastInterviewSet", nextSet);

    window.location.href = "dashboard.html";

});

// Logout
document.getElementById("logoutBtn")
.addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "index.html";

});