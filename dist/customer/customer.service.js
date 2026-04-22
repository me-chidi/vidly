"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomer = exports.getCustomers = void 0;
const customer_model_1 = require("#customer/customer.model");
const user_model_1 = require("#user/user.model");
const lodash_1 = __importDefault(require("lodash"));
const getCustomers = async () => {
    return customer_model_1.Customer.find().limit(10).sort({ name: 1 });
};
exports.getCustomers = getCustomers;
const getCustomer = async (id) => {
    return customer_model_1.Customer.findById(id);
};
exports.getCustomer = getCustomer;
const updateCustomer = async (id, data) => {
    const user = await user_model_1.User.findById(data.userId);
    if (!user)
        return { customer: null, userNotFound: true };
    const updateDocument = {
        ...lodash_1.default.pick(data, ['userId', 'isGold', 'name', 'phone'])
    };
    const customer = await customer_model_1.Customer.findByIdAndUpdate(id, updateDocument, { new: true });
    return { customer, userNotFound: false };
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (id) => {
    return customer_model_1.Customer.findByIdAndDelete(id);
};
exports.deleteCustomer = deleteCustomer;
