import {VerifyStoreOwnership} from '../../middleware/verifyStoreOwnership'

import { Request, Response, NextFunction } from 'express';

const userId = 1
describe("VerifyStoreOwnership",()=>{
    let request:Partial<Request>
    let response:Partial<Response>
    let next:Partial<NextFunction>
    let store:any
     beforeEach(()=>{
            
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
        })
    it("Should call the next function when a valid params is sent",async()=>{
            store.checkOwnerShip.mockResolvedValue(true)
            
            request.body = {'storeId':''}
            request.params ={'storeId':'35'}
            const verify  = new VerifyStoreOwnership( store )
            await verify.handler(request as Request,response as Response,next as NextFunction)
            expect( store.checkOwnerShip ).toHaveBeenCalledWith(35,userId)
            expect(next).toHaveBeenCalledTimes(1)
       
    })
    it("Should return an error message when neither body nor params are provided",async()=>{
        store.checkOwnerShip.mockResolvedValue(true)
        
        request.body = {'storeId':''}
        request.params ={'storeId':''}
        const verify  = new VerifyStoreOwnership( store )
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).not.toHaveBeenCalled()
        expect(response.send).toHaveBeenCalledWith({message:"Invalid store ID."})
    })
    it("Should call the next function when a valid body is sent",async()=>{
        store.checkOwnerShip.mockResolvedValue(true)
        
        request.body = {'storeId':'45'}
        request.params ={'storeId':''}
        const verify  = new VerifyStoreOwnership( store )
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( next ).toHaveBeenCalledTimes(1) 
    })
     it("Should return an error message when the user doesn't have that store in the body",async()=>{
        store.checkOwnerShip.mockResolvedValue(false)
        
        request.body = {'storeId':'45'}
        request.params ={'storeId':''}
        const verify  = new VerifyStoreOwnership( store )
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( response.send).toHaveBeenCalledWith({message:'You do not have permission to access this store.'})
    })
     it("Should return an error message when the user doesn't have that store in the params",async()=>{
        store.checkOwnerShip.mockResolvedValue(false)
        
        request.body = {'storeId':''}
        request.params ={'storeId':'45'}
        const verify  = new VerifyStoreOwnership( store )
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( response.send).toHaveBeenCalledWith({message:'You do not have permission to access this store.'})
    })
      it("should return an error message when an error occurs in the database",async()=>{
        store.checkOwnerShip.mockRejectedValueOnce(new Error("failed"))
        request.body = {'storeId':''}
        request.params ={'storeId':'45'}
        const verify  = new VerifyStoreOwnership( store )
        await verify.handler(request as Request,response as Response,next as NextFunction)
        expect( store.checkOwnerShip ).toHaveBeenCalledWith(45,userId)
        expect( response.send).toHaveBeenCalledWith({message:'An unexpected error occurred.'})
    })
})