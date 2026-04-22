"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("#middleware/validate"));
const auth_service_1 = __importDefault(require("./auth.service"));
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (0, validate_1.default)(validateUser), async (req, res) => {
    const token = await (0, auth_service_1.default)(req.body.email, req.body.password);
    if (!token)
        return res.status(400).json({ error: 'Invalid email or password' });
    res.status(200).json({ token });
});
// might need password changing functionality
// if yes: use POST /change-password
function validateUser(user) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().min(5).max(255).required(),
        password: joi_1.default.string().min(5).max(255).required()
    });
    return schema.validate(user);
}
exports.default = router;
