import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { EscaladorController } from '../controller/escalador.controller.js';
import { EscaladorRepo } from '../repository/escalador.fs.repository.js';

const debug = createDebug('W6E:Router:EscaladoresRouter');

debug('Loaded');

const repo = new EscaladorRepo(); // Aki tienes 1 archivo
const controller = new EscaladorController(repo); // Aki tienes otro archivo
export const peliculasRouter = createRouter();

peliculasRouter.get('/peliculas', controller.getAll.bind(controller));
peliculasRouter.get('/peliculas/:id', controller.getById.bind(controller));
peliculasRouter.post('/peliculas', controller.create.bind(controller));
peliculasRouter.patch('/peliculas/:id', controller.update.bind(controller));
peliculasRouter.delete('/peliculas/:id', controller.delete.bind(controller));
