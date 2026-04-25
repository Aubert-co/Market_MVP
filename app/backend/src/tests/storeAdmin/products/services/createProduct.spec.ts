import {  ProductAdminService } from "@/modules/storeAdmin/products/products.services"
import * as compress from "@/helpers/compressImages"


import * as generate from "@/helpers/checkIsValidImage"
import { ErrorMessage } from "@/helpers/ErrorMessage"
import { mockProductAdminRep ,mockImgUpload} from "../utils"

const spyCompress = jest.spyOn(compress,'compressImage')

const spyGenerateImgPath = jest.spyOn(generate,'generateImgPath')


 const datas = {
        stock:5,storeId:1,category:"shoes",description:"lorem",
        fileBuffer:Buffer.alloc(1),mimeType:"img/png",name:"shirt",
        originalName:"image",price:55,imageUrl:"testing"
    } 
describe("when create a product",()=>{
   
    beforeEach(()=>{
        jest.clearAllMocks()
    })
     it("should return an error when product deletion fails",async()=>{
       
        const countProducts = mockProductAdminRep.countStoreProducts.mockResolvedValueOnce(5)
        const deleteProduct = mockProductAdminRep.deleteProduct.mockRejectedValue(new ErrorMessage({
            service:"test",action:"deleteProduct",status:500,message:"testing"
        }))
        spyCompress.mockResolvedValue({success:true,data:Buffer.alloc(1)})
        
        mockImgUpload.uploadImage.mockRejectedValueOnce({success:false})
        mockImgUpload.uploadImage.mockRejectedValueOnce({success:false})
        spyGenerateImgPath.mockReturnValue(datas.imageUrl)
          const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
        try{
            await v.createProduct(datas)
            
        }catch(err:any){
            
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("testing")
            expect(err.action).toEqual("deleteProduct")
            expect(err.service).toEqual("test")
            expect(err.status).toEqual(500)
            
        }
        expect(countProducts).toHaveBeenCalledTimes(1)
        
        expect(spyCompress).toHaveBeenCalledTimes(1)
        expect(mockImgUpload.uploadImage).toHaveBeenCalledTimes(2)
        expect(mockProductAdminRep.createProduct).toHaveBeenCalledTimes(1)
        expect(deleteProduct).toHaveBeenCalledTimes(1)

    })
    it("should successfully create a product and upload its images",async()=>{
       
        const countProducts = mockProductAdminRep.countStoreProducts.mockResolvedValueOnce(5)
        const deleteProduct = mockProductAdminRep.deleteProduct.mockResolvedValueOnce('')
        spyCompress.mockResolvedValue({success:true,data:Buffer.alloc(1)})
        mockImgUpload.uploadImage.mockResolvedValue({success:true})
        spyGenerateImgPath.mockReturnValue(datas.imageUrl)
          const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
        
        await v.createProduct(datas)

        expect(countProducts).toHaveBeenCalledTimes(1)

        expect(spyCompress).toHaveBeenCalledTimes(1)
        expect(mockImgUpload.uploadImage).toHaveBeenCalledTimes(1)
        expect(mockImgUpload.uploadImage).toHaveBeenCalledWith({
            fileBuffer:expect.any(Buffer),urlPath:datas.imageUrl,
            mimeType:datas.mimeType
        })
        expect(mockProductAdminRep.createProduct).toHaveBeenCalledTimes(1)
        expect(mockProductAdminRep.createProduct).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "shirt",
                price: 55,
                stock: 5,
                storeId: 1,
                category: "shoes",
                description: "lorem",
                imageUrl: "testing",
            })
        );
        expect(deleteProduct).not.toHaveBeenCalled()
    })
    it("should retry twice and return an error when compression fails",async()=>{
       
        const countProducts = mockProductAdminRep.countStoreProducts.mockResolvedValueOnce(5)
        const deleteProduct = mockProductAdminRep.deleteProduct.mockResolvedValueOnce('')
        spyCompress.mockRejectedValueOnce({success:false,data:Buffer.alloc(1)})
        spyCompress.mockRejectedValueOnce({success:false,data:Buffer.alloc(1)})
        spyCompress.mockResolvedValue({success:true,data:Buffer.alloc(1)})
        mockImgUpload.uploadImage.mockResolvedValue({success:true})
        spyGenerateImgPath.mockReturnValue(datas.imageUrl)
          const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
        try{
            await v.createProduct(datas)
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Failed to compress.")
            expect(err.action).toEqual("compressImage")
            expect(err.service).toEqual("ProductAdminService")
            expect(err.status).toEqual(500)
            
        }
        expect(countProducts).toHaveBeenCalledTimes(1)

        expect(spyCompress).toHaveBeenCalledTimes(2)
        expect(mockImgUpload.uploadImage).toHaveBeenCalledTimes(0)
        expect(mockImgUpload.uploadImage).not.toHaveBeenCalled()
        expect(mockProductAdminRep.createProduct).not.toHaveBeenCalled()
        expect(deleteProduct).not.toHaveBeenCalled()
    })
    it("should retry twice and create the product correctly if the second attempt succeeds",async()=>{
        const deleteProduct = mockProductAdminRep.deleteProduct.mockResolvedValueOnce('')
        const countProducts = mockProductAdminRep.countStoreProducts.mockResolvedValueOnce(5)
        spyCompress.mockRejectedValueOnce({success:false,data:Buffer.alloc(1)})
        spyCompress.mockResolvedValue({success:true,data:Buffer.alloc(1)})
        spyCompress.mockResolvedValue({success:true,data:Buffer.alloc(1)})
        mockImgUpload.uploadImage.mockResolvedValue({success:true})
        spyGenerateImgPath.mockReturnValue(datas.imageUrl)
          const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
        try{
            await v.createProduct(datas)
        }catch(err:any){
            expect(err).toEqual("failed")
            
        }
        expect(countProducts).toHaveBeenCalledTimes(1)

        expect(spyCompress).toHaveBeenCalledTimes(2)
        expect(mockImgUpload.uploadImage).toHaveBeenCalledTimes(1)
    
        expect(mockProductAdminRep.createProduct).toHaveBeenCalledTimes(1)
         expect(deleteProduct).not.toHaveBeenCalled()
    })
    it("should retry twice and return an error when image upload fails",async()=>{
       
        const countProducts = mockProductAdminRep.countStoreProducts.mockResolvedValueOnce(5)
        const deleteProduct = mockProductAdminRep.deleteProduct.mockResolvedValueOnce('')
        spyCompress.mockResolvedValue({success:true,data:Buffer.alloc(1)})
        
        mockImgUpload.uploadImage.mockRejectedValueOnce({success:false})
        mockImgUpload.uploadImage.mockRejectedValueOnce({success:false})
        spyGenerateImgPath.mockReturnValue(datas.imageUrl)
          const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
        try{
            await v.createProduct(datas)
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Failed to save image.")
            expect(err.action).toEqual("uploadImage")
            expect(err.service).toEqual("ProductAdminService")
            expect(err.status).toEqual(500)
            
        }
        expect(countProducts).toHaveBeenCalledTimes(1)
        
        expect(spyCompress).toHaveBeenCalledTimes(1)
        expect(mockImgUpload.uploadImage).toHaveBeenCalledTimes(2)
        expect(mockProductAdminRep.createProduct).toHaveBeenCalledTimes(1)
        expect(deleteProduct).toHaveBeenCalledTimes(1)

    })
     it("should complete the operation when the image upload succeeds on retry",async()=>{
       
        const countProducts = mockProductAdminRep.countStoreProducts.mockResolvedValueOnce(5)
        const deleteProduct = mockProductAdminRep.deleteProduct.mockResolvedValueOnce('')
        spyCompress.mockResolvedValue({success:true,data:Buffer.alloc(1)})
        
        mockImgUpload.uploadImage.mockRejectedValueOnce({success:false})
        mockImgUpload.uploadImage.mockResolvedValue({success:true})
        spyGenerateImgPath.mockReturnValue(datas.imageUrl)
          const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
    
        await v.createProduct(datas)
      
        expect(countProducts).toHaveBeenCalledTimes(1)
        expect(mockProductAdminRep.createProduct).toHaveBeenCalledTimes(1)
        expect(spyCompress).toHaveBeenCalledTimes(1)
        expect(mockImgUpload.uploadImage).toHaveBeenCalledTimes(2)
        expect(mockProductAdminRep.createProduct).toHaveBeenCalledTimes(1)
        expect(deleteProduct).not.toHaveBeenCalledWith()

    })

})
