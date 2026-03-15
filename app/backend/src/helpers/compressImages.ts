import sharp from "sharp";

export async function compressImage(fileBuffer:Buffer):Promise<Buffer | null>{
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