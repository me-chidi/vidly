"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("#middleware/validate"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = require("#models/user");
const router = express_1.default.Router();
router.post('/', (0, validate_1.default)(validateUser), async (req, res) => {
    let user = await user_1.User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ error: 'Invalid email or password' });
    const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: 'Invalid email or password' });
    const token = user.generateAuthToken();
    res.status(200).json({ token });
});
// bug with this type annotation "satisfies exp.RequestHandler"
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
