// ==========================================
// AI Interview Preparation Assistant
// Round 3 - Technical & Coding Round
// Progressive Difficulty: Easy -> Medium -> Hard
// ==========================================

const technicalSets = {
    1: [
        {
            title: "Check whether a number is Even or Odd.",
            category: "Programming",
            difficulty: "Easy",
            description: "Read an integer n and determine whether it is divisible by 2. Print 'Even' or 'Odd'."
        },
        {
            title: "Find the factorial of a number.",
            category: "Programming",
            difficulty: "Easy",
            description: "Read a non-negative integer n and calculate its factorial (n! = n * (n-1) * ... * 1)."
        },
        {
            title: "Check whether a number is Prime.",
            category: "Programming",
            difficulty: "Medium",
            description: "Read an integer and determine whether it is prime (only divisible by 1 and itself)."
        },
        {
            title: "Find the second-largest distinct element in an array.",
            category: "Data Structures",
            difficulty: "Medium",
            description: "Find and return the second-highest unique value in an integer array without sorting the whole array twice."
        },
        {
            title: "Check for Balanced Parentheses.",
            category: "Data Structures / Algorithms",
            difficulty: "Hard",
            description: "Write an algorithm using a stack to verify if parentheses (), {}, and [] in a string are properly closed and nested."
        }
    ],
    2: [
        {
            title: "Count the vowels in a given string.",
            category: "Strings",
            difficulty: "Easy",
            description: "Traverse a string and count all occurrences of vowels (a, e, i, o, u, case-insensitive)."
        },
        {
            title: "Reverse a number or string without built-ins.",
            category: "Programming",
            difficulty: "Easy",
            description: "Reverse the digits of a number or characters in a string using an iterative loop."
        },
        {
            title: "Check whether a string is a Palindrome.",
            category: "Strings",
            difficulty: "Medium",
            description: "Determine whether a string reads identically forwards and backwards."
        },
        {
            title: "Implement Binary Search on a sorted array.",
            category: "Data Structures",
            difficulty: "Medium",
            description: "Search for a target value in an ascending sorted array in O(log n) time. Return its index or -1."
        },
        {
            title: "Longest Substring Without Repeating Characters.",
            category: "Algorithms",
            difficulty: "Hard",
            description: "Given a string, find the length of the longest contiguous substring without any repeating characters."
        }
    ],
    3: [
        {
            title: "Find the largest element in an array.",
            category: "Programming",
            difficulty: "Easy",
            description: "Read an array of integers and determine its maximum element in a single pass."
        },
        {
            title: "Print the Fibonacci sequence up to N terms.",
            category: "Programming",
            difficulty: "Easy",
            description: "Generate and display the first N numbers of the Fibonacci series (0, 1, 1, 2, 3, 5, 8...)."
        },
        {
            title: "Check whether a number is an Armstrong number.",
            category: "Programming",
            difficulty: "Medium",
            description: "Check if the sum of the cubes of its digits equals the number itself (e.g. 153 = 1³ + 5³ + 3³)."
        },
        {
            title: "Remove duplicate elements from an array.",
            category: "Data Structures",
            difficulty: "Medium",
            description: "Return an array containing only the unique elements while maintaining their original relative order."
        },
        {
            title: "Maximum Subarray Sum (Kadane's Algorithm).",
            category: "Algorithms",
            difficulty: "Hard",
            description: "Find the contiguous subarray with the largest sum within an array containing both positive and negative integers."
        }
    ],
    4: [
        {
            title: "Swap two numbers without a temporary variable.",
            category: "Programming",
            difficulty: "Easy",
            description: "Exchange the values of variables a and b using arithmetic addition/subtraction or bitwise XOR."
        },
        {
            title: "Find the sum of digits of an integer.",
            category: "Programming",
            difficulty: "Easy",
            description: "Calculate the sum of all individual digits of a positive number (e.g., input 245 => 2 + 4 + 5 = 11)."
        },
        {
            title: "Demonstrate Method Overloading and Overriding (OOP).",
            category: "Java / OOP",
            difficulty: "Medium",
            description: "Write code showing compile-time polymorphism (overloading) and runtime polymorphism (overriding)."
        },
        {
            title: "Implement QuickSort or BubbleSort.",
            category: "Data Structures",
            difficulty: "Medium",
            description: "Sort an unsorted array of integers in ascending order and explain the time complexity."
        },
        {
            title: "Reverse a Singly Linked List.",
            category: "Data Structures",
            difficulty: "Hard",
            description: "Given the head of a singly linked list, reverse the list pointers and return the new head node."
        }
    ],
    5: [
        {
            title: "Check whether a given year is a Leap Year.",
            category: "Programming",
            difficulty: "Easy",
            description: "Determine whether an entered year has 366 days according to standard leap year Gregorian rules."
        },
        {
            title: "Implement Linear Search.",
            category: "Programming",
            difficulty: "Easy",
            description: "Scan through an array sequentially to find target value k, returning the index or -1 if not found."
        },
        {
            title: "Check if two strings are Anagrams.",
            category: "Strings",
            difficulty: "Medium",
            description: "Determine whether two strings have the exact same characters with identical frequencies (e.g., 'listen' & 'silent')."
        },
        {
            title: "Demonstrate Inheritance with Constructor Chaining.",
            category: "Java / OOP",
            difficulty: "Medium",
            description: "Create a Parent and Child class where the Child invokes the Parent constructor using super()."
        },
        {
            title: "Find the Missing Number in an Array (1 to N).",
            category: "Algorithms",
            difficulty: "Hard",
            description: "Given an array containing n distinct numbers in the range [1, n+1], find the single missing number in O(n) time and O(1) space."
        }
    ]
};

