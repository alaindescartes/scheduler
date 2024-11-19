export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); // Ensure the stack trace starts from where the error is created
  }
}
