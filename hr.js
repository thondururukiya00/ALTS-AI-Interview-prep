// ==========================================
// AI Interview Preparation Assistant
// Round 4 - HR & Behavioral Interview
// Progressive Difficulty: Easy -> Medium -> Hard
// ==========================================

const hrSets = {
    1: [
        {
            difficulty: "Easy",
            question: "Tell me about yourself, your educational background, and your key technical interests."
        },
        {
            difficulty: "Easy",
            question: "What are your top strengths, and how have they helped you in academic or personal projects?"
        },
        {
            difficulty: "Medium",
            question: "Why do you want to join our organization, and what makes you a great fit for our team?"
        },
        {
            difficulty: "Medium",
            question: "Describe a challenging situation or high-pressure deadline you faced. How did you manage it?"
        },
        {
            difficulty: "Hard",
            question: "Describe a situation where you had a strong disagreement with a peer or team member. How did you resolve the conflict professionally?"
        }
    ],
    2: [
        {
            difficulty: "Easy",
            question: "Walk me through your resume and why you chose computer science as your career path."
        },
        {
            difficulty: "Easy",
            question: "What motivates you to perform at your best, even during challenging tasks?"
        },
        {
            difficulty: "Medium",
            question: "Where do you see yourself professionally in the next three to five years?"
        },
        {
            difficulty: "Medium",
            question: "Tell me about a team project where things didn't go as planned. What actions did you take to help the team?"
        },
        {
            difficulty: "Hard",
            question: "Tell me about a time you made a significant mistake or failed at a goal. What valuable lessons did you learn from that experience?"
        }
    ],
    3: [
        {
            difficulty: "Easy",
            question: "Describe yourself in three words and give a brief explanation for each."
        },
        {
            difficulty: "Easy",
            question: "What hobbies or activities do you pursue outside of technology and studies?"
        },
        {
            difficulty: "Medium",
            question: "What type of workplace culture and management style brings out the best in you?"
        },
        {
            difficulty: "Medium",
            question: "How do you prioritize multiple urgent deliverables when facing strict competing deadlines?"
        },
        {
            difficulty: "Hard",
            question: "If you were assigned a high-priority task with vague, contradictory requirements and minimal guidance, what exact steps would you take?"
        }
    ],
    4: [
        {
            difficulty: "Easy",
            question: "What inspired you to get into the software development and tech industry?"
        },
        {
            difficulty: "Easy",
            question: "What is one professional or technical weakness you have identified and are actively working to improve?"
        },
        {
            difficulty: "Medium",
            question: "Why should we hire you over other qualified candidates applying for this position?"
        },
        {
            difficulty: "Medium",
            question: "Tell me about a time you received critical feedback. How did you react and what changes did you make?"
        },
        {
            difficulty: "Hard",
            question: "Describe an instance where you had to persuade someone who strongly opposed your technical or operational proposal. How did you gain their agreement?"
        }
    ],
    5: [
        {
            difficulty: "Easy",
            question: "Tell me about your favorite technical project and the impact it created."
        },
        {
            difficulty: "Easy",
            question: "Are you open to relocating, learning new tech stacks on short notice, or working in flexible shifts?"
        },
        {
            difficulty: "Medium",
            question: "How do you consistently stay updated with emerging technology trends and continuous self-learning?"
        },
        {
            difficulty: "Medium",
            question: "Describe a time when you had to rapidly adapt to a sudden, unexpected change in a project or environment."
        },
        {
            difficulty: "Hard",
            question: "What would you do if a team member consistently missed their deadlines on a mission-critical deliverable close to launch?"
        }
    ]
};

// Retrieve Active Non-Repeating Set
let currentSetId = Number(localStorage.getItem("currentInterviewSet")) || 1;
if (!hrSets[currentSetId]) {
    currentSetId = 1;
    localStorage.setItem("currentInterviewSet", 1);
}

// Load Questions from Active Set (strictly ordered Easy -> Medium -> Hard)
const selectedQuestions = hrSets[currentSetId];
let currentQuestion = 0;
let aiSpeechTimer = null;
let cumulativeWordCount = 0;
let currentQuestionWordCount = 0;
let accumulatedTranscript = "";

