"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaError = exports.ErrorMessage = void 0;
const client_1 = require("@prisma/client");
class ErrorMessage extends Error {
    constructor({ message, service, status, action, context, prismaError }) {
        super(message);
        this.name = 'ErrorMessage';
        this.status = status;
        this.service = service;
        this.action = action;
        this.context = context;
        this.prismaError = prismaError;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorMessage);
        }
    }
}
exports.ErrorMessage = ErrorMessage;
const getPrismaError = (err) => {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return {
            message: err.message,
            code: err.code
        };
    }
    return undefined;
};
exports.getPrismaError = getPrismaError;
