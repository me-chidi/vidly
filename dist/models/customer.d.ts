export const Customer: mongoose.Model<{
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
}, mongoose.Document<unknown, {}, {
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        name: string;
        isGold: boolean;
        userId: mongoose.Types.ObjectId;
        phone?: string | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        name: string;
        isGold: boolean;
        userId: mongoose.Types.ObjectId;
        phone?: string | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    isGold: boolean;
    userId: mongoose.Types.ObjectId;
    phone?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export function validateCustomer(customer: any): Joi.ValidationResult<any>;
import mongoose = require("mongoose");
import Joi = require("joi");
//# sourceMappingURL=customer.d.ts.map