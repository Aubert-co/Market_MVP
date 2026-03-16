import { ImageUploadService } from "../services/ImageUploadService";
import { AwsStorage } from "../lib/awsStorage";

export function makeUploadFile(){
    const storage = new AwsStorage()
    return new ImageUploadService(storage)
}