"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("#middleware/auth"));
const validate_1 = __importDefault(require("#middleware/validate"));
const user_1 = require("#models/user");
const userQueue_1 = __importDefault(require("#queues/userQueue"));
const lodash_1 = __importDefault(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/me', auth_1.default, async (req, res) => {
    const user = await user_1.User.findById(req.user?._id).select({ password: 0 });
    res.status(200).json(user);
});
router.post('/', (0, validate_1.default)(user_1.validateUser), async (req, res) => {
    let user = await user_1.User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json({ error: 'User already registered!' });
    user = new user_1.User(lodash_1.default.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt_1.default.genSalt(10); // gens a diff salt each time its called
    user.password = await bcrypt_1.default.hash(user.password, salt);
    await user.save();
    const userObj = lodash_1.default.pick(user, ['_id', 'name']);
    await userQueue_1.default.add('userCreated', userObj);
    res.status(201).json(lodash_1.default.pick(user, ['name', 'email']));
});
// we cant change password in this route we will do it in the auth module
router.put('/:id', [auth_1.default, (0, validate_1.default)(user_1.validateUserUpdate)], async (req, res) => {
    const updateDocument = {
        ...(lodash_1.default.pick(req.body, ['name', 'email']))
    };
    let user = await user_1.User.findByIdAndUpdate(req.params.id, updateDocument, { new: true }).select({ password: 0 });
    if (!user)
        return res.status(404).json({ error: 'User with the requested ID not found' });
    res.status(200).json(user);
});
router.delete('/:id', [auth_1.default, (0, validate_1.default)()], async (req, res) => {
    const user = await user_1.User.findByIdAndDelete(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User with the requested ID not found' });
    res.status(200).json(user);
});
exports.default = router;
