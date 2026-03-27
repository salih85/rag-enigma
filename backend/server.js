const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use('/api', chatRoutes);

app.listen(PORT, () => {
    console.log(`Neural Core initialized on port ${PORT}`);
});
