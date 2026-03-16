import { IFileStorage, UploadFile, UploadImageResult } from "../types/storageImages.types";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class AwsStorage implements IFileStorage {

    private client:S3Client
    private bucket:string

    constructor(){
        const AWS_REGION = process.env.AWS_REGION
        const AWS_BUCKET = process.env.AWS_BUCKET

        if(!AWS_REGION){
            throw new Error("No aws region")
        }
        if(!AWS_BUCKET){
            throw new Error("No aws BUCKET")
        }
        this.client = new S3Client({
            region:AWS_REGION
        });

        this.bucket = AWS_BUCKET as string
    }

    async upload({fileBuffer,urlPath,mimeType}:UploadFile):Promise<UploadImageResult>{

        try{

            const command = new PutObjectCommand({
                Bucket:this.bucket,
                Key:urlPath,
                Body:fileBuffer,
                ContentType:mimeType
            });

            await this.client.send(command);
            return {
                success:true,
            }

        }catch(err){
            return {
                success:false,
                error:"upload-error"
            }

        }

    }

    async generateSignedUrl(imageName:string):Promise<string>{

        const command = new GetObjectCommand({
            Bucket:this.bucket,
            Key:imageName
        });

        const signedUrl = await getSignedUrl(
            this.client,
            command,
            { expiresIn:3600 }
        );

        return signedUrl

    }

}