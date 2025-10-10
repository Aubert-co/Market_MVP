
import { checkIsValidImage } from "../../helpers/checkIsValidImage"
describe('checkIsValidImage', () => {
  const validBuffer = Buffer.from([0xFF, 0xD8, 0xFF]); 
  const emptyBuffer = Buffer.alloc(0);

  it('should return true for a valid JPEG image', () => {
    const result = checkIsValidImage({
      fileBuffer: validBuffer,
      mimeType: 'image/jpeg',
      originalFileName: 'foto.jpg',
    });

    expect(result).toBe(true);
  });

  it('should return false for an empty buffer', () => {
    const result = checkIsValidImage({
      fileBuffer: emptyBuffer,
      mimeType: 'image/png',
      originalFileName: 'imagem.png',
    });

    expect(result).toBe(false);
  });

  it('should return false for an invalid mimetype', () => {
    const result = checkIsValidImage({
      fileBuffer: validBuffer,
      mimeType: 'application/pdf',
      originalFileName: 'arquivo.pdf',
    });

    expect(result).toBe(false);
  });

  it('should return false for an invalid buffer', () => {
    const result = checkIsValidImage({
      fileBuffer: null as any,
      mimeType: 'image/jpeg',
      originalFileName: 'foto.jpg',
    });

    expect(result).toBe(false);
  });
    it('should return false for a video file (mp4)', () => {
    const result = checkIsValidImage({
      fileBuffer: Buffer.from([0x00, 0x00, 0x00, 0x18]),
      mimeType: 'video/mp4',
      originalFileName: 'video.mp4',
    });

    expect(result).toBe(false);
  });

  it('should return false for a text file (txt)', () => {
    const result = checkIsValidImage({
      fileBuffer: Buffer.from('Texto qualquer'),
      mimeType: 'text/plain',
      originalFileName: 'notas.txt',
    });

    expect(result).toBe(false);
  });

});
