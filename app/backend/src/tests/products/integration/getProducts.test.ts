import request from 'supertest'
import redis from '../../../config/cache/redis'
import app from '../../../serve'
import { cleanAllDb, createUserStoreAndProducts } from '../../__mocks__'
import { prisma } from '../../../database/prisma'
import { RedisRepository } from '../../../config/cache/redis.repository'
import { CacheProducts } from '@/modules/products/cache/product.cache'


const redisRep = new RedisRepository(redis)
const cacheProducts = new CacheProducts(redisRep)
const endpoint = (page:number)=>`/api/product?page=${page}`
describe("db actions",()=>{
    beforeAll(async()=>{
        await cleanAllDb()
        await createUserStoreAndProducts()
    })
    beforeEach(async()=>{
        try{ 
            await redis.flushAll()
            
        }catch(err:any){
            throw new Error('Algo deu errado ao limpar o redis'+err.message)
        }
    })
    it("should return 10 products with currentPage = 1 and totalPages = 2 when there are 20 products in the database. If page = 0 is sent, it should default to page 1",async()=>{
        const redisIncr = jest.spyOn(redis,'incr')
        const response = await request(app)
        .get(endpoint(0))
        
          
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(1)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
        expect( redisIncr).toHaveBeenCalledTimes(1)
    })
    it("should return the second page when it is requested.",async()=>{
        const response = await request(app)
        .get(endpoint(2))
        
          expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
       
        expect(response.body.currentPage).toEqual(2)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
    })
    it("should return the last page when a page number greater than the total number of pages is requested.",async()=>{
        const response = await request(app)
        .get(endpoint(10))
        
         
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(2)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
    })
      it("should cache on first request, delete cache, then save 4 times and increment 3 times",async()=>{
        
        const redisIncr = jest.spyOn(redis,'incr')
        const redisSet = jest.spyOn(redis,'set')
        const response1 = await request(app)
        .get(endpoint(1))
        

        expect(response1.status).toEqual(200)
        expect(response1.body.message).toEqual('Sucess')
        expect(response1.body.currentPage).toEqual(1)
        expect(response1.body.totalPages).toEqual(2)
        expect(response1.body.datas).toHaveLength(10)
        expect(response1.body.fromCache).toBeFalsy()
        
        await cacheProducts.cleanProductsCache()
        for(let i =0;i<10;i++){
            await request(app)
            .get(endpoint(1))
        }
        const response2 = await request(app)
        .get(endpoint(1))
        

        expect(response2.status).toEqual(200)
        expect(response2.body.message).toEqual('Sucess')
        expect(response2.body.currentPage).toEqual(1)
        expect(response2.body.totalPages).toEqual(2)
        expect(response2.body.datas).toHaveLength(10)
        expect(response2.body.fromCache).toBeTruthy()
       
        expect(redisIncr).toHaveBeenCalledTimes(3)
        expect(redisSet).toHaveBeenCalledTimes(4)
        expect(redisSet.mock.calls[0]).toEqual([
            "count:all:products",
            "20",
            {
                expiration: {
                type: "EX",
                value: 3600,
                },
            },
        ])
        expect(redisSet.mock.calls[1][0]).toBe("products:v1:page:1")
    })
    
})

describe("When saves values in cache",()=>{
    beforeAll(()=>{
        jest.clearAllMocks()
    })
    beforeEach (async()=>{
        await redis.flushAll()
       
    })
    
    it("should retrieve the value from cache when the page is already cached",async()=>{
        const response1 = await request(app)
        .get(endpoint(1))
        const response = await request(app)
        .get(endpoint(1))
        
        expect(response1.status).toEqual(200)
        expect(response1.body.fromCache).toBeFalsy()
        expect(response1.body.currentPage).toEqual(1)
        expect(response1.body.totalPages).toEqual(2)
        expect(response1.body.datas).toHaveLength(10)

        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(1)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeTruthy()
      
    })
   
    it("should not return cached values when an error occurs while trying to access the cache",async()=>{
        jest.spyOn(redis,'get').mockRejectedValue(new Error('Simulated DB error: Connection lost.'));
        const response1 = await request(app)
        .get(endpoint(1))
        const response = await request(app)
        .get(endpoint(1))
        
        expect(response1.status).toEqual(200)
        expect(response1.body.fromCache).toBeFalsy()
        expect(response1.body.currentPage).toEqual(1)
        expect(response1.body.totalPages).toEqual(2)
        expect(response1.body.datas).toHaveLength(10)

        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(1)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
      
    })
    it("should send the data normally when an error occurs in the cache",async()=>{
        let prisma:any
        let redis:any
       
        
        jest.spyOn(redisRep,'getCachedItem').mockRejectedValue(new Error('Simulated DB error: Connection lost.'));
        const response1 = await request(app)
        .get(endpoint(1))
        const response = await request(app)
        .get(endpoint(1))
        
        expect(response1.status).toEqual(200)
        expect(response1.body.fromCache).toBeFalsy()
        expect(response1.body.currentPage).toEqual(1)
        expect(response1.body.totalPages).toEqual(2)
        expect(response1.body.datas).toHaveLength(10)

        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(1)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
      
    })
     it("should return the data from the highest available page when the requested page exceeds the total number of page",async()=>{
        const response1 = await request(app)
        .get(endpoint(2))
        const response = await request(app)
        .get(endpoint(20))
        
         
        expect(response1.status).toEqual(200)
        expect(response1.body.fromCache).toBeFalsy()
        expect(response1.body.currentPage).toEqual(2)
        expect(response1.body.totalPages).toEqual(2)
        expect(response1.body.datas).toHaveLength(10)

        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(2)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
         
    })
    
})

describe("db errors",()=>{
    
    it("should return an error when a database error occurs",async()=>{
        jest.spyOn(prisma,'$transaction').mockRejectedValueOnce(new Error('Simulated DB error: Connection lost.'));
        
        const response = await request(app)
        .get('/api/product?page=1')
         expect(response.body.message).toEqual('An unexpected error occurred. Please try again later.')
        expect(response.status).toEqual(500)
       
       
        
    })
})