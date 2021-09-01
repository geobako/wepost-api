const errorHandler = require('./errorHandling').CustomError;
const responseHandler = require('./responseHandling').ResponseObject;
const handleError = require('./errorHandling').handleError;

exports.CustomError = errorHandler;
exports.ResponseHandler = responseHandler;
exports.handleError = handleError;
