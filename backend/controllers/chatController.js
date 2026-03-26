const ragService = require('../services/ragService');
const aiService = require('../services/aiService');

const handleChat = async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "Missing neural command." });
    }

    try {
        const context = ragService.getRelevantLore(message);
        const response = await aiService.generateResponse(message, context);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLore = (req, res) => {
    const lore = ragService.getAllLore();
    res.json(lore);
};

module.exports = {
    handleChat,
    getLore
};
