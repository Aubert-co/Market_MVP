import { generateAccessToken } from '@/helpers/AuthTokens'
import app from '@/serve'
import { cleanAllDb, createManyOrders, creatManyUsersStoresAndProducts, deleteOrders } from '@/tests/__mocks__'
import request from 'supertest'
import { manyUsers } from '@/tests/__fixtures__/users'
import { stores } from '@/tests/__fixtures__/stores'
import { orders } from '@/tests/__fixtures__/orders'
import { AdminOrderService } from '@/modules/storeAdmin/orders/orders.services'
import { VerifyStoreOwnership } from '@/middleware/verifyStoreOwnership'
import { NextFunction, Request, Response } from 'express'

const [user] = manyUsers
const [store] = stores
const cookies = generateAccessToken(user.id)

describe('getLastOrders database tests', () => {
    beforeAll(async()=>{
        await creatManyUsersStoresAndProducts()
        await createManyOrders(orders)
    }) 
    afterAll(async()=>{
        await deleteOrders()
        await cleanAllDb()
      
    })
    it("should return an error when the user is not authenticated",async()=>{
        const response = await request(app)
        .get(`/stores/${store.id}/lastOrders`)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Access Denied')
    })
     it("should return an error when the user doesn't have that store",async()=>{
       
        const response = await request(app)
        .get('/stores/5/lastOrders')
        .set('Cookie', [`token=${cookies}`])
        expect(response.body.message).toEqual('You do not have permission to access this store.')
        expect(response.status).toEqual(403)
       
       
    })
})

describe('getLastOrders service (mocked)', () => {
   const mocks = jest.spyOn(AdminOrderService.prototype,'getLastOrders')
    
    
    beforeEach(()=>{
        jest.clearAllMocks()
        const mockStoreMiddle = jest
        .spyOn(VerifyStoreOwnership.prototype, 'handler')
        .mockImplementation(async(req:Request, res:Response, next:NextFunction) => {
            next()
        })
    })
    
     it("should successfully return the correct object from the service",async()=>{
        const datas  = [
        {
            id: 1,
            productId: 1,
            total: 100,
            quantity: 2,
            price: 50,
            status: 'completed',
            createdAt: new Date(),
            product: {
            name: 'Produto Teste',
            imageUrl: 'https://example.com/image.png'
            }
        }
        ]
        mocks.mockResolvedValue( datas )
        const response = await request(app)
        .get(`/stores/${store.id}/lastOrders`)
        .set('Cookie', [`token=${cookies}`])

        expect(mocks).toHaveBeenCalledTimes(1)
        expect(mocks).toHaveBeenCalledWith(store.id)
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Success')
        expect(response.body.datas).toMatchObject(
        datas.map(item => ({
            ...item,
            createdAt: item.createdAt.toISOString()
        }))
        )
       
       
    })
    it("should return 500 when the service throws an error",async()=>{
        
        mocks.mockRejectedValue(new Error("error"))
        const response = await request(app)
        .get(`/stores/${store.id}/lastOrders`)
        .set('Cookie', [`token=${cookies}`])

        expect(mocks).toHaveBeenCalledTimes(1)
        expect(mocks).toHaveBeenCalledWith(store.id)
        expect(response.status).toEqual(500)
        expect(response.body.message).toEqual('An unexpected error occurred. Please try again later.')
       
      
       
       
    })
})

