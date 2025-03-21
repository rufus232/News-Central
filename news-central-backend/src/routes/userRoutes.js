const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const User = require('../models/users');
const History = require('../models/history'); // Utilisation du modèle existant
const router = express.Router();

// Route protégée pour récupérer les informations de l'utilisateur connecté
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-passwordHash'); // Exclut le hash du mot de passe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route pour récupérer l'historique des articles consultés
router.get('/history', authenticate, async (req, res) => {
    try {
        const history = await History.find({ userId: req.user.userId }).sort({ viewedAt: -1 });
        res.json(history);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route pour ajouter un article à l'historique
router.post('/history', authenticate, async (req, res) => {
    const {
        articleTitle,
        articleDescription,
        articleContent,
        articleUrl,
        source,
        publishedAt,
        searchedKeyword,
        searchedCategory,
        searchedString,
        searchedSource,
        searchedUrl,
        searchedDate,
    } = req.body;

    try {
        const newHistoryEntry = new History({
            userId: req.user.userId,
            articleTitle,
            articleDescription,
            articleContent,
            articleUrl,
            source,
            publishedAt,
            searchedKeyword,
            searchedCategory,
            searchedString,
            searchedSource,
            searchedUrl,
            searchedDate,
            viewedAt: new Date(),
        });

        await newHistoryEntry.save();
        res.status(201).json({ message: 'Article ajouté à l\'historique.' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout à l\'historique :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route pour recréer une requête à partir de l'historique
router.post('/recreate-search', authenticate, async (req, res) => {
    const { searchedKeyword, searchedCategory, searchedString, searchedSource, searchedUrl, searchedDate } = req.body;

    try {
        // Simulez une requête avec les paramètres fournis
        // Vous pouvez appeler ici votre service de recherche d'articles
        const queryParams = {
            keyword: searchedKeyword,
            category: searchedCategory,
            searchString: searchedString,
            source: searchedSource,
            url: searchedUrl,
            startDate: searchedDate?.startDate,
            endDate: searchedDate?.endDate,
        };

        const articles = await fetchNewsFromNewsAPI(queryParams); // Appel au service de recherche
        res.json(articles);
    } catch (error) {
        console.error('Erreur lors de la recréation de la recherche :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});


// Route pour modifier les informations de l'utilisateur connecté
router.patch('/update-profile', authenticate, async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Mettre à jour les informations de l'utilisateur
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) {
            // Vérifier si l'email est déjà utilisé par un autre utilisateur
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }
            user.email = email;
        }

        // Sauvegarder les modifications
        await user.save();

        res.status(200).json({
            message: 'Profil mis à jour avec succès.',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route pour supprimer le compte de l'utilisateur connecté
router.delete('/delete-account', authenticate, async (req, res) => {
    try {
        // Supprimer l'utilisateur connecté
        const deletedUser = await User.findByIdAndDelete(req.user.userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Supprimer également l'historique associé à cet utilisateur
        await History.deleteMany({ userId: req.user.userId });

        res.status(200).json({ message: 'Compte utilisateur supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du compte :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

module.exports = router;