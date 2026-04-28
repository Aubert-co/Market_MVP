import { IImageUploadService } from "@/services/ImageUploadService";
import { UploadFile, UploadImageResult } from "@/types/storageImages.types";

export class ImageUploadProvier implements IImageUploadService{
    constructor(){
      console.log("provider on")
    }
    async uploadImage({ }: UploadFile): Promise<UploadImageResult> {
      return {
        success:true
      }  
    }
    async generateSignedUrl(imageName: string): Promise<string> {
        return ""
    }
}