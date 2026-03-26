const lore = require('../data/lore.json');

const getRelevantLore = (query) => {
    const keywords = query.toLowerCase().split(' ');
    const relevant = lore.filter(item => 
        keywords.some(word => item.text.toLowerCase().includes(word))
    );
    return relevant.map(item => item.text).join('\n');
};

const getAllLore = () => {
    return lore;
};

module.exports = {
    getRelevantLore,
    getAllLore
};
