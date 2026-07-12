/* ==========================================
   CodeForge AI
   Dashboard v2 (fixed)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof CodeForgeXP !== "undefined") {
        CodeForgeXP.init();
    }

    const notes = document.getElementById("notes");
    const saveBtn = document.getElementById("saveNote");

    if (notes) {
        notes.value = localStorage.getItem("developerNotes") || "";
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {

            localStorage.setItem("developerNotes", notes.value);

            if (typeof CodeForgeXP !== "undefined") {
                CodeForgeXP.addXP(5, "save-notes");
            }

            alert("✅ Notes saved successfully!");

        });
    }

    const challengeBtn = document.querySelector(".challenge-btn");

    if (challengeBtn) {
        challengeBtn.addEventListener("click", () => {

            if (typeof CodeForgeXP !== "undefined") {

                const awarded = CodeForgeXP.addXP(100, "weekly-challenge");

                if (awarded) {
                    alert("🏆 Challenge Started!\n\n+100 XP Awarded");
                } else {
                    alert("✅ Challenge already completed.");
                }

            }

        });
    }

    const goals = document.querySelectorAll('.panel input[type="checkbox"]');

    goals.forEach((goal, index) => {
        goal.addEventListener("change", () => {
            if (goal.checked) {
                if (typeof CodeForgeXP !== "undefined") {
                    CodeForgeXP.addXP(20, "goal-" + index);
                }
            }
        });
    });

    const actions = document.querySelectorAll(".action-card");

    actions.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });
    });

    const settingsLink = document.getElementById("settingsLink");

    if (settingsLink) {
        settingsLink.addEventListener("click", (e) => {
            e.preventDefault();
            alert("⚙️ Settings panel is coming soon!");
        });
    }

    const bellIcon = document.getElementById("bellIcon");

    if (bellIcon) {
        bellIcon.addEventListener("click", () => {
            alert("🔔 You're all caught up — no new notifications.");
        });
    }

    if (typeof CodeForgeXP !== "undefined") {
        CodeForgeXP.updateDashboard();
    }

    console.log("🚀 Dashboard v2 Loaded");

});
