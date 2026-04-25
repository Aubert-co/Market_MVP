import { ProductAdminService } from "@/modules/storeAdmin/products/products.services"
import { mockImgUpload, mockProductAdminRep } from "../utils"
import { ErrorMessage } from "@/helpers/ErrorMessage"

describe("service productMostViewed",()=>{
    const storeId = 3
    it("should return the most viewed product correctly",async()=>{
        mockProductAdminRep.productMostViewed.mockResolvedValue(["values"])
        const service = new ProductAdminService(mockProductAdminRep,mockImgUpload)

        const getMost = await  service.productMostViewed(storeId)

        expect(mockProductAdminRep.productMostViewed).toHaveBeenCalledTimes(1)
        expect(mockProductAdminRep.productMostViewed).toHaveBeenCalledWith(storeId)
        expect(getMost).toEqual(["values"])
    })
    it("should handle an error correctly",async()=>{
        mockProductAdminRep.productMostViewed.mockRejectedValue(new Error("error"))
        const service = new ProductAdminService(mockProductAdminRep,mockImgUpload)

        try{
            const getMost = await  service.productMostViewed(storeId)
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Failed to get store most viewd products.")
            expect(err.action).toEqual("productMostViewed")
            expect(err.status).toEqual(500)
            expect(err.service).toEqual("ProductAdminService")
        }
        expect(mockProductAdminRep.productMostViewed).toHaveBeenCalledTimes(1)
        expect(mockProductAdminRep.productMostViewed).toHaveBeenCalledWith(storeId)
    
    })
})