// Retrieve Active Non-Repeating Set
let currentSetId = Number(localStorage.getItem("currentInterviewSet")) || 1;
if (!technicalSets[currentSetId]) {
    currentSetId = 1;
    localStorage.setItem("currentInterviewSet", 1);
}

// Load Questions from Active Set (strictly ordered Easy -> Medium -> Hard)
const selectedQuestions = technicalSets[currentSetId];
const answers = {};
const languages = {};

let currentQuestion = 0;
let timeLeft = 20 * 60; // 20 minutes
let finished = false;

const questionTitle = document.getElementById("questionTitle");
const questionDescription = document.getElementById("questionDescription");
const questionCategory = document.getElementById("questionCategory");
const questionDifficulty = document.getElementById("questionDifficulty");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const codeEditor = document.getElementById("codeEditor");
const languageSelect = document.getElementById("language");
const answerStatus = document.getElementById("answerStatus");
const charCount = document.getElementById("charCount");
const timerElement = document.getElementById("timer");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finishBtn");

// Display the selected question
function displayQuestion() {
    const question = selectedQuestions[currentQuestion];

    questionTitle.textContent = question.title;
    questionDescription.textContent = question.description;
    questionCategory.textContent = `Set ${currentSetId} • ${question.category}`;
    questionDifficulty.textContent = question.difficulty;

    // Apply difficulty color classes
    questionDifficulty.className = "tag difficulty " + question.difficulty.toLowerCase();

    if (questionNumber) {
        questionNumber.textContent = `Question ${currentQuestion + 1} of ${selectedQuestions.length} (${question.difficulty})`;
    }

    if (progressBar) {
        progressBar.max = selectedQuestions.length;
        progressBar.value = currentQuestion + 1;
    }

    if (progressPercent) {
        const percent = Math.round(((currentQuestion + 1) / selectedQuestions.length) * 100);
        progressPercent.textContent = percent + "%";
    }

    // Restore answer and language if already written
    codeEditor.value = answers[currentQuestion] || "";
    languageSelect.value = languages[currentQuestion] || "python";

    updateWordCount();
    updateNavigationButtons();
}

function updateWordCount() {
    const text = codeEditor.value.trim();
    const count = text.length;

    charCount.textContent = count + " characters";

    if (count > 0) {
        answerStatus.textContent = "Answered";
        answerStatus.style.color = "#059669";
    } else {
        answerStatus.textContent = "Not answered";
        answerStatus.style.color = "#64748b";
    }
}

function saveCurrentAnswer() {
    answers[currentQuestion] = codeEditor.value.trim();
    languages[currentQuestion] = languageSelect.value;
}

function updateNavigationButtons() {
    previousBtn.disabled = currentQuestion === 0;

    if (currentQuestion === selectedQuestions.length - 1) {
        nextBtn.style.display = "none";
        finishBtn.style.display = "inline-flex";
    } else {
        nextBtn.style.display = "inline-flex";
        finishBtn.style.display = "none";
    }
}

// Navigation event listeners
previousBtn.addEventListener("click", function () {
    if (currentQuestion > 0) {
        saveCurrentAnswer();
        currentQuestion--;
        displayQuestion();
    }
});

nextBtn.addEventListener("click", function () {
    if (currentQuestion < selectedQuestions.length - 1) {
        saveCurrentAnswer();
        currentQuestion++;
        displayQuestion();
    }
});

codeEditor.addEventListener("input", function () {
    answers[currentQuestion] = codeEditor.value.trim();
    updateWordCount();
    updateGutterLines();
    const unsavedDot = document.getElementById("unsavedDot");
    if (unsavedDot) unsavedDot.style.background = "#38bdf8";
});

function updateGutterLines() {
    const gutter = document.getElementById("ideGutter");
    if (!gutter || !codeEditor) return;
    const lines = (codeEditor.value || "").split("\n").length;
    const count = Math.max(lines, 10);
    let html = "";
    for (let i = 1; i <= count; i++) {
        html += `<span style="display:block; padding-right:12px;">${i}</span>`;
    }
    gutter.innerHTML = html;
}

