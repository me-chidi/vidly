import mongoose from 'mongoose';
export declare const getCustomers: () => Promise<(mongoose.Document<unknown, {}, import("#customer/customer.model").CustomerDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#customer/customer.model").CustomerDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const getCustomer: (id: string) => Promise<(mongoose.Document<unknown, {}, import("#customer/customer.model").CustomerDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#customer/customer.model").CustomerDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
export declare const updateCustomer: (id: string, data: UpdateCustomerData) => Promise<{
    customer: (mongoose.Document<unknown, {}, import("#customer/customer.model").CustomerDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#customer/customer.model").CustomerDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }) | null;
    userNotFound: boolean;
}>;
export declare const deleteCustomer: (id: string) => Promise<(mongoose.Document<unknown, {}, import("#customer/customer.model").CustomerDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#customer/customer.model").CustomerDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
interface UpdateCustomerData {
    userId?: mongoose.Types.ObjectId;
    isGold?: boolean;
    name?: string;
    phone?: string;
}
export {};
//# sourceMappingURL=customer.service.d.ts.map