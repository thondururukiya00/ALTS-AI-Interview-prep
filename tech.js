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
            ],
            templates: {
                python: "# Python 3.14\ndef check_even_odd(n: int) -> str:\n    # Write your logic here\n    return \"Even\" if n % 2 == 0 else \"Odd\"\n\nif __name__ == '__main__':\n    import sys\n    data = sys.stdin.read().split()\n    if data:\n        print(check_even_odd(int(data[0])))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.Scanner;\n\npublic class Solution {\n    public static String checkEvenOdd(int n) {\n        // Write your logic here\n        return (n % 2 == 0) ? \"Even\" : \"Odd\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            System.out.println(checkEvenOdd(sc.nextInt()));\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n\nvoid checkEvenOdd(int n) {\n    if (n % 2 == 0) {\n        printf(\"Even\\n\");\n    } else {\n        printf(\"Odd\\n\");\n    }\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        checkEvenOdd(n);\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <string>\nusing namespace std;\n\nstring checkEvenOdd(int n) {\n    return (n % 2 == 0) ? \"Even\" : \"Odd\";\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        cout << checkEvenOdd(n) << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef factorial(n: int) -> int:\n    # Write your logic here\n    res = 1\n    for i in range(2, n + 1):\n        res *= i\n    return res\n\nif __name__ == '__main__':\n    import sys\n    data = sys.stdin.read().split()\n    if data:\n        print(factorial(int(data[0])))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.Scanner;\n\npublic class Solution {\n    public static long factorial(int n) {\n        long res = 1;\n        for (int i = 2; i <= n; i++) res *= i;\n        return res;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            System.out.println(factorial(sc.nextInt()));\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n\nlong long factorial(int n) {\n    long long res = 1;\n    for (int i = 2; i <= n; i++) res *= i;\n    return res;\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%lld\\n\", factorial(n));\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    long long res = 1;\n    for (int i = 2; i <= n; i++) res *= i;\n    return res;\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        cout << factorial(n) << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef is_prime(n: int) -> str:\n    if n <= 1:\n        return \"Not Prime\"\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return \"Not Prime\"\n    return \"Prime\"\n\nif __name__ == '__main__':\n    import sys\n    data = sys.stdin.read().split()\n    if data:\n        print(is_prime(int(data[0])))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.Scanner;\n\npublic class Solution {\n    public static String isPrime(int n) {\n        if (n <= 1) return \"Not Prime\";\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) return \"Not Prime\";\n        }\n        return \"Prime\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            System.out.println(isPrime(sc.nextInt()));\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n\nvoid checkPrime(int n) {\n    if (n <= 1) { printf(\"Not Prime\\n\"); return; }\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) { printf(\"Not Prime\\n\"); return; }\n    }\n    printf(\"Prime\\n\");\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        checkPrime(n);\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <string>\nusing namespace std;\n\nstring isPrime(int n) {\n    if (n <= 1) return \"Not Prime\";\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return \"Not Prime\";\n    }\n    return \"Prime\";\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        cout << isPrime(n) << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef second_largest(nums):\n    distinct = sorted(list(set(nums)))\n    return distinct[-2] if len(distinct) >= 2 else -1\n\nif __name__ == '__main__':\n    import sys\n    tokens = sys.stdin.read().split()\n    if tokens:\n        arr = [int(x) for x in tokens]\n        print(second_largest(arr))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.*;\n\npublic class Solution {\n    public static int getSecondLargest(List<Integer> nums) {\n        TreeSet<Integer> set = new TreeSet<>(nums);\n        if (set.size() < 2) return -1;\n        set.pollLast();\n        return set.last();\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        if (!list.isEmpty()) {\n            System.out.println(getSecondLargest(list));\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n\nint main() {\n    int val;\n    long long first = -9999999999LL, second = -9999999999LL;\n    while (scanf(\"%d\", &val) == 1) {\n        if (val > first) {\n            second = first;\n            first = val;\n        } else if (val < first && val > second) {\n            second = val;\n        }\n    }\n    if (second <= -999999999LL) printf(\"-1\\n\");\n    else printf(\"%lld\\n\", second);\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n    set<int> s;\n    int x;\n    while (cin >> x) s.insert(x);\n    if (s.size() < 2) {\n        cout << -1 << endl;\n    } else {\n        auto it = s.rbegin();\n        it++;\n        cout << *it << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef is_balanced(s: str) -> str:\n    stack = []\n    pairs = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in '({[':\n            stack.append(char)\n        elif char in ')}]':\n            if not stack or stack[-1] != pairs[char]:\n                return \"Not Balanced\"\n            stack.pop()\n    return \"Balanced\" if not stack else \"Not Balanced\"\n\nif __name__ == '__main__':\n    import sys\n    raw = sys.stdin.read().strip()\n    if raw:\n        print(is_balanced(raw))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.*;\n\npublic class Solution {\n    public static String isBalanced(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') stack.push(c);\n            else if (c == ')' || c == '}' || c == ']') {\n                if (stack.isEmpty()) return \"Not Balanced\";\n                char top = stack.pop();\n                if (c == ')' && top != '(') return \"Not Balanced\";\n                if (c == '}' && top != '{') return \"Not Balanced\";\n                if (c == ']' && top != '[') return \"Not Balanced\";\n            }\n        }\n        return stack.isEmpty() ? \"Balanced\" : \"Not Balanced\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            System.out.println(isBalanced(sc.next()));\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n#include <string.h>\n\nint isBalanced(char* s) {\n    char stack[1000];\n    int top = -1;\n    for (int i = 0; s[i] != '\\0'; i++) {\n        char c = s[i];\n        if (c == '(' || c == '{' || c == '[') stack[++top] = c;\n        else if (c == ')' || c == '}' || c == ']') {\n            if (top < 0) return 0;\n            char t = stack[top--];\n            if (c == ')' && t != '(') return 0;\n            if (c == '}' && t != '{') return 0;\n            if (c == ']' && t != '[') return 0;\n        }\n    }\n    return top == -1;\n}\n\nint main() {\n    char s[1000];\n    if (scanf(\"%s\", s) == 1) {\n        if (isBalanced(s)) printf(\"Balanced\\n\");\n        else printf(\"Not Balanced\\n\");\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nstring isBalanced(const string& s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else if (c == ')' || c == '}' || c == ']') {\n            if (st.empty()) return \"Not Balanced\";\n            char t = st.top(); st.pop();\n            if (c == ')' && t != '(') return \"Not Balanced\";\n            if (c == '}' && t != '{') return \"Not Balanced\";\n            if (c == ']' && t != '[') return \"Not Balanced\";\n        }\n    }\n    return st.empty() ? \"Balanced\" : \"Not Balanced\";\n}\n\nint main() {\n    string s;\n    if (cin >> s) {\n        cout << isBalanced(s) << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef count_vowels(s: str) -> int:\n    return sum(1 for c in s.lower() if c in 'aeiou')\n\nif __name__ == '__main__':\n    import sys\n    raw = sys.stdin.read().strip()\n    print(count_vowels(raw))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.Scanner;\n\npublic class Solution {\n    public static int countVowels(String s) {\n        int count = 0;\n        String lower = s.toLowerCase();\n        for (char c : lower.toCharArray()) {\n            if (\"aeiou\".indexOf(c) != -1) count++;\n        }\n        return count;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) System.out.println(countVowels(sc.next()));\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n#include <ctype.h>\n\nint main() {\n    char s[1000];\n    if (scanf(\"%s\", s) == 1) {\n        int cnt = 0;\n        for (int i = 0; s[i] != '\\0'; i++) {\n            char c = tolower(s[i]);\n            if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') cnt++;\n        }\n        printf(\"%d\\n\", cnt);\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        int cnt = 0;\n        for (char c : s) {\n            char lower = tolower(c);\n            if (string(\"aeiou\").find(lower) != string::npos) cnt++;\n        }\n        cout << cnt << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef reverse_str(s: str) -> str:\n    return s[::-1]\n\nif __name__ == '__main__':\n    import sys\n    print(reverse_str(sys.stdin.read().strip()))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            System.out.println(new StringBuilder(sc.next()).reverse().toString());\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[1000];\n    if (scanf(\"%s\", s) == 1) {\n        int len = strlen(s);\n        for (int i = len - 1; i >= 0; i--) putchar(s[i]);\n        putchar('\\n');\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        reverse(s.begin(), s.end());\n        cout << s << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef is_palindrome(s: str) -> str:\n    cleaned = s.lower()\n    return \"Palindrome\" if cleaned == cleaned[::-1] else \"Not Palindrome\"\n\nif __name__ == '__main__':\n    import sys\n    print(is_palindrome(sys.stdin.read().strip()))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next().toLowerCase();\n            String rev = new StringBuilder(s).reverse().toString();\n            System.out.println(s.equals(rev) ? \"Palindrome\" : \"Not Palindrome\");\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main() {\n    char s[1000];\n    if (scanf(\"%s\", s) == 1) {\n        int l = 0, r = strlen(s) - 1;\n        int pal = 1;\n        while (l < r) {\n            if (tolower(s[l]) != tolower(s[r])) { pal = 0; break; }\n            l++; r--;\n        }\n        if (pal) printf(\"Palindrome\\n\");\n        else printf(\"Not Palindrome\\n\");\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        string rev = string(s.rbegin(), s.rend());\n        cout << (s == rev ? \"Palindrome\" : \"Not Palindrome\") << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef binary_search(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1\n\nif __name__ == '__main__':\n    import sys\n    tokens = sys.stdin.read().split()\n    if tokens:\n        n = int(tokens[0])\n        arr = [int(x) for x in tokens[1:n+1]]\n        target = int(tokens[n+1])\n        print(binary_search(arr, target))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.Scanner;\n\npublic class Solution {\n    public static int binarySearch(int[] arr, int target) {\n        int l = 0, r = arr.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            int target = sc.nextInt();\n            System.out.println(binarySearch(arr, target));\n        }\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n\nint binarySearch(int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[1000];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        int target;\n        scanf(\"%d\", &target);\n        printf(\"%d\\n\", binarySearch(arr, n, target));\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target; cin >> target;\n        int l = 0, r = n - 1, ans = -1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (arr[mid] == target) { ans = mid; break; }\n            if (arr[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        cout << ans << endl;\n    }\n    return 0;\n}\n"
            }
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
            ],
            templates: {
                python: "# Python 3.14\ndef length_of_longest_substring(s: str) -> int:\n    seen = {}\n    start = max_len = 0\n    for i, c in enumerate(s):\n        if c in seen and seen[c] >= start:\n            start = seen[c] + 1\n        seen[c] = i\n        max_len = max(max_len, i - start + 1)\n    return max_len\n\nif __name__ == '__main__':\n    import sys\n    print(length_of_longest_substring(sys.stdin.read().strip()))\n",
                java: "// Java (OpenJDK 27)\nimport java.util.*;\n\npublic class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        int maxLen = 0, start = 0;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (map.containsKey(c) && map.get(c) >= start) start = map.get(c) + 1;\n            map.put(c, i);\n            maxLen = Math.max(maxLen, i - start + 1);\n        }\n        return maxLen;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) System.out.println(lengthOfLongestSubstring(sc.next()));\n    }\n}\n",
                c: "// C (GCC 11)\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[1000];\n    if (scanf(\"%s\", s) == 1) {\n        int last[256];\n        memset(last, -1, sizeof(last));\n        int maxLen = 0, start = 0;\n        for (int i = 0; s[i] != '\\0'; i++) {\n            unsigned char c = s[i];\n            if (last[c] >= start) start = last[c] + 1;\n            last[c] = i;\n            int len = i - start + 1;\n            if (len > maxLen) maxLen = len;\n        }\n        printf(\"%d\\n\", maxLen);\n    }\n    return 0;\n}\n",
                cpp: "// C++ (G++ 17)\n#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        unordered_map<char, int> seen;\n        int maxLen = 0, start = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (seen.count(s[i]) && seen[s[i]] >= start) start = seen[s[i]] + 1;\n            seen[s[i]] = i;\n            maxLen = max(maxLen, i - start + 1);\n        }\n        cout << maxLen << endl;\n    }\n    return 0;\n}\n"
            }
        }
    ]
};

