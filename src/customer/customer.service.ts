import { Customer } from '#customer/customer.model';
import { User } from '#user/user.model';
import mongoose from 'mongoose';
import _ from 'lodash';

export const getCustomers = async () => {
    return Customer.find().limit(10).sort({ name: 1 });
}

export const getCustomer = async (id: string) => {
    return Customer.findById(id);
}

export const updateCustomer = async (id: string, data: UpdateCustomerData) => {
    const user = await User.findById(data.userId);
    if (!user) return { customer: null, userNotFound: true };

    const updateDocument: UpdateCustomerData = {
        ..._.pick(data, ['userId', 'isGold', 'name', 'phone'])
    };

    const customer = await Customer.findByIdAndUpdate(id, updateDocument, { new: true });
    return { customer, userNotFound: false };
}

export const deleteCustomer = async (id: string) => {
    return Customer.findByIdAndDelete(id);
}

interface UpdateCustomerData {
    userId?: mongoose.Types.ObjectId;
    isGold?: boolean;
    name?: string;
    phone?: string;
}