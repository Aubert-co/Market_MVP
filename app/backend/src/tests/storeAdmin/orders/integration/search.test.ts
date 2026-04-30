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

const endpoint = (storeId:number)=>`/api/stores/${storeId}/orders`
describe('search integration tests', () => {
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
        .get(endpoint(1))
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Access Denied')
    })
     it("should return an error when the user doesn't have that store",async()=>{
       
        const response = await request(app)
        .get(endpoint(5))
        .set('Cookie', [`token=${cookies}`])
        expect(response.status).toEqual(403)
        expect(response.body.message).toEqual('You do not have permission to access this store.')
       
    })
})

describe('search service (mocked)',()=>{
    

    const mocks = jest.spyOn(AdminOrderService.prototype,'searchOrders')
    
    beforeAll(()=>{
        
        jest.clearAllMocks()
    })
    beforeEach(()=>{
        jest.clearAllMocks()
        const mockStoreMiddle = jest
            .spyOn(VerifyStoreOwnership.prototype, 'handler')
            .mockImplementation(async(req:Request, res:Response, next:NextFunction) => {
                next()
            })
    })
     it("should call the service with the correct parameters",async()=>{

        mocks.mockResolvedValue({datas:[],pagination:{currentPage:1,totalPages:10,skip:0}})
        const response = await request(app)
        .get(`${endpoint(store.id)}?orderId=1&orderby=invalid&status=completed&limit=e1`)
        .set('Cookie', [`token=${cookies}`])
      
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body).toHaveProperty('pagination')
        expect(response.body.datas).toEqual([])

        expect(mocks).toHaveBeenCalledTimes(1)
        expect(mocks).toHaveBeenCalledWith({
            limit:5,page:1,
            storeId:store.id,searchByOrderId:1,status:undefined,
            orderBy:"desc"
        })
    })
    it("should return an error when orderId is an invalid number",async()=>{

        mocks.mockResolvedValue({datas:[],pagination:{currentPage:1,totalPages:10,skip:0}})
        const response = await request(app)
        .get(`${endpoint(store.id)}?orderId=1es&orderby=invalid&status=completed&limit=e1`)
        .set('Cookie', [`token=${cookies}`])
      
        expect(response.status).toEqual(400)
        expect(response.body).not.toHaveProperty('datas')
        expect(response.body.message).toEqual("Invalid orderId. It must be a valid integer.")
        expect(response.body).not.toHaveProperty('pagination')

        expect(mocks).not.toHaveBeenCalled()
      
    })
     it("should return 500 when the service throws an error",async()=>{

        mocks.mockRejectedValueOnce(new Error('error'))
        const response = await request(app)
        .get(`${endpoint(store.id)}?orderId=1&orderby=invalid&status=completed&limit=e1`)
        .set('Cookie', [`token=${cookies}`])
      
        expect(response.status).toEqual(500)
        expect(response.body.message).toEqual('An unexpected error occurred. Please try again later.')
        expect(response.body).not.toHaveProperty('datas')
        expect(response.body).not.toHaveProperty('pagination')

        expect(mocks).toHaveBeenCalledTimes(1)
       
      
    })
})