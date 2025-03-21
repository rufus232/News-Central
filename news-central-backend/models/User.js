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

// // Hacher le mot de passe avant de sauvegarder un utilisateur
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Méthode pour comparer les mots de passe
// UserSchema.methods.matchPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('User', UserSchema);
