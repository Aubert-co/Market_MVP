import app from "@/serve"
import supertest from "supertest"
import { VerifyStoreOwnership } from "@/middleware/verifyStoreOwnership"
import { generateAccessToken } from "@/helpers/AuthTokens"
import { ProductAdminRepository } from "@/modules/storeAdmin/products/products.repository"
let checkStore = jest.spyOn(VerifyStoreOwnership.prototype,'handler')
const cookies =  generateAccessToken(1)

const productMostViewed = {
  id: 1,
  name: "Nike Air Max",
  imageUrl: "https://example.com/image.png",
  category: "shoes",
  _count: {
    views: 120
  }
};
describe("api /stores/:storeId/products/most-viewed",()=>{
    const storeId = 3 
    beforeEach(()=>{
        checkStore.mockImplementation(async(req, res, next) => {
            next(); 
        });
    })
    it("should return an empty array",async()=>{
    
        const response = await supertest(app)
        .get(`/stores/${storeId}/products/most-viewed`)
        .set('Cookie', [`token=${cookies}`])
        expect(response.body.message).toEqual("Success")
        expect(response.statusCode).toEqual(200)
        
        expect(response.body.datas).toEqual([])
    })
     it("should successfully return the data",async()=>{
        jest.spyOn(ProductAdminRepository.prototype,'productMostViewed')
        .mockResolvedValue([productMostViewed])
        
    
        const response = await supertest(app)
        .get(`/stores/${storeId}/products/most-viewed`)
        .set('Cookie', [`token=${cookies}`])
        expect(response.body.message).toEqual("Success")
        expect(response.statusCode).toEqual(200)
        
        expect(response.body.datas).toHaveLength(1)
        expect(response.body.datas[0]).toHaveProperty('_count')
        expect(response.body.datas[0]).toHaveProperty('id')
        expect(response.body.datas[0]).toHaveProperty('name')
        expect(response.body.datas[0]).toHaveProperty('imageUrl')
    })
    it("should handle the error successfully when the database throws an error",async()=>{
        jest.spyOn(ProductAdminRepository.prototype,'productMostViewed')
        .mockRejectedValueOnce(new Error("error"))
     
        const response = await supertest(app)
        .get(`/stores/${storeId}/products/most-viewed`)
        .set('Cookie', [`token=${cookies}`])
        expect(response.body.message).toEqual("Failed to get store most viewd products.")
        expect(response.statusCode).toEqual(500)
        
        expect(response.body).not.toHaveProperty('datas')
    })
})