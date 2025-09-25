import request from 'supertest'
import redis from '../../lib/redis'
import app from '../../serve'
import { cleanAllDb, createUserStoreAndProducts } from '../__mocks__'
import { prisma } from '../../lib/prisma'

import { ProductRedisRepository } from '../../repository/redis.repository'

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
        const response = await request(app)
        .get('/product/page/0')
        
          
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(1)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
    })
    it("should return the second page when it is requested.",async()=>{
        const response = await request(app)
        .get('/product/page/2')
        
          expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
       
        expect(response.body.currentPage).toEqual(2)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
    })
    it("should return the last page when a page number greater than the total number of pages is requested.",async()=>{
        const response = await request(app)
        .get('/product/page/10')
        
         
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Sucess')
        expect(response.body.currentPage).toEqual(2)
        expect(response.body.totalPages).toEqual(2)
        expect(response.body.datas).toHaveLength(10)
        expect(response.body.fromCache).toBeFalsy()
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
        .get('/product/page/1')
        const response = await request(app)
        .get('/product/page/1')
        
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
        .get('/product/page/1')
        const response = await request(app)
        .get('/product/page/1')
        
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
       
        const RepsitoryRedis = new ProductRedisRepository(redis)
        jest.spyOn(RepsitoryRedis,'getCachedProduct').mockRejectedValue(new Error('Simulated DB error: Connection lost.'));
        const response1 = await request(app)
        .get('/product/page/1')
        const response = await request(app)
        .get('/product/page/1')
        
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
        .get('/product/page/2')
        const response = await request(app)
        .get('/product/page/20')
        
         
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
        .get('/product/page/1')
        
        expect(response.status).toEqual(500)
        expect(response.body.message).toEqual('An unexpected error occurred. Please try again later.')
       
        
    })
})