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
    gdTopicEl.innerHTML = `<strong>[Set ${currentSetId}]</strong> ${topic}`;
}

// =============================
// AI Voice (Speech Synthesis)
// =============================
let isSpeakingAi = false;
let aiSpeechTimer = null;

function getPreferredVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    return voices.find(v => (v.lang === "en-US" || v.lang.startsWith("en")) &&
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Jenny") || v.name.includes("David")))
        || voices.find(v => v.lang.startsWith("en"))
        || voices[0];
}

// Proactively load voices
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        getPreferredVoice();
    };
}

function speakTopic() {
    if (!('speechSynthesis' in window)) {
        console.warn("Speech Synthesis API not available in this browser.");
        return;
    }

    try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const speech = new SpeechSynthesisUtterance(topic);
        speech.lang = "en-US";
        speech.rate = 0.95;
        speech.pitch = 1.0;

        const voice = getPreferredVoice();
        if (voice) speech.voice = voice;

        const wave = document.getElementById("voiceWave");
        const orb = document.getElementById("aiAvatarOrb");
        const ring = document.getElementById("orbPulseRing");
        const label = document.getElementById("aiStatusLabel");
        const playBtn = document.getElementById("playTopicBtn");

        speech.onstart = () => {
            isSpeakingAi = true;
            if (wave) wave.classList.add("active");
            if (orb) orb.classList.add("listening");
            if (ring) ring.style.display = "block";
            if (label) {
                label.textContent = "AI Moderator: Reading Discussion Topic...";
                label.style.color = "#7c3aed";
            }
            if (playBtn) playBtn.innerHTML = `🔊 Playing Topic...`;
        };

        speech.onend = () => {
            if (aiSpeechTimer) { clearInterval(aiSpeechTimer); aiSpeechTimer = null; }
            isSpeakingAi = false;
            if (wave) wave.classList.remove("active");
            if (orb) orb.classList.remove("listening");
            if (ring) ring.style.display = "none";
            if (label) {
                label.textContent = "AI Moderator: Ready to Listen";
                label.style.color = "#64748b";
            }
            if (playBtn) playBtn.innerHTML = `🔊 Replay Topic Speech`;
        };

        speech.onerror = (e) => {
            if (aiSpeechTimer) { clearInterval(aiSpeechTimer); aiSpeechTimer = null; }
            console.warn("Speech synthesis error:", e);
            isSpeakingAi = false;
            if (playBtn) playBtn.innerHTML = `🔊 Play Topic Speech`;
        };

        window.speechSynthesis.speak(speech);

        // Chrome pause workaround
        if (aiSpeechTimer) clearInterval(aiSpeechTimer);
        aiSpeechTimer = setInterval(() => {
            if (!window.speechSynthesis.speaking) {
                clearInterval(aiSpeechTimer);
                aiSpeechTimer = null;
            } else {
                window.speechSynthesis.resume();
            }
        }, 3000);
    } catch (err) {
        console.warn("speakTopic failed:", err);
    }
}

// User-gesture triggers
const playTopicBtn = document.getElementById("playTopicBtn");
if (playTopicBtn) {
    playTopicBtn.addEventListener("click", speakTopic);
}

// Attempt initial greeting on first candidate interaction
let hasAttemptedInitialSpeak = false;
function tryInitialSpeak() {
    if (hasAttemptedInitialSpeak) return;
    hasAttemptedInitialSpeak = true;
    speakTopic();
}
document.addEventListener("click", tryInitialSpeak, { once: true });

// =============================
// Speech Recognition (Voice Input) + Manual Typing Fallback
// =============================
const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let recognition = null;
let isRecognizing = false;
let accumulatedTranscript = "";

const transcriptEl = document.getElementById("transcript");
const wordCountEl = document.getElementById("wordCount");
const qualityTag = document.getElementById("speechQualityTag");
const micHelpText = document.getElementById("micHelpText");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function getTranscriptContent() {
    if (!transcriptEl) return "";
    return (transcriptEl.value !== undefined ? transcriptEl.value : transcriptEl.textContent) || "";
}

function updateWordCountAndQuality() {
    const text = getTranscriptContent().trim();
    const words = text === "" ? [] : text.split(/\s+/).filter(Boolean);
    const count = words.length;

    if (wordCountEl) wordCountEl.textContent = count;

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
}

if (transcriptEl) {
    transcriptEl.addEventListener("input", () => {
        accumulatedTranscript = getTranscriptContent();
        updateWordCountAndQuality();
    });
}

