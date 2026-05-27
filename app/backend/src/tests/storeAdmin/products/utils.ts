import { IProductAdminRepository } from "@/modules/storeAdmin/products/repository/products.repository";
import { IImageUploadService } from "@/config/imageUpload/ImageUploadService";

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