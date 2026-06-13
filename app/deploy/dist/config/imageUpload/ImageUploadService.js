"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadService = void 0;
class ImageUploadService {
    constructor(storage) {
        this.storage = storage;
    }
    async uploadImage({ fileBuffer, urlPath, mimeType }) {
        return await this.storage.upload({
            fileBuffer, urlPath: "market/" + urlPath, mimeType
        });
    }
    async generateSignedUrl(imageName) {
        return await this.storage.generateSignedUrl(imageName);
    }
}
exports.ImageUploadService = ImageUploadService;