// Fallback generator for Sets 3, 4, 5
function generateGenericTemplates(qTitle, lang) {
    if (lang === 'python') {
        return `# Python 3.14\n# ${qTitle}\nimport sys\n\ndef solve(input_data: str) -> str:\n    # Write your optimal algorithm implementation here\n    tokens = input_data.split()\n    return \"Solution output\"\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        print(solve(raw))\n`;
    } else if (lang === 'java') {
        return `// Java (OpenJDK 27)\n// ${qTitle}\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Write your optimal solution here\n        if (sc.hasNext()) {\n            System.out.println(\"Solution output\");\n        }\n    }\n}\n`;
    } else if (lang === 'c') {
        return `// C (GCC 11)\n// ${qTitle}\n#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Write your optimal C implementation here\n    char buffer[256];\n    if (scanf(\"%s\", buffer) == 1) {\n        printf(\"Solution output\\n\");\n    }\n    return 0;\n}\n`;
    } else {
        return `// C++ (G++ 17)\n// ${qTitle}\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Write your optimal C++ algorithm here\n    string token;\n    if (cin >> token) {\n        cout << \"Solution output\" << endl;\n    }\n    return 0;\n}\n`;
    }
}

// Active Non-Repeating Set
let currentSetId = Number(localStorage.getItem("currentInterviewSet")) || 1;
if (!technicalSets[currentSetId]) {
    // If set is 3, 4, 5, map dynamically
    technicalSets[currentSetId] = technicalSets[1];
}

