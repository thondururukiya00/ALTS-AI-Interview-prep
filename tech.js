// ==========================================
// AI Interview Preparation Assistant
// Round 3 - Technical & Coding Round
// Robust Multi-Language IDE & Compiler Backend
// ==========================================

const technicalSets = {
    1: [
        {
            title: "Check whether a number is Even or Odd.",
            category: "Programming",
            difficulty: "Easy",
            description: "Read an integer n and determine whether it is divisible by 2. Print 'Even' or 'Odd'.",
            testCases: [
                { input: "4", expected: "Even" },
                { input: "7", expected: "Odd" },
                { input: "0", expected: "Even" }
            ]
        },
        {
            title: "Find the factorial of a number.",
            category: "Programming",
            difficulty: "Easy",
            description: "Read a non-negative integer n and calculate its factorial (n! = n * (n-1) * ... * 1). Note that 0! = 1.",
            testCases: [
                { input: "5", expected: "120" },
                { input: "0", expected: "1" },
                { input: "6", expected: "720" }
            ]
        },
        {
            title: "Check whether a number is Prime.",
            category: "Programming",
            difficulty: "Medium",
            description: "Read an integer n and determine whether it is prime (only divisible by 1 and itself). Print 'Prime' or 'Not Prime'.",
            testCases: [
                { input: "7", expected: "Prime" },
                { input: "12", expected: "Not Prime" },
                { input: "1", expected: "Not Prime" }
            ]
        },
        {
            title: "Find the second-largest distinct element in an array.",
            category: "Data Structures",
            difficulty: "Medium",
            description: "Read space-separated integers and print the second-highest unique value. If none exists, print -1.",
            testCases: [
                { input: "12 35 1 10 34 1", expected: "34" },
                { input: "10 5 10", expected: "5" },
                { input: "10 10 10", expected: "-1" }
            ]
        },
        {
            title: "Check for Balanced Parentheses.",
            category: "Data Structures / Algorithms",
            difficulty: "Hard",
            description: "Verify if parentheses (), {}, and [] in a string are properly closed and nested. Print 'Balanced' or 'Not Balanced'.",
            testCases: [
                { input: "{[()]}", expected: "Balanced" },
                { input: "{[(])}", expected: "Not Balanced" },
                { input: "((()))", expected: "Balanced" }
            ]
        }
    ],
    2: [
        {
            title: "Count the vowels in a given string.",
            category: "Strings",
            difficulty: "Easy",
            description: "Traverse a string and count all occurrences of vowels (a, e, i, o, u, case-insensitive).",
            testCases: [
                { input: "HelloWorld", expected: "3" },
                { input: "rhythm", expected: "0" },
                { input: "AEIOU", expected: "5" }
            ]
        },
        {
            title: "Reverse a number or string.",
            category: "Programming",
            difficulty: "Easy",
            description: "Reverse the characters in the given input string or number.",
            testCases: [
                { input: "12345", expected: "54321" },
                { input: "algorithm", expected: "mhtirogla" },
                { input: "racecar", expected: "racecar" }
            ]
        },
        {
            title: "Check whether a string is a Palindrome.",
            category: "Strings",
            difficulty: "Medium",
            description: "Determine whether a string reads identically forwards and backwards (case-insensitive). Print 'Palindrome' or 'Not Palindrome'.",
            testCases: [
                { input: "racecar", expected: "Palindrome" },
                { input: "hello", expected: "Not Palindrome" },
                { input: "madam", expected: "Palindrome" }
            ]
        },
        {
            title: "Implement Binary Search on a sorted array.",
            category: "Data Structures",
            difficulty: "Medium",
            description: "Read n, followed by n sorted integers, followed by target. Return 0-based index or -1 if not found.",
            testCases: [
                { input: "5\n1 3 5 7 9\n7", expected: "3" },
                { input: "4\n2 4 6 8\n5", expected: "-1" },
                { input: "1\n100\n100", expected: "0" }
            ]
        },
        {
            title: "Longest Substring Without Repeating Characters.",
            category: "Algorithms",
            difficulty: "Hard",
            description: "Given a string, find the length of the longest contiguous substring without any repeating characters.",
            testCases: [
                { input: "abcabcbb", expected: "3" },
                { input: "bbbbb", expected: "1" },
                { input: "pwwkew", expected: "3" }
            ]
        }
    ],
    3: [
        {
            title: "Calculate the sum of digits of a number.",
            category: "Programming",
            difficulty: "Easy",
            description: "Read an integer n and calculate the sum of its individual digits. Print the resulting integer sum.",
            testCases: [
                { input: "1234", expected: "10" },
                { input: "505", expected: "10" },
                { input: "9", expected: "9" }
            ]
        },
        {
            title: "Find the maximum element in an array.",
            category: "Programming",
            difficulty: "Easy",
            description: "Read space-separated integers from standard input and print the maximum value found in the array.",
            testCases: [
                { input: "3 7 2 9 4", expected: "9" },
                { input: "-5 -2 -9 -1", expected: "-1" },
                { input: "42", expected: "42" }
            ]
        },
        {
            title: "Check whether two strings are Anagrams.",
            category: "Strings",
            difficulty: "Medium",
            description: "Read two strings on separate lines and determine whether they are anagrams of each other (contain identical letters in any order, case-insensitive). Print 'Anagram' or 'Not Anagram'.",
            testCases: [
                { input: "listen\nsilent", expected: "Anagram" },
                { input: "hello\nworld", expected: "Not Anagram" },
                { input: "triangle\nintegral", expected: "Anagram" }
            ]
        },
        {
            title: "Find the first non-repeating character in a string.",
            category: "Data Structures",
            difficulty: "Medium",
            description: "Given a lowercase string, find the first character that occurs only once and print it. If all characters repeat, print -1.",
            testCases: [
                { input: "swiss", expected: "w" },
                { input: "aabbcc", expected: "-1" },
                { input: "interview", expected: "n" }
            ]
        },
        {
            title: "Reverse the order of words in a sentence.",
            category: "Algorithms",
            difficulty: "Hard",
            description: "Given a sentence string with space-separated words, reverse the order of the words while preserving the characters within each word. Print the reversed sentence.",
            testCases: [
                { input: "the sky is blue", expected: "blue is sky the" },
                { input: "hello world", expected: "world hello" },
                { input: "algorithm interview test", expected: "test interview algorithm" }
            ]
        }
    ]
};

