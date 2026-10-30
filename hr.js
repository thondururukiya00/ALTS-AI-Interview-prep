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
let cumulativeWordCount = 0;
let currentQuestionWordCount = 0;

const hrQuestionEl = document.getElementById("hrQuestion");
const questionNumberEl = document.getElementById("questionNumber");
const progressBarEl = document.getElementById("progressBar");
const hrSetBadgeEl = document.getElementById("hrSetBadge");
const hrDifficultyBadgeEl = document.getElementById("hrDifficultyBadge");
const transcriptEl = document.getElementById("transcript");
const wordCountEl = document.getElementById("wordCount");

const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finishBtn");
const playQuestionBtn = document.getElementById("playQuestionBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// Speech Synthesis
function speakQuestion() {
    window.speechSynthesis.cancel();
    if (!selectedQuestions[currentQuestion]) return;

    const speech = new SpeechSynthesisUtterance(selectedQuestions[currentQuestion].question);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
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

    if (transcriptEl) transcriptEl.textContent = "Your spoken answer will appear here...";
    currentQuestionWordCount = 0;
    updateWordDisplay();

    speakQuestion();

    if (currentQuestion === selectedQuestions.length - 1) {
        if (nextBtn) nextBtn.style.display = "none";
        if (finishBtn) finishBtn.style.display = "inline-flex";
    } else {
        if (nextBtn) nextBtn.style.display = "inline-flex";
        if (finishBtn) finishBtn.style.display = "none";
    }
}

function updateWordDisplay() {
    if (wordCountEl) {
        wordCountEl.textContent = `${currentQuestionWordCount} (Total across round: ${cumulativeWordCount + currentQuestionWordCount})`;
    }
}

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecognizing = false;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + " ";
        }
        if (transcriptEl) transcriptEl.textContent = transcript;

        const words = transcript.trim().split(/\s+/).filter(Boolean);
        currentQuestionWordCount = words.length;
        updateWordDisplay();
    };

    recognition.onerror = function (event) {
        console.warn("Speech recognition error:", event.error);
        isRecognizing = false;
    };

    recognition.onend = function () {
        isRecognizing = false;
    };
}

if (startBtn) {
    startBtn.addEventListener("click", () => {
        if (recognition && !isRecognizing) {
            try {
                recognition.start();
                isRecognizing = true;
                startBtn.style.background = "#059669";
                startBtn.textContent = "🎙️ Listening...";

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
            } catch (err) {
                console.warn(err);
            }
        }
    });
}

if (stopBtn) {
    stopBtn.addEventListener("click", () => {
        if (recognition && isRecognizing) {
            recognition.stop();
            isRecognizing = false;
            if (startBtn) {
                startBtn.style.background = "";
                startBtn.textContent = "🎤 Start Speaking";
            }

            const wave = document.getElementById("voiceWave");
            const orb = document.getElementById("aiAvatarOrb");
            const ring = document.getElementById("orbPulseRing");
            const label = document.getElementById("aiStatusLabel");

            if (wave) wave.classList.remove("active");
            if (orb) orb.classList.remove("listening");
            if (ring) ring.style.display = "none";
            if (label) {
                label.textContent = "AI Interviewer: Microphone Paused";
                label.style.color = "#2563eb";
            }
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
            recognition.stop();
            isRecognizing = false;
        }
        window.speechSynthesis.cancel();
        if (startBtn) {
            startBtn.style.background = "";
            startBtn.textContent = "🎤 Start Answer";
        }

        // Accumulate word count
        cumulativeWordCount += currentQuestionWordCount;

        if (currentQuestion < selectedQuestions.length - 1) {
            currentQuestion++;
            updateQuestionUI();
        }
    });
}

// Finish Interview
if (finishBtn) {
    finishBtn.addEventListener("click", () => {
        if (recognition && isRecognizing) {
            recognition.stop();
            isRecognizing = false;
        }
        window.speechSynthesis.cancel();

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

        // Advance the active set in localStorage so the NEXT interview automatically gets a fresh set!
        const totalSets = 5;
        let nextSet = (currentSetId % totalSets) + 1;
        localStorage.setItem("currentInterviewSet", nextSet);
        localStorage.setItem("lastInterviewSet", nextSet);

        if (window.showRoundTransitionModal) {
            window.showRoundTransitionModal(
                "Round 4: HR & Behavioral Round",
                `HR Score: ${hrScore} / 100 (${cumulativeWordCount} Words)`,
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