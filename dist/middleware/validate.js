"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
const mongoose_1 = __importDefault(require("mongoose"));
function validate(validator) {
    return (req, res, next) => {
        if (req.params.id) {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                return res.status(404).json({ error: 'Invalid ID.' });
        }
        if (validator) {
            const { error } = validator(req.body);
            if (error)
                return res.status(400).json(error.details[0].message);
        }
        next();
    };
}