const hrQuestionEl = document.getElementById("hrQuestion");
const questionNumberEl = document.getElementById("questionNumber");
const progressBarEl = document.getElementById("progressBar");
const hrSetBadgeEl = document.getElementById("hrSetBadge");
const hrDifficultyBadgeEl = document.getElementById("hrDifficultyBadge");
const transcriptEl = document.getElementById("transcript");
const wordCountEl = document.getElementById("wordCount");
const micHelpText = document.getElementById("micHelpText");
const qualityTag = document.getElementById("speechQualityTag");

const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finishBtn");
const playQuestionBtn = document.getElementById("playQuestionBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// Speech Synthesis Voices
function getPreferredVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    return voices.find(v => (v.lang === "en-US" || v.lang.startsWith("en")) &&
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Jenny") || v.name.includes("David")))
        || voices.find(v => v.lang.startsWith("en"))
        || voices[0];
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        getPreferredVoice();
    };
}

// Speech Synthesis
function speakQuestion() {
    if (!('speechSynthesis' in window)) return;
    if (!selectedQuestions[currentQuestion]) return;

    try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const speech = new SpeechSynthesisUtterance(selectedQuestions[currentQuestion].question);
        speech.lang = "en-US";
        speech.rate = 0.95;
        speech.pitch = 1.0;

        const voice = getPreferredVoice();
        if (voice) speech.voice = voice;

        const wave = document.getElementById("voiceWave");
        const orb = document.getElementById("aiAvatarOrb");
        const ring = document.getElementById("orbPulseRing");
        const label = document.getElementById("aiStatusLabel");

        speech.onstart = () => {
            if (wave) wave.classList.add("active");
            if (orb) orb.classList.add("listening");
            if (ring) ring.style.display = "block";
            if (label) {
                label.textContent = "AI Interviewer: Reading Question...";
                label.style.color = "#2563eb";
            }
            if (playQuestionBtn) playQuestionBtn.innerHTML = `🔊 Reading Question...`;
        };

        speech.onend = () => {
            if (aiSpeechTimer) { clearInterval(aiSpeechTimer); aiSpeechTimer = null; }
            if (wave) wave.classList.remove("active");
            if (orb) orb.classList.remove("listening");
            if (ring) ring.style.display = "none";
            if (label) {
                label.textContent = "AI Interviewer: Ready to Record Your Answer";
                label.style.color = "#64748b";
            }
            if (playQuestionBtn) playQuestionBtn.innerHTML = `🔊 Replay Question`;
        };

        speech.onerror = (e) => {
            if (aiSpeechTimer) { clearInterval(aiSpeechTimer); aiSpeechTimer = null; }
            console.warn("Speech synthesis error:", e);
            if (playQuestionBtn) playQuestionBtn.innerHTML = `🔊 Listen to Question`;
        };

        window.speechSynthesis.speak(speech);

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
        console.warn("speakQuestion failed:", err);
    }
}

function getTranscriptContent() {
    if (!transcriptEl) return "";
    return (transcriptEl.value !== undefined ? transcriptEl.value : transcriptEl.textContent) || "";
}

function updateWordDisplay() {
    const text = getTranscriptContent().trim();
    const words = text === "" ? [] : text.split(/\s+/).filter(Boolean);
    currentQuestionWordCount = words.length;

    if (wordCountEl) {
        wordCountEl.textContent = `${currentQuestionWordCount} (Total across round: ${cumulativeWordCount + currentQuestionWordCount})`;
    }

    if (qualityTag) {
        const total = cumulativeWordCount + currentQuestionWordCount;
        if (total >= 180) {
            qualityTag.innerHTML = `<span style="color:#059669; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Target Reached (180+ Words)</span>`;
        } else if (total >= 100) {
            qualityTag.innerHTML = `<span style="color:#2563eb; font-weight:600;"><i class="fa-solid fa-chart-line"></i> Good Progression</span>`;
        } else {
            qualityTag.innerHTML = `<span style="color:#94a3b8;"><i class="fa-solid fa-chart-simple"></i> Target: 180+ Cumulative Words</span>`;
        }
    }
}

