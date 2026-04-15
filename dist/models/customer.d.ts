import Joi from 'joi';
import mongoose from 'mongoose';
declare const Customer: mongoose.Model<CustomerDocument, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, CustomerDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<CustomerDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<CustomerDocument, mongoose.Model<CustomerDocument, any, any, any, (mongoose.Document<unknown, any, CustomerDocument, any, mongoose.DefaultSchemaOptions> & CustomerDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, CustomerDocument, any, mongoose.DefaultSchemaOptions> & CustomerDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}), any, CustomerDocument>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CustomerDocument, mongoose.Document<unknown, {}, CustomerDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<CustomerDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, CustomerDocument, mongoose.Document<unknown, {}, CustomerDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<CustomerDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, CustomerDocument, mongoose.Document<unknown, {}, CustomerDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<CustomerDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    userId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, CustomerDocument, mongoose.Document<unknown, {}, CustomerDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<CustomerDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isGold?: mongoose.SchemaDefinitionProperty<boolean, CustomerDocument, mongoose.Document<unknown, {}, CustomerDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<CustomerDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phone?: mongoose.SchemaDefinitionProperty<string, CustomerDocument, mongoose.Document<unknown, {}, CustomerDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<CustomerDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, CustomerDocument>, CustomerDocument>;
declare function validateCustomer(customer: Partial<CustomerDocument>): Joi.ValidationResult<any>;
interface CustomerDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    isGold: boolean;
    name: string;
    phone: string;
}
export { Customer, validateCustomer };
export type { CustomerDocument };
//# sourceMappingURL=customer.d.ts.map