const Joi = require('joi');
const { CustomError, httpStatus, handleError } = require('../../helpers/errorHandling');

const middleware = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        const valid = !error;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            const err = new CustomError(httpStatus.BAD_REQUEST, message);
            return handleError(err, res);
        }
    };
};
module.exports = middleware;
