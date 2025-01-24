import httpStatusCode from "./httpStatusCodes.js";

class AppError extends Error {
    constructor(name, message, detail, statusCode) {
        super(message);
        this.name = name;
        this.detail = detail;
        this.statusCode = statusCode;
        this.response = {
            success: false,
            message: this.message,
            detail: this.detail,
            status: this.statusCode,
        };
    }
}

export default class NotFoundError extends AppError {
    constructor(message, detail) {
        super('NotFoundError', message, detail, httpStatusCode.NOT_FOUND);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message, detail) {
        super('UnauthorizedError', message, detail, httpStatusCode.UNAUTHORIZED);
    }
}

export class TypeError extends AppError {
    constructor(message, detail) {
        super('TypeError', message, detail, httpStatusCode.BAD_REQUEST);
    }
}

export class ValidationError extends AppError {
    constructor(message, detail) {
        super('ValidationError', message, detail, httpStatusCode.BAD_REQUEST);
    }
}

export class InvalidTokenError extends AppError {
    constructor(message, detail) {
        super('InvalidTokenError', message, detail, httpStatusCode.UNAUTHORIZED);
    }
}

export class TokenExpiredError extends AppError {
    constructor(message, detail) {
        super('TokenExpiredError', message, detail, httpStatusCode.UNAUTHORIZED);
    }
}
