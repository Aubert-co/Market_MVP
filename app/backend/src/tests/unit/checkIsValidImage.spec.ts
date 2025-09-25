
import { checkIsValidImage } from "../../helpers/checkIsValidImage"
describe('checkIsValidImage', () => {
  const validBuffer = Buffer.from([0xFF, 0xD8, 0xFF]); 
  const emptyBuffer = Buffer.alloc(0);

  it('deve retornar true para uma imagem JPEG válida', () => {
    const result = checkIsValidImage({
      fileBuffer: validBuffer,
      mimeType: 'image/jpeg',
      originalFileName: 'foto.jpg',
    });

    expect(result).toBe(true);
  });

  it('deve retornar false para um buffer vazio', () => {
    const result = checkIsValidImage({
      fileBuffer: emptyBuffer,
      mimeType: 'image/png',
      originalFileName: 'imagem.png',
    });

    expect(result).toBe(false);
  });

  it('deve retornar false para mimetype inválido', () => {
    const result = checkIsValidImage({
      fileBuffer: validBuffer,
      mimeType: 'application/pdf',
      originalFileName: 'arquivo.pdf',
    });

    expect(result).toBe(false);
  });

  it('deve retornar false para buffer inválido', () => {
    const result = checkIsValidImage({
      fileBuffer: null as any,
      mimeType: 'image/jpeg',
      originalFileName: 'foto.jpg',
    });

    expect(result).toBe(false);
  });
    it('deve retornar false para um arquivo de vídeo (mp4)', () => {
    const result = checkIsValidImage({
      fileBuffer: Buffer.from([0x00, 0x00, 0x00, 0x18]), // fake MP4 buffer
      mimeType: 'video/mp4',
      originalFileName: 'video.mp4',
    });

    expect(result).toBe(false);
  });

  it('deve retornar false para um arquivo de texto (txt)', () => {
    const result = checkIsValidImage({
      fileBuffer: Buffer.from('Texto qualquer'),
      mimeType: 'text/plain',
      originalFileName: 'notas.txt',
    });

    expect(result).toBe(false);
  });

});
