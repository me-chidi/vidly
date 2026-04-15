"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("#middleware/validate"));
const auth_1 = __importDefault(require("#middleware/auth"));
const admin_1 = __importDefault(require("#middleware/admin"));
const user_1 = require("#models/user");
const customer_1 = require("#models/customer");
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const permissions = [auth_1.default, admin_1.default];
const router = express_1.default.Router();
router.get('/', permissions, async (req, res) => {
    const customers = await customer_1.Customer.find().limit(10).sort({ name: 1 });
    res.status(200).json(customers);
});
router.get('/:id', [auth_1.default, (0, validate_1.default)()], async (req, res) => {
    const customer = await customer_1.Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).json({ error: 'The customer with the given ID was not found!' });
    res.status(200).json(customer);
});
// might want a post route here in case workers fail
router.put('/:id', [auth_1.default, (0, validate_1.default)(customer_1.validateCustomer)], async (req, res) => {
    const user = await user_1.User.findById(req.body.userId);
    if (!user)
        return res.status(400).json({ error: 'Associated user does not exist' });
    const updateDocument = {
        ...lodash_1.default.pick(req.body, ['userId', 'isGold', 'name', 'phone']),
    };
    const customer = await customer_1.Customer.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!customer)
        return res.status(404).json({ error: 'Customer with the requested ID not found' });
    res.status(200).json(customer);
});
router.delete('/:id', [auth_1.default, (0, validate_1.default)()], async (req, res) => {
    const customer = await customer_1.Customer.findByIdAndDelete(req.params.id);
    if (!customer)
        return res.status(404).json({ error: 'Customer with the requested ID not found' });
    res.status(200).json(customer);
});
exports.default = router;
