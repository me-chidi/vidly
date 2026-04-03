const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const payload = { _id: this._id, isAdmin: this.isAdmin };
    const token = jwt.sign(payload, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
    
    return schema.validate(user);
}

function validateUserUpdate(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255),
        email: Joi.string().min(5).max(255).email(),
    }).min(1);
    
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateUserUpdate = validateUserUpdate;