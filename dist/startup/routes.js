"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("#middleware/error"));
const auth_routes_1 = __importDefault(require("#auth/auth.routes"));
const user_routes_1 = __importDefault(require("#user/user.routes"));
const rental_routes_1 = __importDefault(require("#rental/rental.routes"));
const return_routes_1 = __importDefault(require("#return/return.routes"));
const movie_routes_1 = __importDefault(require("#movie/movie.routes"));
const genre_routes_1 = __importDefault(require("#genre/genre.routes"));
const customer_routes_1 = __importDefault(require("#customer/customer.routes"));
const debug_1 = __importDefault(require("debug"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
(0, debug_1.default)('app:startup');
function routes(app) {
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('tiny'));
    // app.use(debug);
    app.use('/api/users', user_routes_1.default);
    app.use('/api/auth', auth_routes_1.default);
    app.use('/api/movies', movie_routes_1.default);
    app.use('/api/genres', genre_routes_1.default);
    app.use('/api/customers', customer_routes_1.default);
    app.use('/api/rentals', rental_routes_1.default);
    app.use('/api/returns', return_routes_1.default);
    app.use(error_1.default); // make sure the error middleware is last on the list
}
exports.default = routes;
