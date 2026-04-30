import app from "@/serve";
import supertest from "supertest";
import { generateAccessToken } from "@/helpers/AuthTokens";
import { ProductAdminService } from "@/modules/storeAdmin/products/products.services";
import { VerifyStoreOwnership } from "@/middleware/verifyStoreOwnership"
const cookies =  generateAccessToken(1)
const spyService = jest.spyOn(ProductAdminService.prototype,'getStoreProducts')
let checkStore = jest.spyOn(VerifyStoreOwnership.prototype,'handler')


describe("getStoreProducts",()=>{
      beforeEach(()=>{
        checkStore.mockImplementation(async(req, res, next) => {
            next(); 
        });
    })
    it("should call the service with all query params correctly",async()=>{
        const response = await supertest(app)
        .get('/api/stores/1/products?page=15&search=shirt&category=Roupas&orderBy=asc&limit=10')
        .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual('Success')
        expect(response.status).toEqual(200)
        expect(spyService).toHaveBeenCalledWith({
            search: "shirt",
            category: "Roupas",
            orderBy: "asc",
            take: 10,
            page: 15,
            storeId:1
        })
    }) 
    it("should call the service correctly when no query params are provided",async()=>{
        spyService.mockResolvedValue({datas:[],pagination:{
            totalPages:5,skip:1,currentPage:1
        }})
        const response = await supertest(app)
        .get('/api/stores/1/products')
        .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual('Success')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toEqual([])
        expect(response.body.pagination).toEqual({
            totalPages:5,skip:1,currentPage:1
        })
        expect(spyService).toHaveBeenCalledWith({
            search: undefined, 
            category: undefined,
            orderBy: "desc",
            take: 5,
            page: 1,
            storeId:1
        })
    }) 
     it("should return an error when an invalid category is provided",async()=>{
        const response = await supertest(app)
        .get('/api/stores/1/products?search=shirt&category=test')
        .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual('Invalid category. Please check and try again.')
        expect(response.status).toEqual(422)
        expect(spyService).not.toHaveBeenCalled()
    }) 
      it("should return an error when an invalid search is provided",async()=>{
        const response = await supertest(app)
        .get('/api/stores/1/products?search=3&category=test')
        .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual('Invalid search. Please check and try again.')
        expect(response.status).toEqual(422)
        expect(spyService).not.toHaveBeenCalled()
    }) 
})