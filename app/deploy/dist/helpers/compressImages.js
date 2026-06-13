"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImage = compressImage;
const sharp_1 = __importDefault(require("sharp"));
async function compressImage({ fileBuffer }) {
    try {
        const MAX_WIDTH_LARGE = 1200;
        const MAX_WIDTH_MEDIUM = 800;
        const MAX_WIDTH_SMALL = 600;
        const fileSizeKB = fileBuffer.byteLength / 1024;
        if (fileSizeKB < 100) {
            return {
                data: fileBuffer,
                success: true
            };
        }
        let width = MAX_WIDTH_MEDIUM;
        let quality = 80;
        if (fileSizeKB > 500) {
            width = MAX_WIDTH_SMALL;
            quality = 70;
        }
        const optimizedBuffer = await (0, sharp_1.default)(fileBuffer)
            .resize({ width, withoutEnlargement: true })
            .jpeg({ quality })
            .toBuffer();
        return { data: optimizedBuffer, success: true };
    }
    catch (error) {
        return { data: undefined, success: false };
    }
}
