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
    hasAdminAccess: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'storekeeper', 'salesperson',], //define the allowed roles
        default: 'storekeeper'
    },

},
{timestamps: true} //Date created and updated at
);

//create model for schema
const User = mongose.model('User', UserSchema);

module.exports = User;  //export the model to use in other files