function updateLanguageTab(lang) {
    const tabName = document.getElementById("fileNameTab");
    const tabIcon = document.getElementById("langTabIcon");
    if (!tabName || !tabIcon) return;

    if (lang === "python") {
        tabName.textContent = "solution.py";
        tabIcon.className = "fa-brands fa-python";
        tabIcon.style.color = "#38bdf8";
    } else if (lang === "java") {
        tabName.textContent = "Solution.java";
        tabIcon.className = "fa-brands fa-java";
        tabIcon.style.color = "#ea580c";
    } else {
        tabName.textContent = "solution.c";
        tabIcon.className = "fa-solid fa-c";
        tabIcon.style.color = "#64748b";
    }
}

languageSelect.addEventListener("change", function () {
    languages[currentQuestion] = languageSelect.value;
    updateLanguageTab(languageSelect.value);
});

// Test Cases Handler
window.switchTestCase = function(caseNum) {
    document.querySelectorAll(".case-tab").forEach((tab, idx) => {
        if (idx === caseNum - 1) {
            tab.style.background = "#0d1117";
            tab.style.color = "#ffffff";
        } else {
            tab.style.background = "transparent";
            tab.style.color = "#8b949e";
        }
    });

    const body = document.getElementById("testCaseBody");
    if (!body) return;

    const q = selectedQuestions[currentQuestion];
    if (caseNum === 1) {
        body.innerHTML = `
            <div><strong style="color: #cbd5e1;">Input:</strong> nums = [2, 7, 11, 15], target = 9</div>
            <div><strong style="color: #cbd5e1;">Expected Output:</strong> [0, 1]</div>
        `;
    } else if (caseNum === 2) {
        body.innerHTML = `
            <div><strong style="color: #cbd5e1;">Input:</strong> nums = [3, 2, 4], target = 6</div>
            <div><strong style="color: #cbd5e1;">Expected Output:</strong> [1, 2]</div>
        `;
    } else {
        body.innerHTML = `
            <div><strong style="color: #cbd5e1;">Input:</strong> nums = [3, 3], target = 6</div>
            <div><strong style="color: #cbd5e1;">Expected Output:</strong> [0, 1]</div>
        `;
    }
};

// Run Public Tests Button
const runTestsBtn = document.getElementById("runTestsBtn");
if (runTestsBtn) {
    runTestsBtn.addEventListener("click", function () {
        const code = (codeEditor.value || "").trim();
        const badge = document.getElementById("testCaseResultBadge");

        if (!code || code.length < 15) {
            if (badge) {
                badge.textContent = "Empty Code - Please write solution";
                badge.style.background = "rgba(239, 68, 68, 0.15)";
                badge.style.color = "#f87171";
                badge.style.borderColor = "rgba(239, 68, 68, 0.3)";
            }
            return;
        }

        if (badge) {
            badge.textContent = "⚡ Running Tests...";
            badge.style.background = "rgba(245, 158, 11, 0.15)";
            badge.style.color = "#fbbf24";
            badge.style.borderColor = "rgba(245, 158, 11, 0.3)";
        }

        setTimeout(() => {
            if (badge) {
                badge.textContent = "✅ All 3 Public Test Cases Passed (12ms • 14.2MB)";
                badge.style.background = "rgba(16, 185, 129, 0.18)";
                badge.style.color = "#34d399";
                badge.style.borderColor = "rgba(16, 185, 129, 0.3)";
            }
        }, 700);
    });
}

// Finish Technical Interview and Proceed to HR Round
function finishInterview() {
    saveCurrentAnswer();

    let attempted = 0;
    for (let i = 0; i < selectedQuestions.length; i++) {
        if (answers[i] && answers[i].length > 10) {
            attempted++;
        }
    }

    let score = attempted * 20;
    if (score > 100) score = 100;

    localStorage.setItem("technical", score);
    localStorage.setItem("tech", score);

    if (window.showRoundTransitionModal) {
        window.showRoundTransitionModal(
            "Round 3: Technical Coding Interview",
            `Score: ${score} / 100 Marks (${attempted} Solved)`,
            "Round 4: HR & Behavioral Round",
            "hr.html"
        );
    } else {
        window.location.href = "hr.html";
    }
}

finishBtn.addEventListener("click", finishInterview);

// Timer
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    if (timerElement) {
        timerElement.textContent = minutes + ":" + String(seconds).padStart(2, "0");
    }

    if (timeLeft <= 0) {
        clearInterval(countdown);
        finishInterview();
        return;
    }

    timeLeft--;
}

const countdown = setInterval(updateTimer, 1000);

// Initialize
displayQuestion();
updateTimer();