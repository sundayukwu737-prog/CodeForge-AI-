/* ==========================================
   CodeForge AI
   Gemini Integration (Project Generator only)
========================================== */

const GEMINI_API_KEY = "AQ.Ab8RN6JCWA79c7mQ91KSVKRAFJB9X479PEKg3BPnC8HY9DqSKQ"; // starts with AQ.

const GEMINI_MODEL = "gemini-2.5-flash";

const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

async function callGemini(promptText) {

    try {

        const response = await fetch(GEMINI_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                contents: [
                    { role: "user", parts: [ { text: promptText } ] }
                ],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 1024
                }
            })

        });

        if (!response.ok) {
            console.error("Gemini request failed:", response.status, await response.text());
            return null;
        }

        const data = await response.json();

        const candidate = data?.candidates?.[0];

        if (!candidate || !candidate.content?.parts?.[0]?.text) {
            console.error("Gemini returned no usable content:", data);
            return null;
        }

        return candidate.content.parts[0].text.trim();

    } catch (error) {

        console.error("Gemini error:", error);
        return null;

    }

}

const GeminiAI = {

    async generate(prompt) {

        const raw = await callGemini(prompt);

        if (!raw) return null;

        return raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    }

};
