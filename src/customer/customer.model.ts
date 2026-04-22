import Joi from 'joi';
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema<CustomerDocument>({
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

function validateCustomer(customer: Partial<CustomerDocument>) {
    const schema = Joi.object({
        userId: Joi.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(255),
        phone: Joi.string().min(5).max(255)
    }).min(1); // require at least one field

    return schema.validate(customer);
}

interface CustomerDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    isGold: boolean;
    name: string;
    phone: string;
}

export { Customer, validateCustomer };
export type { CustomerDocument };
