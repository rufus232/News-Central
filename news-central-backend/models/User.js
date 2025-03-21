const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schéma de l'utilisateur
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
   email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Validation de l'email
    lowercase: true // Transforme l'email en minuscule pour éviter les conflits
  },
  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('User', UserSchema);
