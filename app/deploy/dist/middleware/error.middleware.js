"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = ErrorMiddleware;
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const multer_1 = __importDefault(require("multer"));
const logger_1 = require("@/config/logger/logger");
const logger = (0, logger_1.startLogger)();
function ErrorMiddleware(error, req, res, next) {
    if (error instanceof multer_1.default.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            logger.error({
                message: "LIMIT FILE SIZE",
                status: 422,
                context: "Image file size exceeds the 5MB limit"
            });
            return res.status(422).json({ message: "Image file size exceeds the 5MB limit." });
        }
        logger.error({
            message: "FILE UPLOAD FAILED",
            status: 400
        });
        return res.status(400).json({
            message: `File upload failed`
        });
    }
    if (error instanceof ErrorMessage_1.ErrorMessage) {
        logger.error({
            context: error.context,
            prismaError: error.prismaError,
            status: error.status,
            service: error.service,
            action: error.action,
            message: error.message
        });
        return res.status(error.status)
            .json({ message: error.message });
    }
    logger.error({
        message: 'error not registered',
        status: 500
    });
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
}