const selectedQuestions = technicalSets[currentSetId];
let currentQuestion = 0;
let currentLanguage = "python";
let timeLeft = 20 * 60;

// Separate storage per (questionId + "_" + language) to guarantee zero mismatch
const codeStorage = {};
const answers = {};

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

// Get Starter Template for Question + Language
function getTemplate(qIdx, lang) {
    const q = selectedQuestions[qIdx];
    if (q && q.templates && q.templates[lang]) {
        return q.templates[lang];
    }
    return generateGenericTemplates(q ? q.title : "Algorithm", lang);
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
    questionCategory.textContent = `Set ${currentSetId} • ${q.category}`;
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

    // Load code for this question and selected language
    const storageKey = currentQuestion + "_" + currentLanguage;
    if (codeStorage[storageKey] !== undefined) {
        codeEditor.value = codeStorage[storageKey];
    } else {
        const starter = getTemplate(currentQuestion, currentLanguage);
        codeEditor.value = starter;
        codeStorage[storageKey] = starter;
    }

    updateLanguageTab(currentLanguage);
    updateWordCount();
    updateGutterLines();
    updateNavigationButtons();
    switchTestCase(1);

    if (testCaseResultBadge) {
        testCaseResultBadge.textContent = "Ready for Execution";
        testCaseResultBadge.style.background = "rgba(56, 189, 248, 0.15)";
        testCaseResultBadge.style.color = "#38bdf8";
        testCaseResultBadge.style.borderColor = "rgba(56, 189, 248, 0.3)";
    }
}

