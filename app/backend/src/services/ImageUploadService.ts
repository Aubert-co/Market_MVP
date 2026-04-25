import { UploadFile, UploadImageResult,IFileStorage } from "@/types/storageImages.types";

export interface IImageUploadService{
  uploadImage({}:UploadFile):Promise<UploadImageResult>
  generateSignedUrl(imageName:string):Promise<string>
}

export class ImageUploadService implements IImageUploadService {
    constructor(private storage:IFileStorage){}

    public async uploadImage({fileBuffer,urlPath,mimeType}:UploadFile):Promise<UploadImageResult>{
     
      return await this.storage.upload({
        fileBuffer,urlPath,mimeType
      })
    }
   public async generateSignedUrl(imageName:string):Promise<string>{
    return await this.storage.generateSignedUrl(imageName)
   }
}
