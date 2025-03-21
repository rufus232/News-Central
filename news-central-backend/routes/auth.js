const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// ✅ Route d'inscription
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
          }
      // Vérifier si l'utilisateur existe déjà
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
      }

      // Hashage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Création et sauvegarde de l'utilisateur
      const user = new User({ firstName, lastName, email, password: hashedPassword });
  
      try {
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
      } catch (err) {
        if (err.code === 11000) {
          // Si l'email existe déjà
          return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }
        res.status(500).json({ message: 'Erreur du serveur' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  });
  

// ✅ Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Utilisateur introuvable' });
      }
  
      // Vérifier si le mot de passe est correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }
      console.log('Password received:', password); // Log du mot de passe reçu
      console.log('Password stored in DB:', user.password); // Log du mot de passe stocké dans la base

      // Générer un token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // ✅ Retourner aussi les infos de l'utilisateur
      res.json({
        token,
        user: {
          id: user._id,
          firstname: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
  
    } catch (err) {
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  });  

// ✅ Route de suppression de l'utilisateur
router.delete('/delete', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Récupérer le token du header Authorization
  
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }
  
    try {
      // Vérification du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Récupérer l'utilisateur en fonction de l'ID contenu dans le token
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Supprimer l'utilisateur de la base de données
      await User.findByIdAndDelete(decoded.id);
      
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  });
  
// ✅ Route pour modifier les informations d'un utilisateur
router.put('/update', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extraire le token du header
  
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier le token
      const userId = decoded.id;
  
      // Vérifier si l'utilisateur existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }
  
      // Mise à jour des informations utilisateur
      const { firstName, lastName, email, password } = req.body;
      if (email) user.email = email;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      
      // Si un nouveau mot de passe est fourni, on le hache et on le met à jour
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      await user.save(); // Sauvegarder les modifications
  
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  });
    

module.exports = router;
