import * as images from '@/helpers/checkIsValidImage'
import { IProductAdminRepository } from '@/modules/storeAdmin/products/products.repository'
import { ProductAdminService } from '@/modules/storeAdmin/products/products.services'
import { ImageUploadService } from '@/services/ImageUploadService'

const mockRepository:IProductAdminRepository = {
    createProduct:jest.fn(),
    deleteProduct:jest.fn(),
    countStoreProducts:jest.fn()
}
const mockUpload = jest.spyOn(ImageUploadService.prototype,'uploadImage')
const productService = new ProductAdminService(mockRepository)
describe("method createProduct",()=>{
    beforeEach(()=>{
        jest.resetAllMocks()
    })
    it("should call the services correctly",async()=>{
        const urlPath = "testing 1234"
        jest.spyOn(images,'generateImgPath').mockReturnValue(urlPath)
        const description = "lorem ipstu"
        const name = "testing"
        const price = 35
        const category = 'testing'
        const stock = 35
        const storeId = 3
        const originalName = 'name'
        const fileBuffer = new Buffer('testing')
        const mimeType = "img"
        await productService.createProduct({description,name,price,
            category,stock,storeId,fileBuffer,originalName,mimeType

        })
        expect( mockRepository.createProduct)
        .toHaveBeenCalledTimes(1)
        expect( mockRepository.createProduct).toHaveBeenCalledWith({
            description,name,price,category,stock,storeId,imageUrl:urlPath
        })
        expect( mockUpload ).toHaveBeenCalledTimes(1)
        expect( mockUpload ).toHaveBeenCalledWith({
            mimeType,fileBuffer,urlPath
        })
    })
})
