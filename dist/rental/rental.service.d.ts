import mongoose from 'mongoose';
export declare const getRentals: () => Promise<(mongoose.Document<unknown, {}, import("#rental/rental.model").RentalDocument, {}, mongoose.DefaultSchemaOptions> & import("#rental/rental.model").RentalDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const createRental: (customerId: string, movieId: string) => Promise<{
    rental: null;
    error: string;
    status: number;
} | {
    rental: undefined;
    error: null;
    status?: never;
}>;
//# sourceMappingURL=rental.service.d.ts.map