// Active Non-Repeating Set (Internal rotation: 1, 2, or 3)
let currentSetId = Number(localStorage.getItem("currentInterviewSet")) || 1;
if (currentSetId < 1 || currentSetId > 3 || !technicalSets[currentSetId]) {
    currentSetId = 1;
    localStorage.setItem("currentInterviewSet", 1);
}

const selectedQuestions = technicalSets[currentSetId];
let currentQuestion = 0;
let currentLanguage = "python";
let timeLeft = 20 * 60;

// Separate storage per (questionId + "_" + language)
// Candidate writes code themselves; starts empty
const codeStorage = {};
const answers = {};
const questionScores = [0, 0, 0, 0, 0];

// DOM Elements
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
const testCaseBody = document.getElementById("testCaseBody");
const testCaseResultBadge = document.getElementById("testCaseResultBadge");
const terminalScreen = document.getElementById("terminalScreen");
const customStdinInput = document.getElementById("customStdinInput");

const compileRunBtn = document.getElementById("compileRunBtn");
const runTestsBtn = document.getElementById("runTestsBtn");
const submitBtn = document.getElementById("submitBtn");
const resetTemplateBtn = document.getElementById("resetTemplateBtn");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finishBtn");

let activeTestCaseIndex = 1;

// Placeholder comments guiding the candidate (no pre-filled code)
function getPlaceholder(lang) {
    if (lang === "python") {
        return "# Write your Python solution here...\n# Read input from stdin and print the output\n";
    } else if (lang === "java") {
        return "// Write your Java solution here...\n// Read input from stdin and print the output\n";
    } else if (lang === "c") {
        return "// Write your C solution here...\n// Read input from stdin and print the output\n";
    } else {
        return "// Write your C++ solution here...\n// Read input from stdin and print the output\n";
    }
}

