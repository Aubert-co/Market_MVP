export type UploadImageResult = {
  success: boolean
  error?: "compress-error" | "upload-error"
}

export type UploadFile ={
  fileBuffer:Buffer,
  urlPath:string,
  mimeType:string
}


export interface IFileStorage {
  upload(data: UploadFile): Promise<UploadImageResult>
  generateSignedUrl(imageName:string):Promise<string>
  
} 