import { IProductAdminRepository } from "@/modules/storeAdmin/products/products.repository";
import { IImageUploadService } from "@/services/ImageUploadService";

export const mockProductAdminRep = {
    createProduct:jest.fn(),
    getStoreProducts:jest.fn(),
    countStoreProducts:jest.fn(),
    desactiveProduct:jest.fn(),
    productMostViewed:jest.fn(),
    deleteProduct:jest.fn()

} satisfies IProductAdminRepository

export const mockImgUpload = {
 uploadImage:jest.fn(),
 generateSignedUrl:jest.fn()
} satisfies IImageUploadService