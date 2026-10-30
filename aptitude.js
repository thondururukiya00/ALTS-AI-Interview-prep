// ==========================================
// AI Interview Preparation Assistant
// Round 1 - Aptitude & Logical Reasoning
// Progressive Difficulty: Easy -> Medium -> Hard
// ==========================================

const aptitudeSets = {
    1: [
        {
            difficulty: "Easy",
            question: "What is the next number in the sequence: 4, 9, 16, 25, 36, ...?",
            options: ["42", "47", "49", "51"],
            answer: "49"
        },
        {
            difficulty: "Easy",
            question: "If a student scored 360 marks out of 500, what is the percentage?",
            options: ["68%", "70%", "72%", "75%"],
            answer: "72%"
        },
        {
            difficulty: "Medium",
            question: "A can complete a project in 12 days, and B can complete it in 6 days. Working together, in how many days can they complete the project?",
            options: ["3 days", "4 days", "5 days", "6 days"],
            answer: "4 days"
        },
        {
            difficulty: "Medium",
            question: "Pointing to a photograph, a woman says, 'His mother is the only daughter of my mother.' How is the woman related to the person in the photograph?",
            options: ["Sister", "Mother", "Aunt", "Grandmother"],
            answer: "Mother"
        },
        {
            difficulty: "Hard",
            question: "Two unbiased dice are rolled simultaneously. What is the probability of getting a sum equal to 8?",
            options: ["5/36", "1/6", "7/36", "1/9"],
            answer: "5/36"
        }
    ],
    2: [
        {
            difficulty: "Easy",
            question: "A train running at a speed of 60 km/hr crosses a stationary pole in 9 seconds. What is the length of the train?",
            options: ["120 metres", "150 metres", "180 metres", "324 metres"],
            answer: "150 metres"
        },
        {
            difficulty: "Easy",
            question: "Book is to Author as Painting is to:",
            options: ["Canvas", "Brush", "Artist", "Gallery"],
            answer: "Artist"
        },
        {
            difficulty: "Medium",
            question: "An article is bought for ₹400 and sold for ₹480. What is the profit percentage?",
            options: ["15%", "20%", "22.5%", "25%"],
            answer: "20%"
        },
        {
            difficulty: "Medium",
            question: "A man walks 5 km East, turns right and walks 4 km, then turns right again and walks 5 km. In which direction and distance is he from his starting point?",
            options: ["4 km South", "4 km North", "5 km South", "5 km West"],
            answer: "4 km South"
        },
        {
            difficulty: "Hard",
            question: "In how many different ways can the letters of the word 'LEADER' be arranged?",
            options: ["120", "360", "720", "48"],
            answer: "360"
        }
    ],
    3: [
        {
            difficulty: "Easy",
            question: "The average of 5 consecutive odd integers is 27. What is the smallest of these numbers?",
            options: ["21", "23", "25", "27"],
            answer: "23"
        },
        {
            difficulty: "Easy",
            question: "Which of the following numbers is divisible by 9?",
            options: ["45321", "56718", "78124", "98123"],
            answer: "56718"
        },
        {
            difficulty: "Medium",
            question: "If A : B = 3 : 4 and B : C = 8 : 9, what is the ratio of A : C?",
            options: ["1 : 2", "2 : 3", "3 : 4", "4 : 5"],
            answer: "2 : 3"
        },
        {
            difficulty: "Medium",
            question: "If 'ROSE' is coded as '6821' and 'CHAIR' is coded as '73456', how is 'SEARCH' coded?",
            options: ["214673", "214763", "241673", "214637"],
            answer: "214673"
        },
        {
            difficulty: "Hard",
            question: "From a pack of 52 playing cards, two cards are drawn at random together. What is the probability that both are aces?",
            options: ["1/221", "1/169", "2/221", "4/663"],
            answer: "1/221"
        }
    ]
};

// Retrieve Active Non-Repeating Set (Internal rotation: 1, 2, or 3)
let currentSetId = Number(localStorage.getItem("currentInterviewSet")) || 1;
if (currentSetId < 1 || currentSetId > 3 || !aptitudeSets[currentSetId]) {
    currentSetId = 1;
    localStorage.setItem("currentInterviewSet", 1);
}

// Load Questions from Active Set (strictly ordered Easy -> Medium -> Hard)
const currentQuestions = aptitudeSets[currentSetId];
const container = document.getElementById("questionContainer");

if (container) {
    container.innerHTML = "";

    currentQuestions.forEach((q, index) => {
        const diffClass = q.difficulty.toLowerCase();
        let html = `
        <div class="question-card">
            <div class="card-top-row">
                <span class="q-index-badge">Question ${index + 1} of ${currentQuestions.length}</span>
                <span class="diff-badge diff-${diffClass}">
                    <i class="fa-solid fa-signal"></i> ${q.difficulty}
                </span>
            </div>
            <h3>Q${index + 1}. ${q.question}</h3>
            <div class="options-group">
        `;

        q.options.forEach((option) => {
            html += `
            <label class="option">
                <input type="radio" name="q${index}" value="${option}">
                <span>${option}</span>
            </label>
            `;
        });

        html += `
            </div>
        </div>
        `;

        container.innerHTML += html;
    });

    // Add visual selection style to radio labels
    document.querySelectorAll(".option input[type='radio']").forEach((radio) => {
        radio.addEventListener("change", function () {
            const name = this.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
                r.closest(".option").classList.remove("selected");
            });
            if (this.checked) {
                this.closest(".option").classList.add("selected");
            }
        });
    });
}

// Timer (30 Minutes)
let time = 1800;
const timer = document.getElementById("timer");

const countdown = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;

    if (timer) {
        timer.innerHTML = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }

    time--;

    if (time < 0) {
        clearInterval(countdown);
        submitQuiz();
    }
}, 1000);

// Submit Button
const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
    submitBtn.addEventListener("click", submitQuiz);
}

// Calculate Marks
function submitQuiz() {
    clearInterval(countdown);

    let score = 0;
    let answeredCount = 0;

    currentQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            answeredCount++;
            if (selected.value === q.answer) {
                score += 20; // 5 questions * 20 = 100 marks
            }
        }
    });

    localStorage.setItem("aptitude", score);
    if (window.saveScoreToSupabase) window.saveScoreToSupabase(1, "Quantitative Aptitude", score);

    if (window.showRoundTransitionModal) {
        window.showRoundTransitionModal(
            "Round 1: Aptitude & Reasoning",
            `Score: ${score} / 100 Marks`,
            "Round 2: AI Group Discussion",
            "gd.html"
        );
    } else {
        window.location.href = "gd.html";
    }
}