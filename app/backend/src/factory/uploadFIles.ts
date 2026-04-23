import { IImageUploadService, ImageUploadService } from "@/services/ImageUploadService";
import { AwsStorage } from "@/lib/awsStorage";
//import { GoogleStorage } from "@/lib/googleStorage";


export function makeUploadFile():IImageUploadService{
    const storage = new AwsStorage()
    return new ImageUploadService(storage)
}