import { compressImage } from "helpers/compressImages";
import { UploadFile, UploadImageResult } from "types/storageImages.types";


export interface IFileStorage {
  upload(data: UploadFile): Promise<UploadImageResult>
}
export class ImageUploadService {
    constructor(private storage:IFileStorage){}

    public async uploadImage({fileBuffer,urlPath,mimeType}:UploadFile):Promise<UploadImageResult>{
      const buff = await compressImage(fileBuffer)
      if(!buff) return {success:false,error:'compress-error'};

      return await this.storage.upload({
        fileBuffer:buff,urlPath,mimeType
      })
    }
   
}
