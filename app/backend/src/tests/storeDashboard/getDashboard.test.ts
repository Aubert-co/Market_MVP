import request from "supertest"

import app from "../../serve"

import { prisma } from "../../lib/prisma"
import { cleanAllDb, createOrders, createUserStoreAndProducts, createViews, deleteOrders,deleteViews } from "../__mocks__"
import { generateAccessToken } from '../../helpers/AuthTokens'
import { orders } from "../__fixtures__/orders"
import { views } from "../__fixtures__/views"
const storeId = 1
const cookies =  generateAccessToken(1)

describe("get /store/dashboard/:storeId",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })
   
    beforeAll(async()=>{
        await createUserStoreAndProducts()
        await createOrders()
        await createViews()
    })
    afterAll(async()=>{
        await deleteViews()
        await deleteOrders()
        await cleanAllDb()
    })
    it("should get the store dashboard correctly",async()=>{
        const response = await request(app)
        .get(`/store/dashboard/${storeId}`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
     
        const getOrders = response.body.datas.orders

        expect(getOrders.cancelled).toEqual(
            orders.filter(val => val.status === "cancelled").length
        )
        expect( getOrders.completed).toEqual(
            orders.filter(val=>val.status==="completed").length
        )
        expect( getOrders.pending).toEqual(
            orders.filter(val=>val.status==="pending").length
        )
        expect( getOrders.lastPending).toHaveLength(
            orders.filter(val=>val.status==="pending").length -2
        )
        expect(response.body.datas.views.total).toEqual(
            views.length
        )
    })
    it("should return the other data normally when count throws an error, and it should return 0",async()=>{
        jest.spyOn(prisma.order,'count').mockRejectedValue(10)
        const response = await request(app)
        .get(`/store/dashboard/${storeId}`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
     
        const getOrders = response.body.datas.orders

        expect(getOrders.cancelled).toEqual(0)
        expect( getOrders.completed).toEqual(0)
        expect( getOrders.pending).toEqual(0)
        expect( getOrders.lastPending).toHaveLength(
            orders.filter(val=>val.status==="pending").length -2
        )
        expect(response.body.datas.views.total).toEqual(
            views.length
        )
    })
     it("should return the data normally when the view throws an error, and the views should return 0",async()=>{
        jest.spyOn(prisma.view,'count').mockRejectedValue(10)
       const response = await request(app)
        .get(`/store/dashboard/${storeId}`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
     
        const getOrders = response.body.datas.orders

        expect(getOrders.cancelled).toEqual(
            orders.filter(val => val.status === "cancelled").length
        )
        expect( getOrders.completed).toEqual(
            orders.filter(val=>val.status==="completed").length
        )
        expect( getOrders.pending).toEqual(
            orders.filter(val=>val.status==="pending").length
        )
        expect( getOrders.lastPending).toHaveLength(
            orders.filter(val=>val.status==="pending").length -2
        )
        expect(response.body.datas.views.total).toEqual(0)
    })
    it("should return the data normally when findMany throws an error and it should return []",async()=>{
        jest.spyOn(prisma.order,'findMany').mockRejectedValue([])
        const response = await request(app)
        .get(`/store/dashboard/${storeId}`)
        .set('Cookie', [`token=${cookies}`])
         
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
     
        const getOrders = response.body.datas.orders

        expect(getOrders.cancelled).toEqual(
            orders.filter(val => val.status === "cancelled").length
        )
        expect( getOrders.completed).toEqual(
            orders.filter(val=>val.status==="completed").length
        )
        expect( getOrders.pending).toEqual(
            orders.filter(val=>val.status==="pending").length
        )
        expect( getOrders.lastPending).toEqual([])
        expect(response.body.datas.views.total).toEqual(
            views.length
        )
    })
})