"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUploadFile = makeUploadFile;
const ImageUploadService_1 = require("@/config/imageUpload/ImageUploadService");
const awsStorage_1 = require("@/config/imageUpload/awsStorage");
const providerImageStorage_1 = require("@/provider/providerImageStorage");
function makeUploadFile() {
    if (process.env.NODE_ENV === "test-e2e") {
        return new providerImageStorage_1.ImageUploadProvier();
    }
    const storage = new awsStorage_1.AwsStorage();
    return new ImageUploadService_1.ImageUploadService(storage);
}
