// ==========================================
// ALTS Global Theme Engine (theme.js)
// Unified Dark & Light Mode Controller
// Synchronizes across all rounds, dashboard, and login
// ==========================================

(function initThemeEngine() {
    // Determine initial theme
    const savedTheme = localStorage.getItem("alts-theme") || "dark";

    // Immediate DOM update (Anti-Flicker)
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (document.body) {
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            if (savedTheme === "dark") {
                document.body.classList.add("dark-theme");
            } else {
                document.body.classList.remove("dark-theme");
            }
            updateAllThemeUI(savedTheme);
        });
    }

    // Apply Theme Function
    function applyTheme(theme) {
        const target = (theme === "dark" || theme === "light") ? theme : "dark";
        document.documentElement.setAttribute("data-theme", target);
        if (document.body) {
            if (target === "dark") {
                document.body.classList.add("dark-theme");
            } else {
                document.body.classList.remove("dark-theme");
            }
        }
        localStorage.setItem("alts-theme", target);
        updateAllThemeUI(target);

        // Dispatch custom event for dynamic components (e.g. Monaco/Ace or Chart.js)
        window.dispatchEvent(new CustomEvent("alts-theme-change", { detail: { theme: target } }));
    }

    // Update icons and tooltips across the DOM
    function updateAllThemeUI(theme) {
        const isDark = theme === "dark";
        const iconClass = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        const titleText = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";

        // Query all theme toggle buttons and icons
        document.querySelectorAll(".theme-toggle-btn, #dashThemeToggle, #loginThemeBtn, #themeToggleBtn").forEach(btn => {
            btn.title = titleText;
            btn.setAttribute("aria-label", titleText);
            const icon = btn.querySelector("i");
            if (icon) {
                icon.className = iconClass;
            }
        });
    }

    // Universal Toggle Action
    window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme") || localStorage.getItem("alts-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";

        // Optional ripple/pulse animation on active buttons
        document.querySelectorAll(".theme-toggle-btn, #dashThemeToggle, #loginThemeBtn, #themeToggleBtn").forEach(btn => {
            btn.classList.add("theme-animating");
            setTimeout(() => btn.classList.remove("theme-animating"), 400);
        });

        applyTheme(next);
    };

    // Aliases for backward compatibility with existing onclick attributes
    window.toggleDashboardTheme = window.toggleTheme;
    window.toggleAuthTheme = window.toggleTheme;
    window.updateThemeUI = updateAllThemeUI;
    window.updateDashboardThemeUI = updateAllThemeUI;
    window.updateLoginThemeUI = updateAllThemeUI;

    // Listen to cross-tab storage changes
    window.addEventListener("storage", (e) => {
        if (e.key === "alts-theme" && e.newValue) {
            applyTheme(e.newValue);
        }
    });

    // Run UI update once DOM is loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => updateAllThemeUI(savedTheme));
    } else {
        updateAllThemeUI(savedTheme);
    }
})();