if (SpeechRecognitionClass) {
    try {
        recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = function () {
            isRecognizing = true;
            if (startBtn) {
                startBtn.innerHTML = `🎙️ Listening...`;
                startBtn.style.background = "#059669";
            }
            const wave = document.getElementById("voiceWave");
            const orb = document.getElementById("aiAvatarOrb");
            const ring = document.getElementById("orbPulseRing");
            const label = document.getElementById("aiStatusLabel");

            if (wave) wave.classList.add("active");
            if (orb) orb.classList.add("listening");
            if (ring) ring.style.display = "block";
            if (label) {
                label.textContent = "AI Moderator: Actively Listening & Transcribing Speech...";
                label.style.color = "#059669";
            }
            if (micHelpText) micHelpText.style.display = "none";
        };

        recognition.onresult = function (event) {
            let interim = "";
            let finalStr = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const text = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalStr += text + " ";
                } else {
                    interim += text;
                }
            }

            if (finalStr) {
                accumulatedTranscript = (accumulatedTranscript ? accumulatedTranscript.trim() + " " : "") + finalStr.trim();
            }

            const displayText = (accumulatedTranscript + (interim ? " " + interim : "")).trim();
            if (transcriptEl) {
                if (transcriptEl.value !== undefined) {
                    transcriptEl.value = displayText;
                } else {
                    transcriptEl.textContent = displayText;
                }
            }
            updateWordCountAndQuality();
        };

        recognition.onerror = function (event) {
            console.warn("Speech Recognition Error:", event.error);
            isRecognizing = false;
            if (startBtn) {
                startBtn.innerHTML = `🎤 Start Speaking`;
                startBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
            }
            if (micHelpText) {
                micHelpText.style.display = "block";
                micHelpText.innerHTML = `<i class="fa-solid fa-circle-info"></i> Microphone status: <strong>${event.error}</strong>. You can type your response directly in the box above!`;
            }
        };

        recognition.onend = function () {
            isRecognizing = false;
            if (startBtn) {
                startBtn.innerHTML = `🎤 Start Speaking`;
                startBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
            }
        };
    } catch (e) {
        console.warn("SpeechRecognition initialization failed:", e);
    }
}

// Start Speaking Button
if (startBtn) {
    startBtn.addEventListener("click", () => {
        window.speechSynthesis.cancel();

        if (recognition && !isRecognizing) {
            try {
                recognition.start();
            } catch (e) {
                console.warn("Recognition start failed, restarting:", e);
                try {
                    recognition.stop();
                    setTimeout(() => recognition.start(), 200);
                } catch (err) { }
            }
        } else if (!recognition) {
            if (micHelpText) {
                micHelpText.style.display = "block";
                micHelpText.innerHTML = `<i class="fa-solid fa-keyboard"></i> Speech recognition is not supported in this browser. Please type your discussion points directly in the box!`;
            }
            if (transcriptEl) transcriptEl.focus();
        }
    });
}

// Stop/Pause Speaking Button (Pauses BOTH microphone & speaking AI voice)
if (stopBtn) {
    stopBtn.addEventListener("click", () => {
        // 1. Pause & Stop Microphone
        if (recognition && isRecognizing) {
            try {
                recognition.stop();
            } catch (e) { }
        }
        isRecognizing = false;

        // 2. Pause & Silence Speaking AI Voice
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        if (aiSpeechTimer) {
            clearInterval(aiSpeechTimer);
            aiSpeechTimer = null;
        }
        isSpeakingAi = false;

        // 3. Stop animations & reset indicator
        const wave = document.getElementById("voiceWave");
        const orb = document.getElementById("aiAvatarOrb");
        const ring = document.getElementById("orbPulseRing");
        const label = document.getElementById("aiStatusLabel");

        if (wave) wave.classList.remove("active");
        if (orb) orb.classList.remove("listening");
        if (ring) ring.style.display = "none";
        if (label) {
            label.textContent = "AI Moderator: Microphone & AI Voice Paused";
            label.style.color = "#64748b";
        }
        if (startBtn) {
            startBtn.innerHTML = `🎤 Start Speaking`;
            startBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
        }
        const playBtn = document.getElementById("playTopicBtn");
        if (playBtn) {
            playBtn.innerHTML = `🔊 Play Topic Speech`;
        }
    });
}

// =============================
// Timer (5 Minutes)
// =============================
let time = 300;
const timerEl = document.getElementById("timer");

const countdown = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;

    if (timerEl) {
        timerEl.innerHTML = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }

    time--;

    if (time < 0) {
        clearInterval(countdown);
        if (recognition) {
            try { recognition.stop(); } catch (e) { }
        }
        finishGD();
    }
}, 1000);

// =============================
// Finish GD
// =============================
const finishBtn = document.getElementById("finishBtn");
if (finishBtn) {
    finishBtn.addEventListener("click", finishGD);
}

function finishGD() {
    if (recognition) {
        try { recognition.stop(); } catch (e) { }
    }
    window.speechSynthesis.cancel();
    clearInterval(countdown);

    const wordsStr = getTranscriptContent().trim();
    const count = wordsStr === "" ? 0 : wordsStr.split(/\s+/).filter(Boolean).length;

    let score = 0;
    if (count >= 200) {
        score = 100;
    } else if (count >= 150) {
        score = 80;
    } else if (count >= 100) {
        score = 60;
    } else if (count >= 50) {
        score = 40;
    } else {
        score = 20;
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
