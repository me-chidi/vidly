export const Rental: mongoose.Model<{
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
}, mongoose.Document<unknown, {}, {
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
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
        customer: {
            name: string;
            isGold: boolean;
            phone: string;
        };
        movie: {
            title: string;
            dailyRentalRate: number;
        };
        dateOut: NativeDate;
        dateReturned?: NativeDate | null;
        rentalFee?: number | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        customer: {
            name: string;
            isGold: boolean;
            phone: string;
        };
        movie: {
            title: string;
            dailyRentalRate: number;
        };
        dateOut: NativeDate;
        dateReturned?: NativeDate | null;
        rentalFee?: number | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    customer: {
        name: string;
        isGold: boolean;
        phone: string;
    };
    movie: {
        title: string;
        dailyRentalRate: number;
    };
    dateOut: NativeDate;
    dateReturned?: NativeDate | null;
    rentalFee?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export function validateRental(rental: any): Joi.ValidationResult<any>;
import mongoose = require("mongoose");
import Joi = require("joi");
//# sourceMappingURL=rental.d.ts.map