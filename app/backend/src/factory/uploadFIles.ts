import { IImageUploadService, ImageUploadService } from "@/services/ImageUploadService";
import { AwsStorage } from "@/lib/awsStorage";
//import { GoogleStorage } from "@/lib/googleStorage";
import { ImageUploadProvier } from "@/provider/providerImageStorage";

export function makeUploadFile():IImageUploadService{

    if(process.env.NODE_ENV === "test-e2e"){
        return new ImageUploadProvier()
    }
    const storage = new AwsStorage()
    return new ImageUploadService(storage)
}