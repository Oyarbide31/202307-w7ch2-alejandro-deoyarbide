import { Schema, model } from 'mongoose';
const filmsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    filmDirector: {
        type: String,
        required: true,
    },
    watched: {
        type: Boolean,
        required: true,
    },
});
export const FilmModel = model('Film', filmsSchema, 'films');