// Update Language File Tab
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
    } else if (lang === "c") {
        tabName.textContent = "solution.c";
        tabIcon.className = "fa-solid fa-c";
        tabIcon.style.color = "#94a3b8";
    } else {
        tabName.textContent = "solution.cpp";
        tabIcon.className = "fa-solid fa-file-code";
        tabIcon.style.color = "#3b82f6";
    }
}

// Display Current Question & Sync Editor
function displayQuestion() {
    const q = selectedQuestions[currentQuestion];
    if (!q) return;

    questionTitle.textContent = q.title;
    questionDescription.textContent = q.description;
    questionCategory.textContent = q.category;
    questionDifficulty.textContent = q.difficulty;
    questionDifficulty.className = "tag difficulty " + q.difficulty.toLowerCase();

    if (questionNumber) {
        questionNumber.textContent = `Question ${currentQuestion + 1} of ${selectedQuestions.length} (${q.difficulty})`;
    }
    if (progressBar) {
        progressBar.max = selectedQuestions.length;
        progressBar.value = currentQuestion + 1;
    }
    if (progressPercent) {
        progressPercent.textContent = Math.round(((currentQuestion + 1) / selectedQuestions.length) * 100) + "%";
    }

    // Load candidate's written code for this question and selected language
    // Starts completely empty so the user writes their code from scratch
    const storageKey = currentQuestion + "_" + currentLanguage;
    if (codeStorage[storageKey] !== undefined) {
        codeEditor.value = codeStorage[storageKey];
    } else {
        codeEditor.value = "";
        codeStorage[storageKey] = "";
    }

    codeEditor.placeholder = getPlaceholder(currentLanguage);

    updateLanguageTab(currentLanguage);
    updateWordCount();
    updateGutterLines();
    updateNavigationButtons();
    switchTestCase(1);

    if (testCaseResultBadge) {
        if (questionScores[currentQuestion] > 0) {
            testCaseResultBadge.textContent = `✅ Solved (${questionScores[currentQuestion]}/20 pts)`;
            testCaseResultBadge.style.background = "rgba(16, 185, 129, 0.18)";
            testCaseResultBadge.style.color = "#34d399";
            testCaseResultBadge.style.borderColor = "rgba(16, 185, 129, 0.3)";
        } else {
            testCaseResultBadge.textContent = "Ready for Execution";
            testCaseResultBadge.style.background = "rgba(56, 189, 248, 0.15)";
            testCaseResultBadge.style.color = "#38bdf8";
            testCaseResultBadge.style.borderColor = "rgba(56, 189, 248, 0.3)";
        }
    }
}

function updateWordCount() {
    const text = (codeEditor.value || "").trim();
    const count = text.length;
    if (charCount) charCount.innerHTML = `<i class="fa-solid fa-code"></i> ${count} characters`;

    if (answers[currentQuestion] && questionScores[currentQuestion] === 20) {
        answerStatus.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Submitted &amp; Verified (20/20 pts)`;
        answerStatus.style.color = "#10b981";
    } else if (answers[currentQuestion] && questionScores[currentQuestion] > 0) {
        answerStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;"></i> Partially Solved (${questionScores[currentQuestion]}/20 pts)`;
        answerStatus.style.color = "#f59e0b";
    } else if (count > 0) {
        answerStatus.innerHTML = `<i class="fa-solid fa-pen" style="color:#38bdf8;"></i> Code in Progress`;
        answerStatus.style.color = "#38bdf8";
    } else {
        answerStatus.innerHTML = `<i class="fa-regular fa-clock"></i> Not answered yet`;
        answerStatus.style.color = "#64748b";
    }
}

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

