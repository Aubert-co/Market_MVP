import { IImageUploadService, ImageUploadService } from "@/config/imageUpload/ImageUploadService";
import { AwsStorage } from "@/config/imageUpload/awsStorage";

import { ImageUploadProvier } from "@/provider/providerImageStorage";

export function makeUploadFile():IImageUploadService{

    if(process.env.NODE_ENV === "test-e2e"){
        return new ImageUploadProvier()
    }
    const storage = new AwsStorage()
    return new ImageUploadService(storage)
}