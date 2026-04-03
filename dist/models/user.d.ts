export const User: mongoose.Model<{
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
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
        email: string;
        password: string;
        isAdmin: boolean;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export function validateUser(user: any): Joi.ValidationResult<any>;
export function validateUserUpdate(user: any): Joi.ValidationResult<any>;
import mongoose = require("mongoose");
import Joi = require("joi");
//# sourceMappingURL=user.d.ts.map