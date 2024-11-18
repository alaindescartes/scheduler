const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['caregiver', 'admin'],
        default: 'caregiver'
    },
    contactInfo: {
        phone: String,
        address: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
