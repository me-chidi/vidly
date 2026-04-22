import Joi from 'joi';
import mongoose from 'mongoose';
declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & UserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, UserDocument>;
declare function validateUser(user: UserObject): Joi.ValidationResult<any>;
declare function validateUserUpdate(user: Partial<Omit<UserObject, 'password'>>): Joi.ValidationResult<any>;
interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}
interface UserDocument extends User, mongoose.Document {
    generateAuthToken(): string;
}
interface UserObject {
    name: string;
    email: string;
    password: string;
}
export { User, validateUser, validateUserUpdate };
export type { UserObject, UserDocument };
//# sourceMappingURL=user.model.d.ts.map