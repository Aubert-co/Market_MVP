import  {Storage}  from '@google-cloud/storage';
import { Buffer } from 'buffer'; 
import { ErrorMessage } from '../helpers/ErrorMessage';
import sharp from 'sharp';

const PRIVATE_KEY = process.env.PRIVATE_KEY
if(!PRIVATE_KEY)throw new Error("no private key");
 
const KEY_STORAGE = JSON.parse( PRIVATE_KEY )
const storage = new Storage({
    credentials:KEY_STORAGE,
    projectId:KEY_STORAGE.project_id
})
const BUCKET_NAME = process.env.BUCKET_NAME ;

if (!BUCKET_NAME ) {
    throw new Error("no bucket name");
} 
const bucket = storage.bucket(BUCKET_NAME)

async function compressImage(fileBuffer: Buffer): Promise<Buffer | null> {
  try {
    const MAX_WIDTH_LARGE = 1200;
    const MAX_WIDTH_MEDIUM = 800;
    const MAX_WIDTH_SMALL = 600;

    const fileSizeKB = fileBuffer.byteLength / 1024;

    if (fileSizeKB < 100) {
      
      return fileBuffer;
    }

    let width = MAX_WIDTH_MEDIUM;
    let quality = 80;

    if (fileSizeKB > 500) {
      width = MAX_WIDTH_SMALL;
      quality = 70;
    }

    const optimizedBuffer = await sharp(fileBuffer)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality })
      .toBuffer();

    return optimizedBuffer;
  } catch (error:any) {
    return null;
  }
}

type UploadFile ={
  fileBuffer:Buffer,
  urlPath:string,
  mimeType:string
}
export const uploadFileToGCS = async ({fileBuffer,mimeType,urlPath}:UploadFile): Promise<string> => {
    const buff = await compressImage(fileBuffer)
    const blob = bucket.file( urlPath );
    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType:mimeType,
        metadata: {
        cacheControl: 'public, max-age=31536000',         },
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', err => {
        reject(err);
        });

        blobStream.on('finish', () => {
          resolve('sucess')
        });
        if(buff){
          blobStream.end(buff);
          return 
        }
        blobStream.end(fileBuffer)
    });
    
};
export const generateSignedUrl = async (imageName: string) => {
  try {
    const options = {
      version: "v4" as const,
      action: "read" as const,
      expires: Date.now() + 15 * 60 * 1000, 
    };

    const [url] = await storage
      .bucket(BUCKET_NAME)
      .file(imageName)
      .getSignedUrl(options);

    return url;
  } catch (error) {
   
    return "";
  }
};

export const deleteImgFromBucket = async(imageName:string)=>{
  try{
    await storage.bucket(BUCKET_NAME).file(imageName).delete()
  }catch(err:any){
    throw new ErrorMessage("Failed to delete image",500)
  }
}