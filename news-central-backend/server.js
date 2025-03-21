const express = require('express');
const connectDB = require('./src/config/mongo'); // Import de la connexion MongoDB
require('dotenv').config();
const authRoutes = require('./routes/auth');
const cors = require('cors');
const newsRoutes = require('./src/routes/news');

const app = express();

connectDB();

// ✅ Middleware pour parser le JSON (sinon req.body sera undefined)
app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    })
);

app.use("/api/news", newsRoutes);
// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    res.send('🚀 API en cours d\'exécution...');
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));