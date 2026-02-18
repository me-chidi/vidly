const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().required().min(5),
        phone: Joi.string().required().min(10)
    });
    
    return schema.validate(customer);
}

function validateCustomerUpdate(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(3),
        phone: Joi.string().min(5)
    }).min(1); // require at least one field

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
module.exports.validateUpdate = validateCustomerUpdate;
