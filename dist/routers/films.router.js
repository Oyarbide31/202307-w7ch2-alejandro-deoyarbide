import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { FilmController } from '../controller/films.controller.js';
import { FilmsRepo } from '../repository/Films.mongo.repository.js';
const debug = createDebug('W6E:Router:filmsRouter');
debug('Loaded');
const repo = new FilmsRepo(); // Aki tienes 1 archivo
const controller = new FilmController(repo); // Aki tienes otro archivo
export const filmsRouter = createRouter();
filmsRouter.get('/peliculas', controller.getAll.bind(controller));
filmsRouter.get('/peliculas/:id', controller.getById.bind(controller));
filmsRouter.post('/peliculas', controller.create.bind(controller));
filmsRouter.patch('/peliculas/:id', controller.update.bind(controller));
filmsRouter.delete('/peliculas/:id', controller.delete.bind(controller));
