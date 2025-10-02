import { getValidImageFile } from "@/utils/checkIsValid";
import type { RefObject } from 'react';

describe('getValidImageFile', () => {

  const createFileInputRef = (file?: File): RefObject<HTMLInputElement> => {
    return {
      current: {
        files: file
          ? {
              0: file,
              length: 1,
              item: (index: number) => (index === 0 ? file : null),
            } as unknown as FileList
          : null,
      } as HTMLInputElement,
    };
  };

  it('should return null if ref is undefined', () => {
    const ref = { current:null } as unknown as RefObject<HTMLInputElement>;
    expect(getValidImageFile(ref)).toBeNull();
  });

  it('should return null if files is null', () => {
    const ref = { current: { files: null } as unknown as HTMLInputElement };
    expect(getValidImageFile(ref)).toBeNull();
  });

  it('should return null if there are no files', () => {
    const ref = { current: { files: { length: 0, item: () => null } as unknown as FileList } as HTMLInputElement };
    expect(getValidImageFile(ref)).toBeNull();
  });

  it('should return the file if it is an image', () => {
    const imageFile = new File([''], 'photo.png', { type: 'image/png' });
    const ref = createFileInputRef(imageFile);
    const result = getValidImageFile(ref);
    expect(result).toBe(imageFile);
  });

  it('should return null if the file is not an image', () => {
    const textFile = new File([''], 'document.txt', { type: 'text/plain' });
    const ref = createFileInputRef(textFile);
    const result = getValidImageFile(ref);
    expect(result).toBeNull();
  });
});