"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadProvier = void 0;
class ImageUploadProvier {
    constructor() {
        console.log("provider on");
    }
    async uploadImage({}) {
        return {
            success: true
        };
    }
    async generateSignedUrl(imageName) {
        return "";
    }
}
exports.ImageUploadProvier = ImageUploadProvier;
