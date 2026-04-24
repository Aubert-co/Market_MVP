import {  ProductAdminService } from "@/modules/storeAdmin/products/products.services"
import { mockImgUpload, mockProductAdminRep } from "../utils"
import { GetStoreProductsPage } from "@/modules/storeAdmin/products/products.types"




describe("service getStoreProducts",()=>{
    const datas = {
        storeId:3,category:"shirt",orderBy:"desc",search:"name",
        take:5,page:2
    } satisfies GetStoreProductsPage
    const returnDatas = ["test"]
    it("should successfully call the repository and return the data and pagination correctly",async()=>{
        mockProductAdminRep.getStoreProducts.mockResolvedValue({
            datas:returnDatas,
            pageInfo:{
                totalItems:30
            }
        })
        const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
        
        const result = await v.getStoreProducts(datas)

        expect(mockProductAdminRep.getStoreProducts).toHaveBeenCalledTimes(1)
        expect(mockProductAdminRep.getStoreProducts).toHaveBeenCalledWith({
            storeId:3,category:"shirt",orderBy:"desc",search:"name",take:5,skip:5
        })
        expect(result.datas).toEqual(returnDatas)
        expect(result.pagination.totalPages).toEqual(30/5)
        expect(result.pagination.currentPage).toEqual(2)
        expect(result.pagination.skip).toEqual(5)
    })
    it("should handle an error correctly",async()=>{
        mockProductAdminRep.getStoreProducts.mockReturnValue(new Error("hi"))
        const v = new ProductAdminService(mockProductAdminRep,mockImgUpload)
        
        try{
            await v.getStoreProducts(datas)
        }catch(err:any){
            expect(err.message).toEqual("Failed to get store products.")
            expect(err.status).toEqual(500)
            expect(err.action).toEqual("getStoresProducts")
            expect(err.service).toEqual("ProductAdminService")
        }
      
    })
})