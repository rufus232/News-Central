const express = require('express');
const connectDB = require('./src/config/mongo'); // Import de la connexion MongoDB
require('dotenv').config();
const cors = require('cors');
const newsRoutes = require('./src/routes/news');

const app = express();

connectDB();

app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    })
);

app.use("/api/news", newsRoutes);

app.get('/api', (req, res) => {
    res.send('🚀 API en cours d\'exécution...');
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));