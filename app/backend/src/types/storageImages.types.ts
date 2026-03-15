export type UploadImageResult = {
  success: boolean
  error?: "compress-error" | "upload-error"
}

export type UploadFile ={
  fileBuffer:Buffer,
  urlPath:string,
  mimeType:string
}

export interface ImageStorage  {
    deleteImg(imageName:string):Promise<any>
    generateSignedUrl(imageName:string):Promise<string>
}