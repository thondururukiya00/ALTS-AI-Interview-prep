// ==========================================
// AI Interview Preparation Assistant
// Round 1 - Aptitude & Logical Reasoning
// Progressive Difficulty: 20 Questions per Set
// 3 Non-Repeating Calibrated Question Sets
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
            difficulty: "Easy",
            question: "The ratio of boys to girls in a class of 45 students is 3:2. How many girls are there in the class?",
            options: ["15", "18", "21", "27"],
            answer: "18"
        },
        {
            difficulty: "Easy",
            question: "A car travels at an average speed of 60 km/hr. What is its speed converted into metres per second?",
            options: ["15 m/s", "16.67 m/s", "18 m/s", "20 m/s"],
            answer: "16.67 m/s"
        },
        {
            difficulty: "Easy",
            question: "Find the Simple Interest on a principal of ₹5,000 for 3 years at 8% per annum.",
            options: ["₹1,000", "₹1,200", "₹1,400", "₹1,500"],
            answer: "₹1,200"
        },
        {
            difficulty: "Easy",
            question: "Find the next number in the series: 3, 7, 15, 31, 63, ...?",
            options: ["125", "126", "127", "128"],
            answer: "127"
        },
        {
            difficulty: "Easy",
            question: "An item listed at ₹800 is sold with a 15% discount. What is the final selling price?",
            options: ["₹660", "₹680", "₹700", "₹720"],
            answer: "₹680"
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
            difficulty: "Medium",
            question: "If each letter is assigned its alphabetical position value (A=1, B=2, etc.) and 'CAT' is coded as 24, what is the value of 'DOG'?",
            options: ["24", "26", "28", "30"],
            answer: "26"
        },
        {
            difficulty: "Medium",
            question: "The average age of 4 brothers is 15 years. If their father's age of 40 years is added, what is the new average age?",
            options: ["18 years", "20 years", "22 years", "25 years"],
            answer: "20 years"
        },
        {
            difficulty: "Medium",
            question: "If South-East becomes North, and North-East becomes West, what direction does West become?",
            options: ["North-West", "South-East", "South-West", "North-East"],
            answer: "South-East"
        },
        {
            difficulty: "Medium",
            question: "How many 3-digit numbers can be formed using the digits 1, 2, 3, 4, and 5 without repeating any digit?",
            options: ["20", "60", "120", "125"],
            answer: "60"
        },
        {
            difficulty: "Medium",
            question: "A pipe fills a tank in 5 hours and a drain empties it in 8 hours. When both are open, how long does it take to fill the tank?",
            options: ["10 hours", "12 hours", "13.33 hours", "15 hours"],
            answer: "13.33 hours"
        },
        {
            difficulty: "Medium",
            question: "Find the odd one out among the given numbers: 27, 64, 125, 144, 216",
            options: ["27", "125", "144", "216"],
            answer: "144"
        },
        {
            difficulty: "Hard",
            question: "Two unbiased dice are rolled simultaneously. What is the probability of getting a sum equal to 8?",
            options: ["5/36", "1/6", "7/36", "1/9"],
            answer: "5/36"
        },
        {
            difficulty: "Hard",
            question: "What is the angle between the hour and minute hands of a clock at 3:30?",
            options: ["60°", "75°", "80°", "90°"],
            answer: "75°"
        },
        {
            difficulty: "Hard",
            question: "A card is drawn from a well-shuffled standard pack of 52 cards. What is the probability of drawing either a King or a Queen?",
            options: ["1/13", "2/13", "1/26", "4/13"],
            answer: "2/13"
        },
        {
            difficulty: "Hard",
            question: "Statements: All laptops are devices. Some devices are phones. Conclusion: Are some laptops definitely phones?",
            options: ["Definitely True", "Cannot be determined", "Definitely False", "None of the above"],
            answer: "Cannot be determined"
        },
        {
            difficulty: "Hard",
            question: "A sum of money doubles itself in 5 years at simple interest. In how many years will it become 4 times itself at the same rate?",
            options: ["10 years", "12 years", "15 years", "20 years"],
            answer: "15 years"
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
            difficulty: "Easy",
            question: "What is 25% of 40% of 1,200?",
            options: ["100", "120", "140", "160"],
            answer: "120"
        },
        {
            difficulty: "Easy",
            question: "Complete the number pattern: 2, 6, 12, 20, 30, ...?",
            options: ["38", "40", "42", "44"],
            answer: "42"
        },
        {
            difficulty: "Easy",
            question: "If today is Monday, what day of the week will it be after 61 days?",
            options: ["Thursday", "Friday", "Saturday", "Sunday"],
            answer: "Saturday"
        },
        {
            difficulty: "Easy",
            question: "In a class row, Priya ranks 7th from the left and 18th from the right. How many students are in the row?",
            options: ["23", "24", "25", "26"],
            answer: "24"
        },
        {
            difficulty: "Easy",
            question: "Which number replaces the question mark in the sequence: 5, 11, 23, 47, ...?",
            options: ["89", "93", "95", "97"],
            answer: "95"
        },
        {
            difficulty: "Medium",
            question: "An article is bought for ₹400 and sold for ₹480. What is the profit percentage?",
            options: ["15%", "20%", "22.5%", "25%"],
            answer: "20%"
        },
        {
            difficulty: "Medium",
            question: "A man walks 5 km East, turns right and walks 4 km, then turns right again and walks 5 km. Where is he relative to his starting point?",
            options: ["4 km South", "4 km North", "5 km South", "5 km West"],
            answer: "4 km South"
        },
        {
            difficulty: "Medium",
            question: "A and B working together can finish a job in 8 days. If A alone takes 12 days, how long does B take alone?",
            options: ["16 days", "20 days", "24 days", "28 days"],
            answer: "24 days"
        },
        {
            difficulty: "Medium",
            question: "Find the Compound Interest on ₹8,000 for 2 years at 5% per annum compounded annually.",
            options: ["₹800", "₹820", "₹840", "₹860"],
            answer: "₹820"
        },
        {
            difficulty: "Medium",
            question: "If 'CLOUD' is encoded as 'DMPVE', how should 'SMILE' be encoded in the same pattern?",
            options: ["TNJMF", "SNIMF", "TLJME", "TMJNF"],
            answer: "TNJMF"
        },
        {
            difficulty: "Medium",
            question: "The present ages of A and B are in the ratio 4:5. Five years ago, their ages were in the ratio 3:4. What is A's present age?",
            options: ["16 years", "20 years", "24 years", "25 years"],
            answer: "20 years"
        },
        {
            difficulty: "Medium",
            question: "By selling a watch for ₹270, a dealer incurs a 10% loss. What price must he sell it for to gain 10%?",
            options: ["₹300", "₹320", "₹330", "₹350"],
            answer: "₹330"
        },
        {
            difficulty: "Medium",
            question: "Introducing a boy, a girl said: 'He is the son of the daughter of the father of my uncle.' Who is the boy to the girl?",
            options: ["Brother", "Nephew", "Uncle", "Cousin"],
            answer: "Brother"
        },
        {
            difficulty: "Hard",
            question: "In how many different ways can the letters of the word 'LEADER' be arranged?",
            options: ["120", "360", "720", "48"],
            answer: "360"
        },
        {
            difficulty: "Hard",
            question: "A boat travels 18 km/hr downstream and 12 km/hr upstream. What is the speed of the river current?",
            options: ["2 km/hr", "3 km/hr", "4 km/hr", "5 km/hr"],
            answer: "3 km/hr"
        },
        {
            difficulty: "Hard",
            question: "A bag contains 4 red, 5 green, and 3 blue balls. If one ball is picked at random, what is the probability it is NOT red?",
            options: ["1/3", "1/2", "2/3", "3/4"],
            answer: "2/3"
        },
        {
            difficulty: "Hard",
            question: "What is the angle between the hour hand and the minute hand of a clock at 4:20?",
            options: ["0°", "10°", "15°", "20°"],
            answer: "10°"
        },
        {
            difficulty: "Hard",
            question: "The perimeter of a rectangular field is 60 metres and its length is 18 metres. What is its area?",
            options: ["180 sq m", "200 sq m", "216 sq m", "240 sq m"],
            answer: "216 sq m"
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
            difficulty: "Easy",
            question: "Find the Simple Interest on ₹2,000 for 2 years at an interest rate of 5% per annum.",
            options: ["₹100", "₹150", "₹200", "₹250"],
            answer: "₹200"
        },
        {
            difficulty: "Easy",
            question: "Complete the letter series: AZ, BY, CX, DW, ...?",
            options: ["EV", "EU", "FU", "FW"],
            answer: "EV"
        },
        {
            difficulty: "Easy",
            question: "How many degrees does the minute hand of a clock rotate in 25 minutes?",
            options: ["120°", "135°", "150°", "180°"],
            answer: "150°"
        },
        {
            difficulty: "Easy",
            question: "Find the odd one out among the given options:",
            options: ["Copper", "Iron", "Brass", "Silver"],
            answer: "Brass"
        },
        {
            difficulty: "Easy",
            question: "Find the missing term in the sequence: 1, 4, 9, 16, 25, 36, 49, ...?",
            options: ["56", "64", "72", "81"],
            answer: "64"
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
            difficulty: "Medium",
            question: "A car covers a distance of 180 km in 3 hours. If its speed is increased by 10 km/hr, how much time will it take to cover 280 km?",
            options: ["3.5 hours", "4 hours", "4.5 hours", "5 hours"],
            answer: "4 hours"
        },
        {
            difficulty: "Medium",
            question: "In how many different orders can 5 applicants be interviewed one after another?",
            options: ["24", "60", "120", "240"],
            answer: "120"
        },
        {
            difficulty: "Medium",
            question: "A fruit vendor purchases lemons at 5 for ₹10 and sells them at 6 for ₹15. What is his profit percentage?",
            options: ["15%", "20%", "25%", "30%"],
            answer: "25%"
        },
        {
            difficulty: "Medium",
            question: "The sum of ages of a father and son is 50 years. 5 years ago, the father was 7 times as old as the son. What is the father's present age?",
            options: ["35 years", "38 years", "40 years", "42 years"],
            answer: "40 years"
        },
        {
            difficulty: "Medium",
            question: "Pipe A can fill a cistern in 10 hours and Pipe B can fill it in 15 hours. How long will they take working together?",
            options: ["5 hours", "6 hours", "7.5 hours", "8 hours"],
            answer: "6 hours"
        },
        {
            difficulty: "Medium",
            question: "A man is facing North. He turns 90 degrees clockwise, then 180 degrees counter-clockwise. Which direction is he facing now?",
            options: ["North", "East", "West", "South"],
            answer: "West"
        },
        {
            difficulty: "Hard",
            question: "From a pack of 52 playing cards, two cards are drawn at random together. What is the probability that both are aces?",
            options: ["1/221", "1/169", "2/221", "4/663"],
            answer: "1/221"
        },
        {
            difficulty: "Hard",
            question: "If a wall clock strikes 6 times in 5 seconds, how many seconds will it take to strike 12 times?",
            options: ["10 seconds", "11 seconds", "12 seconds", "13 seconds"],
            answer: "11 seconds"
        },
        {
            difficulty: "Hard",
            question: "Two standard six-sided dice are rolled. What is the probability that the sum of the faces is greater than 10?",
            options: ["1/18", "1/12", "1/9", "1/6"],
            answer: "1/12"
        },
        {
            difficulty: "Hard",
            question: "If 15% of a number X is equal to 20% of a number Y, what is the ratio X : Y?",
            options: ["3 : 4", "4 : 3", "5 : 4", "2 : 3"],
            answer: "4 : 3"
        },
        {
            difficulty: "Hard",
            question: "In a cohort of 60 candidates, 35 know Java, 25 know Python, and 10 know both. How many know neither language?",
            options: ["8", "10", "12", "15"],
            answer: "10"
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
                <span class="q-diff-badge ${diffClass}">${q.difficulty}</span>
            </div>
            <h3>${q.question}</h3>
            <div class="options-grid">
        `;

        q.options.forEach(opt => {
            html += `
            <label class="option-label">
                <input type="radio" name="q${index}" value="${opt}">
                <span class="opt-text">${opt}</span>
            </label>
            `;
        });

        html += `
            </div>
        </div>
        `;

        container.innerHTML += html;
    });
}

// 30 Minutes Timer
let time = 30 * 60;
const timerEl = document.getElementById("timer");

const countdown = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (timerEl) {
        timerEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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

// Calculate Marks (5 marks each = 100 total marks)
function submitQuiz() {
    clearInterval(countdown);

    let score = 0;
    let answeredCount = 0;
    const marksPerQuestion = 100 / currentQuestions.length;

    currentQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            answeredCount++;
            if (selected.value === q.answer) {
                score += marksPerQuestion;
            }
        }
    });

    score = Math.round(score);

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
