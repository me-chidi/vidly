import mongoose from 'mongoose';
export declare const processReturn: (customerId: mongoose.Types.ObjectId, movieId: mongoose.Types.ObjectId) => Promise<{
    rental: null;
    error: string;
    status: number;
} | {
    rental: import("#rental/rental.model").RentalDocument;
    error: null;
    status: number;
}>;
//# sourceMappingURL=return.service.d.ts.map