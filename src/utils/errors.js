import httpStatusCode from "./httpStatusCodes.js";

export default class NotFoundError extends Error {
    constructor(message, detail) {
        super(message);
        this.detail = detail;
        this.name = 'NotFoundError'
        this.statusCode = httpStatusCode.NOT_FOUND;
        this.response = {
            "success": false,
            "message": this.message,
            "detail": this.detail,
            "status": this.statusCode
        }
    }
}

export class UnauthorizedError extends Error {
    constructor(message, detail) {
        super(message);
        this.detail = detail;
        this.name = 'UnauthorizedError'
        this.statusCode = httpStatusCode.UNAUTHORIZED;
        this.response = {
            "success": false,
            "message": this.message,
            "detail": this.detail,
            "status": this.statusCode
        }
    }
}