// Drawer Tabs (Test Cases, Terminal, Custom Input)
window.switchDrawerTab = function(tabName) {
    const tabs = ['tests', 'terminal', 'stdin'];
    tabs.forEach(t => {
        const btn = document.getElementById("drawerTab" + t.charAt(0).toUpperCase() + t.slice(1));
        const pane = document.getElementById("drawerPane" + t.charAt(0).toUpperCase() + t.slice(1));
        if (btn) {
            if (t === tabName) {
                btn.style.background = "#0d1117";
                btn.style.color = "#f0f6fc";
            } else {
                btn.style.background = "transparent";
                btn.style.color = "#8b949e";
            }
        }
        if (pane) {
            pane.style.display = (t === tabName) ? "block" : "none";
        }
    });
};

// Switch Active Test Case
window.switchTestCase = function(caseNum) {
    activeTestCaseIndex = caseNum;
    [1, 2, 3].forEach(n => {
        const tab = document.getElementById("caseTab" + n);
        if (tab) {
            if (n === caseNum) {
                tab.style.background = "#0d1117";
                tab.style.color = "#ffffff";
            } else {
                tab.style.background = "transparent";
                tab.style.color = "#8b949e";
            }
        }
    });

    const q = selectedQuestions[currentQuestion];
    if (!q || !q.testCases) return;
    const tc = q.testCases[caseNum - 1] || q.testCases[0];

    if (testCaseBody && tc) {
        testCaseBody.innerHTML = `
            <div style="margin-bottom: 6px;"><strong style="color: #cbd5e1;">Test Input (stdin):</strong> <code style="background:rgba(255,255,255,0.08); padding:2px 8px; border-radius:4px; color:#38bdf8;">${escapeHtml(tc.input)}</code></div>
            <div><strong style="color: #cbd5e1;">Expected Output:</strong> <code style="background:rgba(255,255,255,0.08); padding:2px 8px; border-radius:4px; color:#34d399;">${escapeHtml(tc.expected)}</code></div>
            ${tc.actual !== undefined ? `<div style="margin-top: 6px;"><strong style="color: #cbd5e1;">Actual Output:</strong> <code style="background:rgba(255,255,255,0.08); padding:2px 8px; border-radius:4px; color:${tc.passed ? '#34d399' : '#f87171'};">${escapeHtml(tc.actual)}</code></div>` : ''}
        `;
    }
};

function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Language Change Event
languageSelect.addEventListener("change", function () {
    // 1. Save code for old language
    codeStorage[currentQuestion + "_" + currentLanguage] = codeEditor.value;

    // 2. Switch to new language
    currentLanguage = languageSelect.value;
    updateLanguageTab(currentLanguage);

    // 3. Load or initialize empty editor
    const storageKey = currentQuestion + "_" + currentLanguage;
    if (codeStorage[storageKey] !== undefined) {
        codeEditor.value = codeStorage[storageKey];
    } else {
        codeEditor.value = "";
        codeStorage[storageKey] = "";
    }

    codeEditor.placeholder = getPlaceholder(currentLanguage);
    updateWordCount();
    updateGutterLines();
});

// Clear / Reset Editor Button
if (resetTemplateBtn) {
    resetTemplateBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear your code for this question?")) {
            codeEditor.value = "";
            codeStorage[currentQuestion + "_" + currentLanguage] = "";
            updateWordCount();
            updateGutterLines();
        }
    });
}

// Input Typing Listener
codeEditor.addEventListener("input", function () {
    codeStorage[currentQuestion + "_" + currentLanguage] = codeEditor.value;
    updateWordCount();
    updateGutterLines();
    const unsavedDot = document.getElementById("unsavedDot");
    if (unsavedDot) unsavedDot.style.background = "#38bdf8";
});

