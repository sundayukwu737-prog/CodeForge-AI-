/* ==========================================
   CodeForge AI
   XP System v3 (fixed)
========================================== */

const CodeForgeXP = (() => {

    const STORAGE_KEY = "codeforge_profile_v2";

    const DEFAULT_PROFILE = {
        name: "Developer",
        level: 1,
        totalXP: 0,
        currentXP: 0,
        xpToNextLevel: 100,
        streak: 1,
        achievements: [],
        completedTasks: [],
        lastLogin: null
    };

    function loadProfile(){

        const saved = localStorage.getItem(STORAGE_KEY);

        if(saved){
            try{
                return JSON.parse(saved);
            }catch(e){
                console.error(e);
            }
        }

        saveProfile(DEFAULT_PROFILE);
        return {...DEFAULT_PROFILE};

    }

    function saveProfile(profile){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }

    function getProfile(){
        return loadProfile();
    }

    function calculateLevel(profile){
        while(profile.currentXP >= profile.xpToNextLevel){
            profile.currentXP -= profile.xpToNextLevel;
            profile.level++;
            profile.xpToNextLevel += 50;
        }
    }

    function checkAchievements(profile){

        if(profile.totalXP >= 100){
            unlockAchievement("100 XP Club");
        }
        if(profile.totalXP >= 500){
            unlockAchievement("500 XP Master");
        }
        if(profile.totalXP >= 1000){
            unlockAchievement("1000 XP Legend");
        }
        if(profile.level >= 5){
            unlockAchievement("Level 5 Developer");
        }
        if(profile.level >= 10){
            unlockAchievement("Level 10 Developer");
        }

    }

    function dailyLogin(){

        const profile = loadProfile();
        const today = new Date().toDateString();

        if(profile.lastLogin !== today){
            profile.lastLogin = today;
            profile.streak++;
            saveProfile(profile);
        }

        updateDashboard(profile);

    }

    function init(){
        const profile = loadProfile();
        checkAchievements(profile);
        updateDashboard(profile);
        dailyLogin();
    }

    function addXP(amount, taskId = null){

        const profile = loadProfile();

        if(taskId){
            if(profile.completedTasks.includes(taskId)){
                return false;
            }
            profile.completedTasks.push(taskId);
        }

        profile.totalXP += amount;
        profile.currentXP += amount;

        calculateLevel(profile);
        saveProfile(profile);
        updateDashboard(profile);

        return true;

    }

    function increaseStreak(){
        const profile = loadProfile();
        profile.streak++;
        saveProfile(profile);
        updateDashboard(profile);
    }

    function unlockAchievement(name){

        const profile = loadProfile();

        if(!profile.achievements.includes(name)){
            profile.achievements.push(name);
            saveProfile(profile);
            updateDashboard(profile);
        }

    }

    function reset(){
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }

    function updateDashboard(profile = loadProfile()){

        const xp = document.getElementById("xpValue");
        const level = document.getElementById("levelValue");
        const streak = document.getElementById("streakValue");
        const achievement = document.getElementById("achievementValue");
        const progress = document.getElementById("xpProgress");
        const levelTitle = document.getElementById("currentLevel");
        const summary = document.getElementById("xpSummary");

        if(xp){ xp.textContent = profile.totalXP + " XP"; }
        if(level){ level.textContent = "Level " + profile.level; }
        if(streak){ streak.textContent = profile.streak; }
        if(achievement){ achievement.textContent = profile.achievements.length; }

        if(progress){
            progress.style.width = (profile.currentXP / profile.xpToNextLevel * 100) + "%";
        }

        if(levelTitle){ levelTitle.textContent = "Level " + profile.level + " Developer"; }

        if(summary){
            summary.textContent = profile.currentXP + " / " + profile.xpToNextLevel + " XP";
        }

    }

    return {
        getProfile,
        saveProfile,
        calculateLevel,
        addXP,
        increaseStreak,
        unlockAchievement,
        reset,
        updateDashboard,
        dailyLogin,
        init
    };

})();

/* ==========================================
   Auto Start
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    CodeForgeXP.init();
    console.log("🏆 CodeForge XP System v3 Loaded");
});
