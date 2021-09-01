const Joi = require('joi');
const schemas = {
    registerScema: Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    }),
    authScema: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    }),
    articleScema: Joi.object({
        title: Joi.string().required(),

        subTitle: Joi.string().optional(),
        description: Joi.string().required(),
        creator: Joi.string().required(),
        views: Joi.number().optional()
    })

    // define all the other schemas below
};
module.exports = schemas;
