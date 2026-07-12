/* ==========================================
   CodeForge AI
   Groq Integration (AI Assistant chat only)
========================================== */

const GROQ_API_KEY = "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"; // starts with gsk_...

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

async function askGroq(prompt) {

    try {

        const response = await fetch(GROQ_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },

            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: "You are CodeForge AI, a professional but warm programming mentor. Always answer clearly and explain concepts step-by-step. When writing code, format it properly. Keep answers beginner-friendly but professional, and personable in greetings and casual chat."
                    },
                    { role: "user", content: prompt }
                ],
                temperature: 0.8
            })

        });

        if (!response.ok) {
            console.error("Groq request failed:", response.status, await response.text());
            return null;
        }

        const data = await response.json();

        const text = data?.choices?.[0]?.message?.content;

        if (!text) {
            console.error("Groq returned no usable content:", data);
            return null;
        }

        return text.trim();

    } catch (error) {

        console.error("Groq error:", error);
        return null;

    }

}
