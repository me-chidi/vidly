"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("#middleware/error"));
const auth_1 = __importDefault(require("#routes/auth"));
const users_1 = __importDefault(require("#routes/users"));
const rentals_1 = __importDefault(require("#routes/rentals"));
const returns_1 = __importDefault(require("#routes/returns"));
const movies_1 = __importDefault(require("#routes/movies"));
const genres_1 = __importDefault(require("#routes/genres"));
const customers_1 = __importDefault(require("#routes/customers"));
const debug_1 = __importDefault(require("debug"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
(0, debug_1.default)('app:startup');
function routes(app) {
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('tiny'));
    // app.use(debug);
    app.use('/api/users', users_1.default);
    app.use('/api/auth', auth_1.default);
    app.use('/api/movies', movies_1.default);
    app.use('/api/genres', genres_1.default);
    app.use('/api/customers', customers_1.default);
    app.use('/api/rentals', rentals_1.default);
    app.use('/api/returns', returns_1.default);
    app.use(error_1.default); // make sure the error middleware is last on the list
}
exports.default = routes;
