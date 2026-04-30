import request from "supertest"
import app from "@/serve"
import { cleanAllDb,createUserStoreAndProducts } from "@/tests/__mocks__"
import { prisma } from '@/lib/prisma'
import { generateAccessToken } from '@/helpers/AuthTokens'


const cookies  = generateAccessToken(1)
const endpoint = (storeId:number)=>`/api/stores${storeId}/products`
describe.skip("GET /api/stores/:storeId/products?page=number",()=>{
    beforeAll(async()=>{
        await cleanAllDb()
        await createUserStoreAndProducts()
    })
    it("Should successfully return the data when a valid storeId and page parameter are provided",async()=>{
        const response = await request(app)
        .get(`${endpoint(1)}?page=0`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        
        
        
        expect(response.body.currentPage).toEqual(1)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
      
    })
    it("Should render the last page when a page number greater than the total available pages is provided",async()=>{
        const response = await request(app)
        .get(`${endpoint(1)}?page=30`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        
        
        
        expect(response.body.currentPage).toEqual(2)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
      
    })
    it("Should render the first page when an invalid page number is provided",async()=>{
        const response = await request(app)
        .get(`${endpoint(1)}?page=30e`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        
        
        
        expect(response.body.currentPage).toEqual(1)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
      
    })
})

describe.skip("GET /api/stores/:storeId/products?page=number db erros",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    
    it("should return an error when an error occurs in the count method",async()=>{
        jest.spyOn(prisma.product,'findMany').mockRejectedValueOnce
        (new Error('Simulated DB error: Connection lost.'));
  
        const response = await request(app)
        .get(`${endpoint(1)}?page=3`)
        .set('Cookie', [`token=${cookies}`])
          
        expect(response.status).toEqual(500)
        expect(response.body.message).toEqual('Failed to get products')
    })
    it("should return an error when an error occurs in the count method",async()=>{
        jest.spyOn(prisma.product,'count').mockRejectedValue(new Error('Simulated DB error: Connection lost.'));

        const response = await request(app)
        .get(`${endpoint(1)}?page=3`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.status).toEqual(200)
        expect( response.body.datas).toEqual([])
        expect(response.body.message).toEqual('Sucess')
          
        
    })
})