// 1. Compile & Run Button
if (compileRunBtn) {
    compileRunBtn.addEventListener("click", async function () {
        const code = (codeEditor.value || "").trim();
        if (!code || code.length === 0) {
            alert("Please write your code first before compiling.");
            return;
        }

        // Determine stdin: check custom stdin tab first, then current test case
        let stdin = (customStdinInput && customStdinInput.value) ? customStdinInput.value : "";
        if (!stdin) {
            const q = selectedQuestions[currentQuestion];
            if (q && q.testCases && q.testCases[activeTestCaseIndex - 1]) {
                stdin = q.testCases[activeTestCaseIndex - 1].input;
            }
        }

        if (testCaseResultBadge) {
            testCaseResultBadge.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Compiling &amp; Executing...`;
            testCaseResultBadge.style.background = "rgba(245, 158, 11, 0.15)";
            testCaseResultBadge.style.color = "#fbbf24";
            testCaseResultBadge.style.borderColor = "rgba(245, 158, 11, 0.3)";
        }

        // Switch to Terminal tab to show immediate output
        switchDrawerTab('terminal');
        if (terminalScreen) {
            terminalScreen.innerHTML = `<span style="color:#6e7681;">[1/2] Compiling ${currentLanguage.toUpperCase()} program...\n[2/2] Running process in sandbox...</span>`;
        }

        try {
            const resp = await fetch('/api/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: currentLanguage,
                    code: code,
                    stdin: stdin
                })
            });

            const data = await resp.json();

            if (terminalScreen) {
                let outHtml = ``;
                outHtml += `<div style="color:#8b949e; border-bottom:1px solid #21262d; padding-bottom:6px; margin-bottom:8px;">Execution Environment: ${currentLanguage.toUpperCase()} • Time: ${data.executionTimeMs || 0}ms • Status: ${data.success ? 'Exit Code 0 (Success)' : 'Exit Code ' + data.exitCode}</div>`;

                if (data.stdout) {
                    outHtml += `<div style="color:#e6edf3;"><strong>Standard Output (stdout):</strong>\n${escapeHtml(data.stdout)}</div>\n`;
                }
                if (data.stderr) {
                    outHtml += `<div style="color:#f87171; margin-top:8px;"><strong>Standard Error / Warnings (stderr):</strong>\n${escapeHtml(data.stderr)}</div>`;
                }
                if (!data.stdout && !data.stderr) {
                    outHtml += `<div style="color:#a78bfa;">Process exited cleanly with no console output.</div>`;
                }

                terminalScreen.innerHTML = outHtml;
            }

            if (testCaseResultBadge) {
                if (data.success) {
                    testCaseResultBadge.textContent = `✅ Executed Successfully (${data.executionTimeMs}ms)`;
                    testCaseResultBadge.style.background = "rgba(16, 185, 129, 0.18)";
                    testCaseResultBadge.style.color = "#34d399";
                    testCaseResultBadge.style.borderColor = "rgba(16, 185, 129, 0.3)";
                } else {
                    testCaseResultBadge.textContent = data.timedOut ? "⏱️ Time Limit Exceeded" : "❌ Execution Failed";
                    testCaseResultBadge.style.background = "rgba(239, 68, 68, 0.15)";
                    testCaseResultBadge.style.color = "#f87171";
                    testCaseResultBadge.style.borderColor = "rgba(239, 68, 68, 0.3)";
                }
            }

        } catch (err) {
            if (terminalScreen) terminalScreen.textContent = "Network Error calling compiler backend: " + err.message;
        }
    });
}

// 2. Run Public Tests Button (Evaluates user's code against test cases)
if (runTestsBtn) {
    runTestsBtn.addEventListener("click", async function () {
        const code = (codeEditor.value || "").trim();
        const q = selectedQuestions[currentQuestion];
        if (!q || !q.testCases) return;

        if (!code || code.length === 0) {
            alert("Please write your code first before running tests.");
            return;
        }

        switchDrawerTab('tests');

        if (testCaseResultBadge) {
            testCaseResultBadge.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running 3 Public Tests...`;
            testCaseResultBadge.style.background = "rgba(245, 158, 11, 0.15)";
            testCaseResultBadge.style.color = "#fbbf24";
            testCaseResultBadge.style.borderColor = "rgba(245, 158, 11, 0.3)";
        }

        try {
            const resp = await fetch('/api/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: currentLanguage,
                    code: code,
                    testCases: q.testCases
                })
            });

            const data = await resp.json();

            if (data.results && Array.isArray(data.results)) {
                let allPassed = data.allPassed;
                let passedCount = data.passedCount;

                data.results.forEach((res, idx) => {
                    if (q.testCases[idx]) {
                        q.testCases[idx].actual = res.actual;
                        q.testCases[idx].passed = res.passed;
                    }
                    const tabBtn = document.getElementById("caseTab" + (idx + 1));
                    if (tabBtn) {
                        tabBtn.innerHTML = (res.passed ? "✅ " : "❌ ") + `Case ${idx + 1}`;
                    }
                });

                switchTestCase(activeTestCaseIndex);

                if (testCaseResultBadge) {
                    if (allPassed) {
                        testCaseResultBadge.textContent = `✅ All 3 Public Tests Passed`;
                        testCaseResultBadge.style.background = "rgba(16, 185, 129, 0.18)";
                        testCaseResultBadge.style.color = "#34d399";
                        testCaseResultBadge.style.borderColor = "rgba(16, 185, 129, 0.3)";
                    } else {
                        testCaseResultBadge.textContent = `❌ ${passedCount} / 3 Tests Passed`;
                        testCaseResultBadge.style.background = "rgba(239, 68, 68, 0.15)";
                        testCaseResultBadge.style.color = "#f87171";
                        testCaseResultBadge.style.borderColor = "rgba(239, 68, 68, 0.3)";
                    }
                }
            }
        } catch (err) {
            console.warn("Public test runner error:", err);
        }
    });
}

