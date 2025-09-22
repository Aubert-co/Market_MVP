


export const checkIsValidImage = (files:{
    fileBuffer:Buffer,
    mimeType:string,
    originalFileName:string
}
):boolean=>{
   
    if (!files.fileBuffer || !Buffer.isBuffer(files.fileBuffer)|| files.fileBuffer.length === 0   ) {
        return false
    }
    
    if (!files.mimeType || typeof files.mimeType !== 'string' || files.mimeType.trim() === '') {
        return false
    }
     if (!files.originalFileName || typeof files.originalFileName !== 'string' || files.originalFileName.trim() === '') {
        return false;
    }
        const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff'
    ];

    if (!files.mimeType || !allowedMimeTypes.includes(files.mimeType)) {
    return false;
    }
    return true
}
export const generateImgPath = (originalFileName:string):string=>{
    return Date.now() + '_' + originalFileName
}