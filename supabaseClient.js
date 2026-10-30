// ==========================================
// ALTS AI Interview Portal - Supabase Client
// Project: https://tgqktrgfomphehdoayca.supabase.co
// Key: sb_publishable_B4XZiz_NxXqrN04RXWmhYg_6My-_trx
// ==========================================

const SUPABASE_URL = "https://tgqktrgfomphehdoayca.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_B4XZiz_NxXqrN04RXWmhYg_6My-_trx";

(function initSupabase() {
    function createClient() {
        if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
            try {
                window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                console.log("✓ Supabase connected to project: tgqktrgfomphehdoayca");
            } catch (err) {
                console.warn("[Supabase] Init warning:", err.message);
            }
        }
    }

    if (typeof window !== "undefined") {
        if (window.supabase) {
            createClient();
        } else {
            window.addEventListener("load", createClient);
        }
    }
})();

// Helper 1: Save / Sync Round Score to Supabase
window.saveScoreToSupabase = async function (roundNum, roundName, score) {
    const email = localStorage.getItem("userEmail");
    if (!email || !window.supabaseClient) return;

    try {
        const { data, error } = await window.supabaseClient
            .from('round_scores')
            .upsert({
                candidate_email: email,
                round_number: roundNum,
                round_name: roundName,
                score: score,
                completed_at: new Date().toISOString()
            }, { onConflict: 'candidate_email,round_number' });

        if (error) {
            console.warn("[Supabase] Score sync note:", error.message);
        } else {
            console.log(`✓ [Supabase] Round ${roundNum} score (${score} pts) saved to cloud`);
        }
    } catch (e) {
        console.warn("[Supabase] Score sync network exception:", e.message);
    }
};

// Helper 2: Fetch and Sync Cloud Scores to Local Storage & Dashboard
window.syncCloudScores = async function () {
    const email = localStorage.getItem("userEmail");
    if (!email || !window.supabaseClient) return;

    try {
        const { data: scores, error } = await window.supabaseClient
            .from('round_scores')
            .select('*')
            .eq('candidate_email', email);

        if (scores && !error && scores.length > 0) {
            scores.forEach(row => {
                if (row.round_number === 1) localStorage.setItem("aptitude", row.score);
                if (row.round_number === 2) localStorage.setItem("gd", row.score);
                if (row.round_number === 3) {
                    localStorage.setItem("technical", row.score);
                    localStorage.setItem("tech", row.score);
                }
                if (row.round_number === 4) localStorage.setItem("hr", row.score);
            });

            if (typeof window.renderStageTable === "function") {
                window.renderStageTable();
            }
            console.log(`✓ [Supabase] Synced ${scores.length} rounds from cloud`);
        }
    } catch (e) {
        console.warn("[Supabase] Cloud score fetch note:", e.message);
    }
};

// Helper 3: Save Technical Code Submission to Supabase
window.saveCodeSubmissionToSupabase = async function (questionIndex, language, code, testsPassed, marks) {
    const email = localStorage.getItem("userEmail");
    if (!email || !window.supabaseClient) return;

    try {
        await window.supabaseClient
            .from('code_submissions')
            .insert([{
                candidate_email: email,
                question_index: questionIndex,
                language: language,
                code: code,
                tests_passed: testsPassed,
                marks: marks,
                submitted_at: new Date().toISOString()
            }]);
    } catch (e) {
        console.warn("[Supabase] Code submission note:", e.message);
    }
};
