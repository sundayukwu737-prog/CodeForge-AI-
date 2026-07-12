/* ==========================================
   CodeForge AI
   Roadmap v3 (fixed)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof CodeForgeXP !== "undefined") {
        CodeForgeXP.init();
    }

    const items = document.querySelectorAll(".roadmap-item");
    const completeButtons = document.querySelectorAll(".complete-btn");

    items.forEach((item, index) => {
        const lessonId = "lesson-" + index;

        if (localStorage.getItem(lessonId) === "completed") {
            item.classList.add("completed");
            const btn = item.querySelector(".complete-btn");
            if (btn) btn.textContent = "✅ Completed";
        }
    });

    function updateRoadmapProgress() {

        const total = items.length;
        const completed = document.querySelectorAll(".roadmap-item.completed").length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        const progressBar = document.getElementById("roadmapProgress");
        const progressText = document.getElementById("roadmapPercent");

        if (progressBar) progressBar.style.width = percent + "%";
        if (progressText) progressText.textContent = percent + "% Complete";

    }

    function checkCourseCompletion() {

        const total = items.length;
        const completed = document.querySelectorAll(".roadmap-item.completed").length;
        const badge = document.getElementById("roadmapBadge");

        if (total > 0 && completed === total) {

            if (typeof CodeForgeXP !== "undefined") {
                CodeForgeXP.unlockAchievement("Roadmap Master");
                CodeForgeXP.addXP(200, "roadmap-complete");
            }

            if (badge) badge.textContent = "🏆 Roadmap Completed";

        } else if (badge) {
            badge.textContent = "";
        }

    }

    function updateLessonCounter() {

        const total = items.length;
        const completed = document.querySelectorAll(".roadmap-item.completed").length;
        const counter = document.getElementById("lessonCounter");

        if (counter) {
            counter.textContent = completed + " / " + total + " Lessons Completed";
        }

    }

    function refreshRoadmap() {
        updateRoadmapProgress();
        updateLessonCounter();
        checkCourseCompletion();
    }

    completeButtons.forEach((btn, index) => {

        btn.addEventListener("click", () => {

            const item = btn.closest(".roadmap-item");
            if (!item) return;

            const lessonId = "lesson-" + index;
            const isCompleted = item.classList.toggle("completed");

            if (isCompleted) {

                localStorage.setItem(lessonId, "completed");
                btn.textContent = "✅ Completed";

                if (typeof CodeForgeXP !== "undefined") {
                    CodeForgeXP.addXP(50, lessonId);
                }

            } else {

                localStorage.removeItem(lessonId);
                btn.textContent = "Mark Complete";

            }

            refreshRoadmap();

        });

    });

    refreshRoadmap();

    const resetBtn = document.getElementById("resetRoadmap");

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {

            const confirmed = confirm("Reset your roadmap progress?");
            if (!confirmed) return;

            items.forEach((item, index) => {
                item.classList.remove("completed");
                localStorage.removeItem("lesson-" + index);

                const btn = item.querySelector(".complete-btn");
                if (btn) btn.textContent = "Mark Complete";
            });

            refreshRoadmap();
            alert("✅ Roadmap progress has been reset.");

        });
    }

    const continueBtn = document.getElementById("continueLearning");

    if (continueBtn) {
        continueBtn.addEventListener("click", () => {

            const nextLesson = document.querySelector(".roadmap-item:not(.completed)");

            if (nextLesson) {
                nextLesson.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                alert("🎉 Congratulations! You have completed every lesson.");
            }

        });
    }

    console.log("🗺️ Roadmap v3 Loaded");

});
