const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Placeholder for RAG Engine
const gameLore = [
    { id: 1, text: "The year is 2084. Neo-Tokyo is ruled by the Iron Syndicate." },
    { id: 2, text: "The victim, Kenji Sato, was a high-level data runner for Arasaka-X." },
    { id: 3, text: "The murder weapon was a mono-wire whip, a signature tool of the 'Ghost' assassin group." },
    { id: 4, text: "Sector 7 is currently under lockdown due to a suspected 'Neural Virus' outbreak." }
];

app.get('/api/lore', (req, res) => {
    res.json(gameLore);
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    // Simple RAG logic: Search for keywords in lore
    const relevantLore = gameLore.filter(item => 
        message.toLowerCase().split(' ').some(word => item.text.toLowerCase().includes(word))
    );

    const context = relevantLore.map(item => item.text).join('\n');
    
    try {
        // Here we would call Gemini. For now, a mock response if no API key is set.
        if (!process.env.GEMINI_API_KEY) {
            return res.json({ 
                response: `[MOCK] As a detective, I found this local intel: ${context || "Nothing relevant found in the database."}. \nYou asked: ${message}` 
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are a Cyberpunk Detective AI in the year 2084. 
        Context lore:
        ${context}
        
        Player's question: ${message}
        
        Respond in character. Keep it brief and gritty.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate AI response." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
