"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreSchema = exports.Genre = void 0;
exports.validateGenre = validateGenre;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const genreSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    }
});
exports.genreSchema = genreSchema;
const Genre = mongoose_1.default.model('Genre', genreSchema);
exports.Genre = Genre;
function validateGenre(genre) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(5).max(255)
    });
    return schema.validate(genre);
}
