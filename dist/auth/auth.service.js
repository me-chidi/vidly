"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("#user/user.model");
async function loginUser(email, password) {
    let user = await user_model_1.User.findOne({ email });
    if (!user)
        return null;
    const validPassword = await bcrypt_1.default.compare(password, user.password);
    if (!validPassword)
        return null;
    return user.generateAuthToken();
}
exports.default = loginUser;
