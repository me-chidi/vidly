"use strict";
const Joi = require('joi');
module.exports = function () {
    Joi.objectId = require('joi-objectid')(Joi);
};
//# sourceMappingURL=validation.js.map