"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsStorage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class AwsStorage {
    constructor() {
        const AWS_REGION = process.env.AWS_REGION;
        const AWS_BUCKET = process.env.AWS_BUCKET;
        if (!AWS_REGION) {
            throw new Error("AWS_REGION not defined");
        }
        if (!AWS_BUCKET) {
            throw new Error("AWS_BUCKET not defined");
        }
        this.region = AWS_REGION;
        this.bucket = AWS_BUCKET;
        this.client = new client_s3_1.S3Client({
            region: this.region,
            credentials: process.env.AWS_ACCESS_KEY_ID &&
                process.env.AWS_SECRET_ACCESS_KEY
                ? {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                }
                : undefined,
        });
    }
    async upload({ fileBuffer, urlPath, mimeType, }) {
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: urlPath,
                Body: fileBuffer,
                ContentType: mimeType,
            });
            await this.client.send(command);
            return {
                success: true,
            };
        }
        catch (err) {
            return {
                success: false,
                error: "upload-error",
            };
        }
    }
    async generateSignedUrl(imageName) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucket,
                Key: imageName,
            });
            const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, {
                expiresIn: 60 * 60,
            });
            return signedUrl;
        }
        catch (err) {
            throw new Error("signed-url-error");
        }
    }
}
exports.AwsStorage = AwsStorage;
