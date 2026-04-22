"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("#middleware/validate"));
const auth_1 = __importDefault(require("#middleware/auth"));
const admin_1 = __importDefault(require("#middleware/admin"));
const customer_model_1 = require("#customer/customer.model");
const customer_service_1 = require("#customer/customer.service");
const express_1 = __importDefault(require("express"));
const permissions = [auth_1.default, admin_1.default];
const router = express_1.default.Router();
router.get('/', permissions, async (req, res) => {
    const customers = await (0, customer_service_1.getCustomers)();
    res.status(200).json(customers);
});
router.get('/:id', [auth_1.default, (0, validate_1.default)()], async (req, res) => {
    const customer = await (0, customer_service_1.getCustomer)(req.params.id);
    if (!customer)
        return res.status(404).json({ error: 'The customer with the given ID was not found!' });
    res.status(200).json(customer);
});
// might want a post route here in case workers fail
router.put('/:id', [auth_1.default, (0, validate_1.default)(customer_model_1.validateCustomer)], async (req, res) => {
    const { customer, userNotFound } = await (0, customer_service_1.updateCustomer)(req.params.id, req.body);
    if (userNotFound)
        return res.status(400).json({ error: 'Associated user does not exist' });
    if (!customer)
        return res.status(404).json({ error: 'Customer with the requested ID not found' });
    res.status(200).json(customer);
});
router.delete('/:id', [auth_1.default, (0, validate_1.default)()], async (req, res) => {
    const customer = await (0, customer_service_1.deleteCustomer)(req.params.id);
    if (!customer)
        return res.status(404).json({ error: 'Customer with the requested ID not found' });
    res.status(200).json(customer);
});
exports.default = router;
