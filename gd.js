// ===========================================
// AI Interview Preparation Assistant
// Round 2 - Group Discussion
// Set-Based Topics (Non-Repeating Rotation)
// ===========================================

const gdSets = {
    1: "Artificial Intelligence: Will it create higher-value human careers or lead to irreversible workforce displacement?",
    2: "Digital-First Classrooms vs Physical Campus Learning: Evaluating cognitive retention, social skills, and educational equity.",
    3: "The Future of Corporate Work: Analyzing employee productivity, mental well-being, and company culture in hybrid vs office models.",
    4: "Renewable Energy Transition: Balancing aggressive climate emission targets with industrial survival and developing economies.",
    5: "Digital Privacy in the Hyper-Connected Era: Striking the balance between state surveillance for security and individual freedom."
};

// Retrieve Active Non-Repeating Set
let currentSetId = Number(localStorage.getItem("currentInterviewSet")) || 1;
if (!gdSets[currentSetId]) {
    currentSetId = 1;
}

const topic = gdSets[currentSetId];
const gdTopicEl = document.getElementById("gdTopic");
if (gdTopicEl) {
    gdTopicEl.innerHTML = `[Set ${currentSetId}] ${topic}`;
}

// =============================
// AI Voice
// =============================

function speakTopic(){

window.speechSynthesis.cancel();

let speech = new SpeechSynthesisUtterance(topic);

speech.lang = "en-US";

speech.rate = 1;

window.speechSynthesis.speak(speech);

}

// Speak Automatically
window.onload = speakTopic;

// Play Again Button
document.getElementById("playTopicBtn")
.addEventListener("click",speakTopic);

// =============================
// Speech Recognition
// =============================

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

alert("Please use Google Chrome.");

}

const recognition = new SpeechRecognition();

recognition.continuous = true;

recognition.interimResults = true;

recognition.lang = "en-US";

let transcript="";

// Start Speaking
document.getElementById("startBtn").addEventListener("click", () => {
    try {
        recognition.start();
    } catch (e) {}

    const wave = document.getElementById("voiceWave");
    const orb = document.getElementById("aiAvatarOrb");
    const ring = document.getElementById("orbPulseRing");
    const label = document.getElementById("aiStatusLabel");

    if (wave) wave.classList.add("active");
    if (orb) orb.classList.add("listening");
    if (ring) ring.style.display = "block";
    if (label) {
        label.textContent = "AI Moderator: Actively Listening & Analyzing Speech...";
        label.style.color = "#059669";
    }
});

// Stop Speaking
document.getElementById("stopBtn").addEventListener("click", () => {
    try {
        recognition.stop();
    } catch (e) {}

    const wave = document.getElementById("voiceWave");
    const orb = document.getElementById("aiAvatarOrb");
    const ring = document.getElementById("orbPulseRing");
    const label = document.getElementById("aiStatusLabel");

    if (wave) wave.classList.remove("active");
    if (orb) orb.classList.remove("listening");
    if (ring) ring.style.display = "none";
    if (label) {
        label.textContent = "AI Moderator: Microphone Paused";
        label.style.color = "#64748b";
    }
});

// Convert Voice to Text
recognition.onresult = function(event) {
    transcript = "";
    for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
    }

    const transcriptEl = document.getElementById("transcript");
    if (transcriptEl) transcriptEl.innerHTML = transcript;

    let words = transcript.trim();
    let count = words === "" ? 0 : words.split(/\s+/).length;

    const wordCountEl = document.getElementById("wordCount");
    if (wordCountEl) wordCountEl.innerHTML = count;

    // Quality Indicator
    const qualityTag = document.getElementById("speechQualityTag");
    if (qualityTag) {
        if (count >= 180) {
            qualityTag.innerHTML = `<span style="color:#059669; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Excellent Articulation (Target Reached)</span>`;
        } else if (count >= 100) {
            qualityTag.innerHTML = `<span style="color:#2563eb; font-weight:600;"><i class="fa-solid fa-chart-line"></i> Good Content Progression</span>`;
        } else if (count >= 50) {
            qualityTag.innerHTML = `<span style="color:#d97706;"><i class="fa-solid fa-info-circle"></i> Approaching Recommended Depth</span>`;
        } else {
            qualityTag.innerHTML = `<span style="color:#94a3b8;"><i class="fa-solid fa-chart-simple"></i> Minimum 50 words required</span>`;
        }
    }
};

// =============================
// Timer (5 Minutes)
// =============================

let time=300;

const timer=document.getElementById("timer");

const countdown=setInterval(()=>{

let min=Math.floor(time/60);

let sec=time%60;

timer.innerHTML=`${min}:${sec<10?"0":""}${sec}`;

time--;

if(time<0){

clearInterval(countdown);

recognition.stop();

finishGD();

}

},1000);

// =============================
// Finish GD
// =============================

document.getElementById("finishBtn")
.addEventListener("click",finishGD);

function finishGD(){

recognition.stop();

clearInterval(countdown);

let words=transcript.trim();

let count=0;

if(words!==""){

count=words.split(/\s+/).length;

}

let score=0;

if(count>=200){

score=100;

}else if(count>=150){

score=80;

}else if(count>=100){

score=60;

}else if(count>=50){

score=40;

}else{

score=20;

}

    localStorage.setItem("gd", score);

    if (window.showRoundTransitionModal) {
        window.showRoundTransitionModal(
            "Round 2: AI Group Discussion",
            `Score: ${score} / 100 Marks (${count} Words)`,
            "Round 3: Technical Coding Interview",
            "tech.html"
        );
    } else {
        window.location.href = "tech.html";
    }
}