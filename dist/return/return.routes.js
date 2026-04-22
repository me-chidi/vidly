"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("#middleware/validate"));
const auth_1 = __importDefault(require("#middleware/auth"));
const return_service_1 = require("#return/return.service");
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', [auth_1.default, (0, validate_1.default)(validateReturn)], async (req, res) => {
    const { rental, error, status } = await (0, return_service_1.processReturn)(req.body.customerId, req.body.movieId);
    if (error)
        return res.status(status).json({ error });
    res.status(200).json(rental);
});
function validateReturn(rental) {
    const schema = joi_1.default.object({
        customerId: joi_1.default.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        movieId: joi_1.default.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        })
    });
    return schema.validate(rental);
}
exports.default = router;
