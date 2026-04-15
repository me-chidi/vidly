"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
exports.validateCustomer = validateCustomer;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    isGold: { type: Boolean, default: false },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    phone: {
        type: String,
        minLength: 5,
        maxLength: 255
    }
});
const Customer = mongoose_1.default.model('Customer', customerSchema);
exports.Customer = Customer;
function validateCustomer(customer) {
    const schema = joi_1.default.object({
        userId: joi_1.default.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        isGold: joi_1.default.boolean(),
        name: joi_1.default.string().min(5).max(255),
        phone: joi_1.default.string().min(5).max(255)
    }).min(1); // require at least one field
    return schema.validate(customer);
}
