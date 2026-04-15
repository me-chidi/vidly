"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.validateUser = validateUser;
exports.validateUserUpdate = validateUserUpdate;
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
userSchema.methods.generateAuthToken = function () {
    const payload = { _id: this._id, isAdmin: this.isAdmin };
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.get('jwtPrivateKey'));
    return token;
};
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
function validateUser(user) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(255).required(),
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(255).required(),
    });
    return schema.validate(user);
}
function validateUserUpdate(user) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(255),
        email: joi_1.default.string().min(5).max(255).email(),
    }).min(1);
    return schema.validate(user);
}