// 3. Submit Solution Button (Evaluates submission & computes marks)
if (submitBtn) {
    submitBtn.addEventListener("click", async function () {
        const code = (codeEditor.value || "").trim();
        const q = selectedQuestions[currentQuestion];
        if (!q) return;

        if (!code || code.length === 0) {
            alert("Please write your solution before submitting.");
            return;
        }

        // Run full evaluation
        if (testCaseResultBadge) {
            testCaseResultBadge.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Evaluating Submission...`;
            testCaseResultBadge.style.background = "rgba(245, 158, 11, 0.15)";
            testCaseResultBadge.style.color = "#fbbf24";
        }

        try {
            const resp = await fetch('/api/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: currentLanguage,
                    code: code,
                    testCases: q.testCases
                })
            });

            const data = await resp.json();
            const allPassed = !!data.allPassed;
            const passedCount = Number(data.passedCount) || 0;
            const totalCases = q.testCases.length || 3;

            // Calculate score for this question (out of 20 marks)
            const earnedMarks = Math.round((passedCount / totalCases) * 20);
            questionScores[currentQuestion] = earnedMarks;
            answers[currentQuestion] = code;
            codeStorage[currentQuestion + "_" + currentLanguage] = code;

            if (data.results && Array.isArray(data.results)) {
                data.results.forEach((res, idx) => {
                    if (q.testCases[idx]) {
                        q.testCases[idx].actual = res.actual;
                        q.testCases[idx].passed = res.passed;
                    }
                    const tabBtn = document.getElementById("caseTab" + (idx + 1));
                    if (tabBtn) {
                        tabBtn.innerHTML = (res.passed ? "✅ " : "❌ ") + `Case ${idx + 1}`;
                    }
                });
                switchTestCase(activeTestCaseIndex);
            }

            updateWordCount();

            if (allPassed) {
                if (testCaseResultBadge) {
                    testCaseResultBadge.textContent = "✅ Accepted (100% Tests Passed • 20/20 Marks)";
                    testCaseResultBadge.style.background = "rgba(16, 185, 129, 0.2)";
                    testCaseResultBadge.style.color = "#34d399";
                    testCaseResultBadge.style.borderColor = "rgba(16, 185, 129, 0.4)";
                }
                if (window.showToast) {
                    window.showToast(`Problem ${currentQuestion + 1} Accepted! (+20 marks)`, "success");
                } else {
                    alert(`Problem ${currentQuestion + 1} Accepted! All tests passed (+20 marks).`);
                }
            } else if (passedCount > 0) {
                if (testCaseResultBadge) {
                    testCaseResultBadge.textContent = `⚠️ Submitted (${passedCount}/${totalCases} Tests Passed • ${earnedMarks}/20 Marks)`;
                    testCaseResultBadge.style.background = "rgba(245, 158, 11, 0.2)";
                    testCaseResultBadge.style.color = "#fbbf24";
                    testCaseResultBadge.style.borderColor = "rgba(245, 158, 11, 0.4)";
                }
                alert(`Problem ${currentQuestion + 1} Evaluated: ${passedCount} of ${totalCases} test cases passed (${earnedMarks}/20 marks).`);
            } else {
                if (testCaseResultBadge) {
                    testCaseResultBadge.textContent = `❌ Evaluation Failed (0/${totalCases} Tests Passed)`;
                    testCaseResultBadge.style.background = "rgba(239, 68, 68, 0.18)";
                    testCaseResultBadge.style.color = "#f87171";
                    testCaseResultBadge.style.borderColor = "rgba(239, 68, 68, 0.35)";
                }
                alert(`Problem ${currentQuestion + 1} Evaluation: 0 tests passed. Check your algorithm logic and try again.`);
            }

            // If last question, show Finish button
            if (currentQuestion === selectedQuestions.length - 1) {
                if (nextBtn) nextBtn.style.display = "none";
                if (finishBtn) finishBtn.style.display = "inline-flex";
            }

        } catch (e) {
            console.error("Evaluation error:", e);
            alert("Error during evaluation: " + e.message);
        }
    });
}

// Navigation Handlers
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

previousBtn.addEventListener("click", function () {
    if (currentQuestion > 0) {
        codeStorage[currentQuestion + "_" + currentLanguage] = codeEditor.value;
        currentQuestion--;
        displayQuestion();
    }
});

nextBtn.addEventListener("click", function () {
    if (currentQuestion < selectedQuestions.length - 1) {
        codeStorage[currentQuestion + "_" + currentLanguage] = codeEditor.value;
        currentQuestion++;
        displayQuestion();
    }
});

// Finish Technical Round (Score is sum of marks earned from evaluated submissions)
function finishInterview() {
    codeStorage[currentQuestion + "_" + currentLanguage] = codeEditor.value;

    let totalScore = questionScores.reduce((sum, val) => sum + val, 0);
    if (totalScore > 100) totalScore = 100;

    localStorage.setItem("technical", totalScore);
    if (window.saveScoreToSupabase) window.saveScoreToSupabase(3, "Technical & Coding", totalScore);
    localStorage.setItem("tech", totalScore);

    const attempted = questionScores.filter(s => s > 0).length;

    if (window.showRoundTransitionModal) {
        window.showRoundTransitionModal(
            "Round 3: Technical Coding Interview",
            `Evaluated Score: ${totalScore} / 100 Marks (${attempted} / 5 Problems Solved)`,
            "Round 4: HR &amp; Behavioral Round",
            "hr.html"
        );
    } else {
        window.location.href = "hr.html";
    }
}

finishBtn.addEventListener("click", finishInterview);

// 20-minute timer
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

// Initialize IDE on Load
displayQuestion();
updateTimer();
