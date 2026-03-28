import {VerifyStoreOwnership} from '../../middleware/verifyStoreOwnership'

import { Request, Response, NextFunction } from 'express';

const userId = 1
let request:Partial<Request>
let response:Partial<Response>
let next:Partial<NextFunction>
let store:any
let redisService = {
    getCountProductInCache:jest.fn(),
    saveProductInCache:jest.fn(),
    saveCountProductsInCache:jest.fn(),
    getProductInCache:jest.fn(),
    getcachedStoreId:jest.fn(),
    saveItemsCache:jest.fn()
}

request = {
    headers: {},
    body: {},
    params: {},
    query: {},
    user: userId
}  

response = {

status: jest.fn().mockReturnThis(),
json: jest.fn(),
send: jest.fn(),

};
next = jest.fn();
store ={ checkOwnerShip:jest.fn() }
describe("VerifyStoreOwnership",()=>{
   
    beforeEach(()=>{
        jest.clearAllMocks()
    })
     it("Should call the next function when a valid body is sent",async()=>{
        store.checkOwnerShip.mockResolvedValue(true)
      
        request.body = {'storeId':'45'}
        request.params ={'storeId':''}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store,redisService )
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( next ).toHaveBeenCalledTimes(1) 
    })
    it("Should call the next function when a valid params is sent",async()=>{
        store.checkOwnerShip.mockResolvedValue(true)
          const key = `user:${userId}:store:35`
        request.body = {'storeId':''}
        request.params ={'storeId':'35'}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store,redisService )
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(35,userId)
        expect(next).toHaveBeenCalledTimes(1)
        
    })
    it("Should return an error message when neither body nor params are provided",async()=>{
        store.checkOwnerShip.mockResolvedValue(true)
        
        request.body = {'storeId':''}
        request.params ={'storeId':''}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store ,redisService)
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).not.toHaveBeenCalled()
        expect(response.send).toHaveBeenCalledWith({message:"Invalid store ID."})
    })
    
     it("Should return an error message when the user doesn't have that store in the body",async()=>{
        store.checkOwnerShip.mockResolvedValue(false)
        
        request.body = {'storeId':'45'}
        request.params ={'storeId':''}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store ,redisService)
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( response.send).toHaveBeenCalledWith({message:'You do not have permission to access this store.'})
    })
     it("Should return an error message when the user doesn't have that store in the query",async()=>{
        store.checkOwnerShip.mockResolvedValue(false)
        
        request.body = {'storeId':''}
        request.params ={'storeId':''}
        request.query = {'storeId':'45'}
        const verify  = new VerifyStoreOwnership( store ,redisService)
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( response.send).toHaveBeenCalledWith({message:'You do not have permission to access this store.'})
        expect(redisService.saveItemsCache).not.toHaveBeenCalled()
    })
     it("Should return an error message when the user doesn't have that store in the params",async()=>{
        store.checkOwnerShip.mockResolvedValue(false)
        
        request.body = {'storeId':''}
        request.params ={'storeId':'45'}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store ,redisService)
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( response.send).toHaveBeenCalledWith({message:'You do not have permission to access this store.'})
    })
     
})


describe("VerifyStoreOwnership db erros",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
     it("should return an error message when an error occurs in the database",async()=>{
        store.checkOwnerShip.mockRejectedValueOnce(new Error("failed"))
        request.body = {'storeId':''}
        request.params ={'storeId':'45'}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store ,redisService)
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( response.send).toHaveBeenCalledWith({message:'An unexpected error occurred.'})
    })
})

describe("VerifyStoreOwnership cache",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should not save the storeId in cache when it already exists",async()=>{
        const key = `user:${userId}:store:${45}`
        redisService.getcachedStoreId.mockResolvedValue({userId,storeId:45})
        request.body = {'storeId':''}
        request.params ={'storeId':'45'}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store ,redisService)
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).not.toHaveBeenCalled()
        expect( redisService.getcachedStoreId).toHaveBeenCalledWith(key)
        expect(redisService.saveItemsCache).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
    })
    
     it("should call the DB when the cache returns null",async()=>{
        redisService.getcachedStoreId.mockReturnValue(null)
        store.checkOwnerShip.mockResolvedValue(true)
        const key = `user:${userId}:store:${45}`
       
        request.body = {'storeId':''}
        request.params ={'storeId':'45'}
        request.query = {'storeId':''}
        const verify  = new VerifyStoreOwnership( store ,redisService)
        await verify.handler(request as Request,response as Response,next as NextFunction)

        expect( store.checkOwnerShip ).toHaveBeenCalled()
        expect( redisService.getcachedStoreId).toHaveBeenCalledWith(key)
        expect(redisService.saveItemsCache).toHaveBeenLastCalledWith(key,{userId,storeId:45})

        expect(next).toHaveBeenCalledTimes(1)
    })
     
})