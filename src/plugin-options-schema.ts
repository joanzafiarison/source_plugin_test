import type { GatsbyNode } from "gatsby";
import type { ObjectSchema } from "gatsby-plugin-utils";

export const pluginOptionsSchema : GatsbyNode[`pluginOptionsSchema`] = ({
    Joi,
}) : ObjectSchema => {
    return Joi.object({
        message : Joi.string()
            .required()
            .description(`Message you want to display`)
        ,
        endpoint : Joi.string()
            .uri()
            .required()   
            .description(`end point of graphql API`)
        ,access_token : Joi.string()
            .required()
            .description("Access token of instagram")
    })
}