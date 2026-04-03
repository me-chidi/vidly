"use strict";
const Joi = require('joi');
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
const Customer = mongoose.model('Customer', customerSchema);
function validateCustomer(customer) {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(255),
        phone: Joi.string().min(5).max(255)
    }).min(1); // require at least one field
    return schema.validate(customer);
}
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
//# sourceMappingURL=customer.js.map