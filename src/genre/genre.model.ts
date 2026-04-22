import Joi from 'joi';
import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema<GenreDocument>({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre: GenreObject) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255)
    });
    
    return schema.validate(genre);
}

interface GenreDocument extends mongoose.Document {
    name: string;
}

interface GenreObject {
    name: string;
}

export { Genre, validateGenre, genreSchema };
export type { GenreDocument };
