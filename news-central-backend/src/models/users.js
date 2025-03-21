const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    jwtSecret: {type: String,},
});

module.exports = mongoose.model('User', UserSchema);