import * as exp from '#types/index';

import mongoose from 'mongoose';

export default function validate(validator?: Function) {
    return (req: exp.Request, res: exp.Response, next: exp.NextFunction) => {
        if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id as string))
                return res.status(404).json({ error: 'Invalid ID.' });
        }

        if (validator) {
            const { error } = validator(req.body);
            if (error) return res.status(400).json(error.details[0].message);
        }
        
        next();
    }
}