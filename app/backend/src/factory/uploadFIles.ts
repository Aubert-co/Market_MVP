import { ImageUploadService } from "@/services/ImageUploadService";
//import { AwsStorage } from "@/lib/awsStorage";
import { GoogleStorage } from "@/lib/googleStorage";

export function makeUploadFile(){
    const storage = new GoogleStorage()
    return new ImageUploadService(storage)
}