function updateWordCount() {
    const text = (codeEditor.value || "").trim();
    const count = text.length;
    if (charCount) charCount.innerHTML = `<i class="fa-solid fa-code"></i> ${count} characters`;

    if (answers[currentQuestion]) {
        answerStatus.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Submitted &amp; Verified`;
        answerStatus.style.color = "#10b981";
    } else if (count > 20) {
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

    // 3. Load or initialize template
    const storageKey = currentQuestion + "_" + currentLanguage;
    if (codeStorage[storageKey] !== undefined) {
        codeEditor.value = codeStorage[storageKey];
    } else {
        const starter = getTemplate(currentQuestion, currentLanguage);
        codeEditor.value = starter;
        codeStorage[storageKey] = starter;
    }

    updateWordCount();
    updateGutterLines();
});

// Reset Template Button
if (resetTemplateBtn) {
    resetTemplateBtn.addEventListener("click", () => {
        if (confirm("Reset current editor code to the default starter template for " + currentLanguage.toUpperCase() + "?")) {
            const starter = getTemplate(currentQuestion, currentLanguage);
            codeEditor.value = starter;
            codeStorage[currentQuestion + "_" + currentLanguage] = starter;
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
        if (!code || code.length < 5) {
            alert("Please write code before compiling.");
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
            terminalScreen.innerHTML = `<span style="color:#6e7681;">[1/2] Compiling ${currentLanguage.toUpperCase()} program...\\n[2/2] Running process in sandbox...</span>`;
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
                    outHtml += `<div style="color:#e6edf3;"><strong>Standard Output (stdout):</strong>\\n${escapeHtml(data.stdout)}</div>\\n`;
                }
                if (data.stderr) {
                    outHtml += `<div style="color:#f87171; margin-top:8px;"><strong>Standard Error / Warnings (stderr):</strong>\\n${escapeHtml(data.stderr)}</div>`;
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

// 2. Run Public Tests Button
if (runTestsBtn) {
    runTestsBtn.addEventListener("click", async function () {
        const code = (codeEditor.value || "").trim();
        const q = selectedQuestions[currentQuestion];
        if (!q || !q.testCases) return;

        if (!code || code.length < 5) {
            alert("Please write code before running tests.");
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
            console.warn("Public test runner fallback:", err);
        }
    });
}

// 3. Submit Solution Button
if (submitBtn) {
    submitBtn.addEventListener("click", async function () {
        const code = (codeEditor.value || "").trim();
        const q = selectedQuestions[currentQuestion];
        if (!q) return;

        if (!code || code.length < 10) {
            alert("Please write a complete solution before submitting.");
            return;
        }

        // Run full evaluation
        if (testCaseResultBadge) {
            testCaseResultBadge.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Evaluating Submission...`;
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
            const allPassed = data.allPassed !== undefined ? data.allPassed : true;

            // Mark question as solved
            answers[currentQuestion] = code;
            codeStorage[currentQuestion + "_" + currentLanguage] = code;

            updateWordCount();

            if (window.showToast) {
                window.showToast(`Problem ${currentQuestion + 1} Submitted Successfully!`, "success");
            } else {
                alert(`Problem ${currentQuestion + 1} Solution Submitted Successfully!`);
            }

            if (testCaseResultBadge) {
                testCaseResultBadge.textContent = allPassed ? "✅ Accepted (100% Tests Passed)" : "⚠️ Submitted (Partial Tests Passed)";
                testCaseResultBadge.style.background = "rgba(16, 185, 129, 0.2)";
                testCaseResultBadge.style.color = "#34d399";
            }

            // If last question, show Finish button
            if (currentQuestion === selectedQuestions.length - 1) {
                if (nextBtn) nextBtn.style.display = "none";
                if (finishBtn) finishBtn.style.display = "inline-flex";
            }

        } catch (e) {
            answers[currentQuestion] = code;
            updateWordCount();
            alert(`Problem ${currentQuestion + 1} Solution Submitted!`);
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

// Finish Technical Round
function finishInterview() {
    codeStorage[currentQuestion + "_" + currentLanguage] = codeEditor.value;

    let attempted = 0;
    for (let i = 0; i < selectedQuestions.length; i++) {
        if (answers[i] || (codeStorage[i + "_" + currentLanguage] && codeStorage[i + "_" + currentLanguage].length > 20)) {
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
            `Score: ${score} / 100 Marks (${attempted} / 5 Problems Solved)`,
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
