export declare const getMe: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("#user/user.model").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("#user/user.model").UserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const createUser: (data: CreateUserData) => Promise<Pick<import("mongoose").Document<unknown, {}, import("#user/user.model").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("#user/user.model").UserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, "name" | "email"> | null>;
export declare const updateUser: (id: string, data: UpdateUserData) => Promise<(import("mongoose").Document<unknown, {}, import("#user/user.model").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("#user/user.model").UserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const deleteUser: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("#user/user.model").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("#user/user.model").UserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
interface CreateUserData {
    name: string;
    email: string;
    password: string;
}
interface UpdateUserData {
    name?: string;
    email?: string;
}
export {};
//# sourceMappingURL=user.service.d.ts.map