"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginOptionsSchema = void 0;
const pluginOptionsSchema = ({ Joi, }) => {
    return Joi.object({
        message: Joi.string()
            .required()
            .description(`Message you want to display`),
        endpoint: Joi.string()
            .uri()
            .required()
            .description(`end point of graphql API`),
        access_token: Joi.string()
            .required()
            .description("Access token of instagram")
    });
};
exports.pluginOptionsSchema = pluginOptionsSchema;
