class ErrorResponse extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}


const errorHandler = (err: ErrorResponse, req: any, res: any, next: any) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
    next();
}
  
  module.exports = errorHandler;

