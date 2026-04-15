"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("#startup/logging"));
const error = function (err, req, res, next) {
    logging_1.default.error(err.message, err);
    res.status(500).json({ error: 'Something went wrong!' });
};
exports.default = error;
