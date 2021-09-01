const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../../config/keys');
const { CustomError, httpStatus } = require('../../helpers/errorHandling');

module.exports = async (req, res, next) => {
    try {
        let token;
        //get the token from the header if present
        if (req.headers['authorization']) {
            token = req.headers['authorization'].split(' ')[1];
            //if no token found, return response (without going to the next middelware)
            if (!token) throw new CustomError(httpStatus.UNAUTHORIZED, 'Access denied');
        } else {
            throw new CustomError(httpStatus.UNAUTHORIZED, 'Access denied');
        }

        //if can verify the token, set req.user and pass to next middleware
        const decoded = await jwt.verify(token, tokenSecret);

        req.user = decoded;
        next();
    } catch (err) {
        //if invalid token
        next(err);
    }
};
