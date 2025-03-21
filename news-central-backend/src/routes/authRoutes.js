const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Import du modèle utilisateur
const crypto = require('crypto');

const router = express.Router();

// Route d'inscription
// Route d'inscription
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Ajoutez un log pour déboguer
    console.log('Données reçues :', req.body);

    // Vérification des champs requis
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: 'Tous les champs sont requis.',
            user: { firstName, lastName, email, password }
        });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé.' });
        }

        // Hacher le mot de passe
        const passwordHash = await bcrypt.hash(password, 10);

        // Générer une clé secrète unique pour cet utilisateur
        const jwtSecret = crypto.randomBytes(32).toString('hex');

        // Créer un nouvel utilisateur
        const newUser = new User({
            firstName,
            lastName,
            email,
            passwordHash,
            jwtSecret, // Ajouter la clé secrète unique
            createdAt: new Date(),
        });

        await newUser.save();
        res.status(201).json({
            message: 'Utilisateur enregistré avec succès.',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer une clé secrète unique
        const userSecret = crypto.randomBytes(32).toString('hex');

        // Mettre à jour la clé secrète dans la base de données
        user.jwtSecret = userSecret;
        await user.save();

        // Générer un token JWT avec la clé secrète unique
        const token = jwt.sign(
            { userId: user._id },
            userSecret,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});



module.exports = router;