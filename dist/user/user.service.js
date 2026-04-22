"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getMe = void 0;
const user_model_1 = require("#user/user.model");
const userQueue_1 = __importDefault(require("#queues/userQueue"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const getMe = async (id) => {
    return user_model_1.User.findById(id).select({ password: 0 });
};
exports.getMe = getMe;
const createUser = async (data) => {
    let user = await user_model_1.User.findOne({ email: data.email });
    if (user)
        return null;
    user = new user_model_1.User(lodash_1.default.pick(data, ['name', 'email', 'password']));
    const salt = await bcrypt_1.default.genSalt(10); // gens a diff salt each time its called
    user.password = await bcrypt_1.default.hash(user.password, salt);
    await user.save();
    const userObj = lodash_1.default.pick(user, ['_id', 'name']);
    await userQueue_1.default.add('userCreated', userObj);
    return lodash_1.default.pick(user, ['name', 'email']);
};
exports.createUser = createUser;
const updateUser = async (id, data) => {
    const updateDocument = lodash_1.default.pick(data, ['name', 'email']);
    return user_model_1.User.findByIdAndUpdate(id, updateDocument, { new: true }).select({ password: 0 });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return user_model_1.User.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
