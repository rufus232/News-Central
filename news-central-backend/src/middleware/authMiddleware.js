const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    try {
        // Décoder le token pour obtenir l'ID utilisateur
        const decoded = jwt.decode(token);
        const userId = decoded.userId;

        // Récupérer l'utilisateur et sa clé secrète
        const user = await User.findById(userId);
        if (!user || !user.jwtSecret) {
            return res.status(401).json({ message: 'Utilisateur non trouvé ou clé secrète manquante.' });
        }

        // Vérifier le token avec la clé secrète unique
        jwt.verify(token, user.jwtSecret);

        req.user = { id: user._id, firstName: user.firstName, lastName: user.lastName };
        next();
    } catch (error) {
        console.error('Erreur d\'authentification :', error);
        res.status(401).json({ message: 'Token invalide.' });
    }
};

module.exports = authenticate;