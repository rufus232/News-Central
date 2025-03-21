const express = require('express');
const connectDB = require('./src/config/mongo'); // Import de la connexion MongoDB
require('dotenv').config();
const cors = require('cors');
const newsRoutes = require('./src/routes/news');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes'); // Import des routes utilisateur

const app = express();

// Connexion à la base de données
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour gérer les CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    })
);

// Définition des routes
app.use("/api/news", newsRoutes); // Routes pour les actualités
app.use("/api/auth", authRoutes); // Routes pour l'authentification
app.use("/api/users", userRoutes); // Routes pour les utilisateurs

// Route de base pour vérifier si l'API fonctionne
app.get('/api', (req, res) => {
    res.send('🚀 API en cours d\'exécution...');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000; // Utilisation d'un port par défaut si non défini
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));