"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("#middleware/auth"));
const validate_1 = __importDefault(require("#middleware/validate"));
const user_model_1 = require("#user/user.model");
const user_service_1 = require("#user/user.service");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/me', auth_1.default, async (req, res) => {
    const user = await (0, user_service_1.getMe)(req.user?._id);
    res.status(200).json(user);
});
router.post('/', (0, validate_1.default)(user_model_1.validateUser), async (req, res) => {
    const user = await (0, user_service_1.createUser)(req.body);
    if (!user)
        return res.status(400).json({ error: 'User already registered!' });
    res.status(201).json(user);
});
// we cant change password in this route we will do it in the auth module
router.put('/:id', [auth_1.default, (0, validate_1.default)(user_model_1.validateUserUpdate)], async (req, res) => {
    const user = await (0, user_service_1.updateUser)(req.params.id, req.body);
    if (!user)
        return res.status(404).json({ error: 'User with the requested ID not found' });
    res.status(200).json(user);
});
router.delete('/:id', [auth_1.default, (0, validate_1.default)()], async (req, res) => {
    const user = await (0, user_service_1.deleteUser)(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User with the requested ID not found' });
    res.status(200).json(user);
});
exports.default = router;
