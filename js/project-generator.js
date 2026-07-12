/* ==========================================
   CodeForge AI
   Project Generator v3 (fixed)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof CodeForgeXP !== "undefined") {
        CodeForgeXP.init();
    }

    const language = document.getElementById("language");
    const difficulty = document.getElementById("difficulty");
    const generateBtn = document.getElementById("generateBtn");
    const favoriteBtn = document.getElementById("favoriteBtn");
    const title = document.getElementById("projectTitle");
    const description = document.getElementById("description");
    const time = document.getElementById("time");
    const skills = document.getElementById("skills");
    const level = document.getElementById("level");
    const favoriteList = document.getElementById("favoriteList");

    /* Local fallback project bank (used if Gemini is unavailable) */
    const projects = {

        "HTML & CSS": {
            Beginner: {
                title: "Personal Portfolio",
                description: "Build a responsive personal portfolio website with multiple pages and animations.",
                time: "3 Days",
                skills: "HTML, CSS, Flexbox, Responsive Design"
            },
            Intermediate: {
                title: "Restaurant Website",
                description: "Create a modern restaurant website with menus, booking section and gallery.",
                time: "5 Days",
                skills: "CSS Grid, Animations, Responsive Layout"
            },
            Advanced: {
                title: "Developer Dashboard",
                description: "Design a professional admin dashboard with charts and dark mode.",
                time: "7 Days",
                skills: "Advanced CSS, UI Design"
            }
        },

        JavaScript: {
            Beginner: {
                title: "To-Do App",
                description: "Create a task manager using Local Storage.",
                time: "2 Days",
                skills: "DOM, Events, Local Storage"
            },
            Intermediate: {
                title: "Weather Dashboard",
                description: "Build a weather application using an API.",
                time: "5 Days",
                skills: "Fetch API, Async/Await"
            },
            Advanced: {
                title: "Expense Tracker",
                description: "Create a complete finance tracker with charts.",
                time: "10 Days",
                skills: "Charts, Data Handling, Local Storage"
            }
        },

        Python: {
            Beginner: {
                title: "Student Grade Calculator",
                description: "Create a Python program that calculates grades and generates a report.",
                time: "2 Days",
                skills: "Variables, Loops, Functions"
            },
            Intermediate: {
                title: "Library Management System",
                description: "Build a console-based library management application.",
                time: "5 Days",
                skills: "Functions, File Handling, Dictionaries"
            },
            Advanced: {
                title: "AI Chatbot",
                description: "Build an intelligent chatbot using Python and an AI API.",
                time: "10 Days",
                skills: "APIs, JSON, OOP"
            }
        },

        C: {
            Beginner: {
                title: "Bank Account Simulator",
                description: "Create a simple banking system using structures and functions.",
                time: "3 Days",
                skills: "Functions, Structures, Arrays"
            },
            Intermediate: {
                title: "Student Record Manager",
                description: "Manage student records using file handling.",
                time: "5 Days",
                skills: "Pointers, Files, Structures"
            },
            Advanced: {
                title: "Mini Compiler",
                description: "Create a basic lexical analyzer for a simple language.",
                time: "14 Days",
                skills: "Pointers, Parsing, Algorithms"
            }
        },

        Java: {
            Beginner: {
                title: "Student Management System",
                description: "Develop a console-based student management application.",
                time: "4 Days",
                skills: "Classes, Objects, Methods"
            },
            Intermediate: {
                title: "Inventory Management System",
                description: "Create an inventory manager with file storage.",
                time: "7 Days",
                skills: "OOP, Collections, File I/O"
            },
            Advanced: {
                title: "Online Banking System",
                description: "Develop a secure banking application using Java OOP principles.",
                time: "14 Days",
                skills: "Inheritance, Interfaces, Exception Handling"
            }
        },

        React: {
            Beginner: {
                title: "Movie Search App",
                description: "Build a React application that searches for movies using an API.",
                time: "5 Days",
                skills: "Components, Props, State"
            },
            Intermediate: {
                title: "Task Management Dashboard",
                description: "Create a responsive productivity dashboard using React.",
                time: "7 Days",
                skills: "Hooks, Routing, Context API"
            },
            Advanced: {
                title: "E-Commerce Store",
                description: "Develop a complete React shopping application with authentication and cart features.",
                time: "14 Days",
                skills: "React Router, Authentication, State Management"
            }
        }

    };

    async function generateProject() {

        const lang = language.value;
        const diff = difficulty.value;

        if (!lang || !diff) {
            alert("Please choose a programming language and difficulty.");
            return;
        }

        title.textContent = "Generating...";
        description.textContent = "Gemini AI is creating your project...";
        time.textContent = "...";
        skills.textContent = "...";
        level.textContent = diff;

        const prompt = `
Return ONLY valid JSON, with no markdown fences and no explanation.

{
  "title":"",
  "description":"",
  "estimatedTime":"",
  "skills":"",
  "bonusChallenge":""
}

Generate ONE unique software project idea.

Programming Language: ${lang}
Difficulty: ${diff}
`;

        const response = await GeminiAI.generate(prompt);

        if (!response) {

            const fallback = projects[lang]?.[diff];

            if (fallback) {
                title.textContent = fallback.title;
                description.textContent = fallback.description;
                time.textContent = fallback.time;
                skills.textContent = fallback.skills;
                level.textContent = diff;
            } else {
                title.textContent = "Unable to generate a project";
                description.textContent = "Please check your connection and try again.";
                time.textContent = "--";
                skills.textContent = "--";
            }

            return;
        }

        try {

            const project = JSON.parse(response);

            title.textContent = project.title;
            description.textContent = project.description;
            time.textContent = project.estimatedTime;
            skills.textContent = project.skills;
            level.textContent = diff;

            if (typeof CodeForgeXP !== "undefined") {
                CodeForgeXP.addXP(30, `generate-${lang}-${diff}-${Date.now()}`);
            }

        } catch (error) {

            title.textContent = "AI Response";
            description.textContent = response;
            time.textContent = "--";
            skills.textContent = "--";
            console.error(error);

        }

    }

    function loadFavorites() {

        favoriteList.innerHTML = "";

        const favorites = JSON.parse(localStorage.getItem("favoriteProjects") || "[]");

        if (favorites.length === 0) {
            favoriteList.innerHTML = "<li>No favorite projects yet.</li>";
            return;
        }

        favorites.forEach(project => {
            const li = document.createElement("li");
            li.textContent = project;
            favoriteList.appendChild(li);
        });

    }

    function saveFavorite() {

        if (title.textContent === "Nothing generated yet...") {
            alert("Generate a project first.");
            return;
        }

        let favorites = JSON.parse(localStorage.getItem("favoriteProjects") || "[]");

        if (favorites.includes(title.textContent)) {
            alert("This project is already in your favorites.");
            return;
        }

        favorites.push(title.textContent);
        localStorage.setItem("favoriteProjects", JSON.stringify(favorites));

        loadFavorites();

        if (typeof CodeForgeXP !== "undefined") {
            CodeForgeXP.addXP(10, "favorite-" + title.textContent);
        }

        alert("⭐ Project saved successfully!");

    }

    generateBtn.addEventListener("click", generateProject);
    favoriteBtn.addEventListener("click", saveFavorite);

    loadFavorites();

    console.log("🚀 Project Generator v3 Loaded");

});
