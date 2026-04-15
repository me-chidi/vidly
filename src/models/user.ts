import config from 'config';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<UserDocument>({
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

const User = mongoose.model<UserDocument>('User', userSchema);

function validateUser(user: UserObject) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    });
    
    return schema.validate(user);
}

function validateUserUpdate(user: Partial<Omit<UserObject, 'password'>>) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255),
        email: Joi.string().min(5).max(255).email(),
        isAdmin: Joi.boolean()
    }).min(1);
    
    return schema.validate(user);
}

interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

interface UserDocument extends User, mongoose.Document {
    generateAuthToken(): string;
}

interface UserObject {
    name: string;
    email: string;
    password: string;
}

export { User, validateUser, validateUserUpdate };
export type { UserObject, UserDocument };