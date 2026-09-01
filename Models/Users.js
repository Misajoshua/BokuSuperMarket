const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hasAtmCard: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    timestamps: true //Date created and updated at
});

//create model for schema
const User = mongose.model('User', UserSchema);