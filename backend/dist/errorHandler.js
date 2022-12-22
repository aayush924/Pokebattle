"use strict";
class ErrorResponse extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
    next();
};
module.exports = errorHandler;
