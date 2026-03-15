import  {Bucket, Storage}  from '@google-cloud/storage';
import { ErrorMessage } from '../helpers/ErrorMessage';
import { IFileStorage } from './ImageUploadService';
import { ImageStorage, UploadFile, UploadImageResult } from 'types/storageImages.types';



export class GoogleStorage implements IFileStorage , ImageStorage{
  private readonly PRIVATE_KEY: string
  private readonly BUCKET_NAME: string

  private storage: Storage
  private bucket: Bucket

  constructor() {

    const privateKey = process.env.PRIVATE_KEY
    const bucketName = process.env.BUCKET_NAME

    if (!privateKey) {
      throw new Error("Missing PRIVATE_KEY")
    }

    if (!bucketName) {
      throw new Error("Missing BUCKET_NAME")
    }

    this.PRIVATE_KEY = privateKey
    this.BUCKET_NAME = bucketName

    const keyStorage = JSON.parse(this.PRIVATE_KEY)

    this.storage = new Storage({
      credentials: keyStorage,
      projectId: keyStorage.project_id
    })

    this.bucket = this.storage.bucket(this.BUCKET_NAME)
  }
   async upload({ fileBuffer, urlPath, mimeType }:UploadFile): Promise<UploadImageResult> {
    const blob = this.bucket.file( urlPath );
    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType:mimeType,
        metadata: {
        cacheControl: 'public, max-age=31536000',         },
    });

    return new Promise((resolve) => {
        blobStream.on('error', err => {
          resolve({
            success: false,
            error: "upload-error"
          })
        });

        blobStream.on('finish', () => {
          resolve({success:true})
        });
        if(fileBuffer){
          blobStream.end(fileBuffer);
          return 
        }
        blobStream.end(fileBuffer)
    });
  }
  async generateSignedUrl(imageName: string): Promise<string> {
  try {
      const options = {
        version: "v4" as const,
        action: "read" as const,
        expires: Date.now() + 15 * 60 * 1000, 
      };

      const [url] = await this.storage
        .bucket(this.BUCKET_NAME)
        .file(imageName)
        .getSignedUrl(options);

        return url;
      } catch (error) {
    
        return "";  
    }
  }
  async deleteImg(imageName: string): Promise<any> {
    try{
      await this.storage.bucket(this.BUCKET_NAME).file(imageName).delete()
    }catch(err:any){
      throw new ErrorMessage("Failed to delete image",500)
    }
  }
}



