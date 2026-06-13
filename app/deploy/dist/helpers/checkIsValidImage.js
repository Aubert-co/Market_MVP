"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImgPath = exports.checkIsValidImage = void 0;
const crypto_1 = require("crypto");
const checkIsValidImage = (files) => {
    if (!files.fileBuffer || !Buffer.isBuffer(files.fileBuffer) || files.fileBuffer.length === 0) {
        return false;
    }
    if (!files.mimeType || typeof files.mimeType !== 'string' || files.mimeType.trim() === '') {
        return false;
    }
    if (!files.originalFileName || typeof files.originalFileName !== 'string' || files.originalFileName.trim() === '') {
        return false;
    }
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/bmp',
        'image/tiff'
    ];
    if (!files.mimeType || !allowedMimeTypes.includes(files.mimeType)) {
        return false;
    }
    return true;
};
exports.checkIsValidImage = checkIsValidImage;
const generateImgPath = () => {
    return `${(0, crypto_1.randomUUID)()}.jpeg`;
};
exports.generateImgPath = generateImgPath;
