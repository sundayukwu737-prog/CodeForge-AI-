/* ==========================================
   CodeForge AI
   AI Assistant v7 (Groq-powered)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof CodeForgeXP !== "undefined") {
        CodeForgeXP.init();
    }

    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const promptButtons = document.querySelectorAll(".prompt-btn");

    const responses = {
        "html": "HTML is the structure of every webpage. Learn semantic tags like header, main, section, article and footer.",
        "css": "CSS controls the appearance of a webpage. Master Flexbox, Grid, responsive layouts and animations.",
        "javascript": "JavaScript adds interactivity. Focus on DOM manipulation, events, functions, objects, promises and async/await.",
        "python": "Python is excellent for automation, AI, backend development and data science. Learn functions, OOP and file handling first.",
        "react": "React helps you build modern user interfaces using reusable components, hooks and state management.",
        "c": "C is the foundation of many programming concepts. Practice pointers, arrays, functions and memory management.",
        "project": "A good next project is a Personal Finance Tracker with authentication, Local Storage and responsive design.",
        "roadmap": "Complete HTML, CSS and JavaScript before moving into React, APIs, backend development and AI integration.",
        "api": "APIs allow applications to communicate. Start with Fetch API, JSON and REST APIs before learning authentication.",
        "github": "Use GitHub to store your code, collaborate with others and deploy projects using GitHub Pages."
    };

    function addMessage(message, sender){
        if(!chatBox) return;

        const wrapper = document.createElement("div");
        wrapper.className = "message " + sender;

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = sender === "ai" ? "🤖" : "👨‍💻";

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = message;

        wrapper.appendChild(avatar);
        wrapper.appendChild(bubble);
        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function generateResponse(input){
        const question = input.toLowerCase();
        for(const keyword in responses){
            if(question.includes(keyword)){
                return responses[keyword];
            }
        }
        return "That's an interesting programming question. This demo assistant couldn't find a specific answer, but try asking about HTML, CSS, JavaScript, Python, React, C, APIs, GitHub, roadmaps or project ideas.";
    }

    function saveChat(){
        try {
            localStorage.setItem("codeforgeChat", chatBox.innerHTML);
        } catch (e) {
            console.error("saveChat failed:", e);
        }
    }

    function loadChat(){
        const history = localStorage.getItem("codeforgeChat");
        if(history){
            chatBox.innerHTML = history;
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    async function sendMessage() {

        try {

            const text = userInput.value.trim();
            if (text === "") return;

            addMessage(text, "user");
            userInput.value = "";
            saveChat();

            if (typeof CodeForgeXP !== "undefined") {
                CodeForgeXP.addXP(10, "chat-" + Date.now());
            }

            addMessage("🤖 Thinking...", "ai");
            const thinkingBubble = chatBox.lastElementChild;

            if (typeof askGroq !== "function") {
                throw new Error("AI service is not available right now.");
            }

            const aiReply = await askGroq(text);

            if (thinkingBubble) thinkingBubble.remove();

            if (aiReply) {
                addMessage(aiReply, "ai");
            } else {
                addMessage(generateResponse(text), "ai");
            }

            saveChat();

        } catch (err) {

            addMessage(generateResponse(userInput.value || ""), "ai");
            console.error(err);
            saveChat();

        }

    }

    if(userInput){
        userInput.addEventListener("keydown", function(e){
            if(e.key==="Enter"){
                e.preventDefault();
                sendMessage();
            }
        });
    }

    if(sendBtn){
        sendBtn.addEventListener("click", sendMessage);
    }

    if (promptButtons.length > 0) {
        promptButtons.forEach(button => {
            button.addEventListener("click", () => {
                const prompt = button.textContent.trim();
                userInput.value = prompt;
                sendMessage();
            });
        });
    }

    const clearBtn = document.getElementById("clearChat");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            const confirmed = confirm("Clear your chat history?");
            if (!confirmed) return;

            chatBox.innerHTML = "";
            localStorage.removeItem("codeforgeChat");

            addMessage("Hello! 👋 I'm your CodeForge AI Assistant. Ask me anything about programming.", "ai");
            saveChat();
        });
    }

    loadChat();

    if (chatBox.innerHTML.trim() === "") {
        addMessage("👋 Welcome to CodeForge AI! Ask me about HTML, CSS, JavaScript, Python, React, APIs, GitHub, or project ideas.", "ai");
        saveChat();
    }

    console.log("🤖 AI Assistant v7 Loaded");

});
