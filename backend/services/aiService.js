const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateResponse = async (query, context) => {
    // If API key starts with placeholder or is missing, use mock
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.startsWith('YOUR_')) {
        return `[MOCK] Neural Core reports: ${context || "Clues are scarce in this sector."}. \nRef: ${query}`;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Try gemini-2.5-flash (most reliable and supported)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a Cyberpunk Detective AI in the year 2084. 
        Context lore:
        ${context}
        
        Player's question: ${query}
        
        Respond in character. Keep it brief and gritty. If you don't know the answer, say the data is corrupted.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Service Error:", error);
        // Return a character-appropriate error instead of throwing a 500
        return `>>> ERROR: NEURAL CORE DISCONNECTED. 
                Possible Cause: ${error.message}
                Check your credentials in the orbital uplink (.env file).`;
    }
};

module.exports = {
    generateResponse
};