if (transcriptEl) {
    transcriptEl.addEventListener("input", () => {
        accumulatedTranscript = getTranscriptContent();
        updateWordDisplay();
    });
}

// Display Current Question
function updateQuestionUI() {
    const q = selectedQuestions[currentQuestion];
    if (!q) return;

    if (hrQuestionEl) hrQuestionEl.textContent = q.question;
    if (questionNumberEl) questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${selectedQuestions.length}`;
    if (progressBarEl) {
        progressBarEl.max = selectedQuestions.length;
        progressBarEl.value = currentQuestion + 1;
    }

    if (hrSetBadgeEl) hrSetBadgeEl.textContent = `Set ${currentSetId} of 5`;

    if (hrDifficultyBadgeEl) {
        hrDifficultyBadgeEl.textContent = q.difficulty;
        if (q.difficulty === "Easy") {
            hrDifficultyBadgeEl.style.background = "#ecfdf5";
            hrDifficultyBadgeEl.style.color = "#059669";
            hrDifficultyBadgeEl.style.borderColor = "#a7f3d0";
        } else if (q.difficulty === "Medium") {
            hrDifficultyBadgeEl.style.background = "#fffbeb";
            hrDifficultyBadgeEl.style.color = "#d97706";
            hrDifficultyBadgeEl.style.borderColor = "#fde68a";
        } else {
            hrDifficultyBadgeEl.style.background = "#fef2f2";
            hrDifficultyBadgeEl.style.color = "#dc2626";
            hrDifficultyBadgeEl.style.borderColor = "#fecaca";
        }
    }

    if (transcriptEl) {
        if (transcriptEl.value !== undefined) {
            transcriptEl.value = "";
        } else {
            transcriptEl.textContent = "";
        }
    }
    accumulatedTranscript = "";
    currentQuestionWordCount = 0;
    updateWordDisplay();

    if (playQuestionBtn) playQuestionBtn.innerHTML = `🔊 Listen to Question`;

    if (currentQuestion === selectedQuestions.length - 1) {
        if (nextBtn) nextBtn.style.display = "none";
        if (finishBtn) finishBtn.style.display = "inline-flex";
    } else {
        if (nextBtn) nextBtn.style.display = "inline-flex";
        if (finishBtn) finishBtn.style.display = "none";
    }
}

// Speech Recognition
const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let recognition = null;
let isRecognizing = false;

if (SpeechRecognitionClass) {
    try {
        recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = function () {
            isRecognizing = true;
            if (startBtn) {
                startBtn.style.background = "#059669";
                startBtn.innerHTML = `🎙️ Listening...`;
            }

            const wave = document.getElementById("voiceWave");
            const orb = document.getElementById("aiAvatarOrb");
            const ring = document.getElementById("orbPulseRing");
            const label = document.getElementById("aiStatusLabel");

            if (wave) wave.classList.add("active");
            if (orb) orb.classList.add("listening");
            if (ring) ring.style.display = "block";
            if (label) {
                label.textContent = "AI Interviewer: Actively Transcribing Your Answer...";
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
            updateWordDisplay();
        };

        recognition.onerror = function (event) {
            console.warn("HR Speech Recognition Error:", event.error);
            isRecognizing = false;
            if (startBtn) {
                startBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
                startBtn.innerHTML = `🎤 Start Speaking`;
            }
            if (micHelpText) {
                micHelpText.style.display = "block";
                micHelpText.innerHTML = `<i class="fa-solid fa-circle-info"></i> Microphone status: <strong>${event.error}</strong>. You can type your answer directly in the box above!`;
            }
        };

        recognition.onend = function () {
            isRecognizing = false;
            if (startBtn) {
                startBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
                startBtn.innerHTML = `🎤 Start Speaking`;
            }
        };
    } catch (e) {
        console.warn("HR SpeechRecognition init error:", e);
    }
}

if (startBtn) {
    startBtn.addEventListener("click", () => {
        window.speechSynthesis.cancel();

        if (recognition && !isRecognizing) {
            try {
                recognition.start();
            } catch (err) {
                console.warn("Recognition start retry:", err);
                try {
                    recognition.stop();
                    setTimeout(() => recognition.start(), 200);
                } catch (e) {}
            }
        } else if (!recognition) {
            if (micHelpText) {
                micHelpText.style.display = "block";
                micHelpText.innerHTML = `<i class="fa-solid fa-keyboard"></i> Speech recognition is unavailable in this browser. Please type your answer directly!`;
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
            try { recognition.stop(); } catch (e) {}
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

        if (startBtn) {
            startBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
            startBtn.innerHTML = `🎤 Start Speaking`;
        }

        // 3. Stop animations & reset indicator
        const wave = document.getElementById("voiceWave");
        const orb = document.getElementById("aiAvatarOrb");
        const ring = document.getElementById("orbPulseRing");
        const label = document.getElementById("aiStatusLabel");

        if (wave) wave.classList.remove("active");
        if (orb) orb.classList.remove("listening");
        if (ring) ring.style.display = "none";
        if (label) {
            label.textContent = "AI Interviewer: Microphone & AI Voice Paused";
            label.style.color = "#64748b";
        }
        if (playQuestionBtn) {
            playQuestionBtn.innerHTML = `🔊 Listen to Question`;
        }
    });
}

if (playQuestionBtn) {
    playQuestionBtn.addEventListener("click", speakQuestion);
}

// Next Question
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (recognition && isRecognizing) {
            try { recognition.stop(); } catch (e) {}
            isRecognizing = false;
        }
        window.speechSynthesis.cancel();
        if (startBtn) {
            startBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
            startBtn.innerHTML = `🎤 Start Speaking`;
        }

        // Accumulate word count from current question
        updateWordDisplay();
        cumulativeWordCount += currentQuestionWordCount;

        if (currentQuestion < selectedQuestions.length - 1) {
            currentQuestion++;
            updateQuestionUI();
            // Automatically play new question
            speakQuestion();
        }
    });
}

// Finish Interview
if (finishBtn) {
    finishBtn.addEventListener("click", () => {
        if (recognition && isRecognizing) {
            try { recognition.stop(); } catch (e) {}
            isRecognizing = false;
        }
        window.speechSynthesis.cancel();

        updateWordDisplay();
        cumulativeWordCount += currentQuestionWordCount;

        // Calculate score based on total communicative engagement across all 5 questions
        let hrScore = 0;
        if (cumulativeWordCount >= 180) {
            hrScore = 100;
        } else if (cumulativeWordCount >= 130) {
            hrScore = 85;
        } else if (cumulativeWordCount >= 80) {
            hrScore = 70;
        } else if (cumulativeWordCount >= 40) {
            hrScore = 55;
        } else {
            hrScore = 35;
        }

        localStorage.setItem("hr", hrScore);
        if (window.saveScoreToSupabase) window.saveScoreToSupabase(4, "HR & Behavioral", hrScore);

        // Advance active set for next session
        const totalSets = 5;
        let nextSet = (currentSetId % totalSets) + 1;
        localStorage.setItem("currentInterviewSet", nextSet);
        localStorage.setItem("lastInterviewSet", nextSet);

        if (window.showRoundTransitionModal) {
            window.showRoundTransitionModal(
                "Round 4: HR & Behavioral Round",
                `HR Score: ${hrScore} / 100 (${cumulativeWordCount} Total Words)`,
                "Executive Performance & Audit Report",
                "result.html"
            );
        } else {
            window.location.href = "result.html";
        }
    });
}

// Timer (10 Minutes)
let timeLeft = 600;
const timerEl = document.getElementById("timer");

const hrTimer = setInterval(() => {
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    if (timerEl) {
        timerEl.textContent = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    }

    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(hrTimer);
        alert("Time is up! Submitting HR Round.");
        if (finishBtn) finishBtn.click();
    }
}, 1000);

// Initialize on Load
window.addEventListener("load", () => {
    updateQuestionUI();
});
