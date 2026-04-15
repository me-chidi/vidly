import type { Application } from '#types/index';

import error from '#middleware/error';
import auth from '#routes/auth';
import users from '#routes/users';
import rentals  from '#routes/rentals';
import returns from '#routes/returns';
import movies from '#routes/movies';
import genres from '#routes/genres';
import customers from '#routes/customers';
import debug from 'debug';
import morgan from 'morgan';
import express from 'express';
debug('app:startup');


function routes(app: Application) {
    app.use(express.json());
    app.use(morgan('tiny'));
    // app.use(debug);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/movies', movies);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/returns', returns);
    app.use(error); // make sure the error middleware is last on the list
}

export default routes;