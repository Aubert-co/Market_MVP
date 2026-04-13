import { prisma } from "@/lib/prisma";
import { AdminOrderRep } from "@/modules/storeAdmin/orders/orders.repository";
import { oneStore,cleanAllDb, createManyOrders, createUserStoreAndProducts, deleteOrders, createCoupons, creatManyUsersStoresAndProducts, cleanCoupons } from "@/tests/__mocks__";
import { orders } from "@/tests/__fixtures__/orders";
import { couponsDatas } from "@/tests/__fixtures__/coupons";
import {checkSearchReturn,checkLastOrdersReturn,isProductFromStore} from "./utils"

const admin = new AdminOrderRep(prisma)
export const storeId = oneStore.id

describe('AdminOrderRep search',()=>{
    beforeAll(async()=>{
        await createUserStoreAndProducts()
        await createManyOrders(orders)
    })
    afterAll(async()=>{
        await deleteOrders()
        await cleanAllDb()
    })
    it("Should skip 1 item, sort by creation date (descending), and return up to 5 items.",async()=>{
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:1,limit:5}
        })
        expect(values.datas).toHaveLength(5)
        expect(values.datas[0].id).toEqual(orders[orders.length-2].id)
      
        checkSearchReturn(values.datas)
        isProductFromStore(values.datas)
    })
    it("should skip 1 item, sort by creation date ascending, and return up to 5 items",async()=>{
        const values = await admin.search({
            storeId,orderBy:'asc',pagination:{skip:1,limit:5}
        })
        expect(values.datas).toHaveLength(5)
        expect(values.datas[0].id).toEqual(2)
        checkSearchReturn(values.datas)
        isProductFromStore(values.datas)
    })
    it("should filter by orderId",async()=>{
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:0,limit:5},searchByOrderId:orders[0].id
        })
      
        expect(values.datas).toHaveLength(1)
        isProductFromStore(values.datas)
        const { couponId, productId, userId, ...object } = orders[0]
        
        expect(values.datas[0]).toMatchObject(object)
        expect(values).toHaveProperty('datas')
        expect(values).toHaveProperty('pageInfo')
        expect(values.pageInfo).toHaveProperty('totalItems')
        expect(values.pageInfo.totalItems).toEqual(1)
        checkSearchReturn(values.datas)
        isProductFromStore(values.datas)
    })
     it("should return an empty array when no results are found",async()=>{
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:0,limit:5},searchByOrderId:50
        })
      
        expect(values.datas).toHaveLength(0)
        expect(values).toHaveProperty('datas')
        expect(values).toHaveProperty('pageInfo')
        expect(values.pageInfo).toHaveProperty('totalItems')
        expect(values.pageInfo.totalItems).toEqual(0)
        expect(values.datas).toEqual([])
        isProductFromStore(values.datas)
    })
    it("should return results filtered by status 'completed'",async()=>{
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:0,limit:10},status:'completed'
        })
        expect(values.datas).toHaveLength(
            orders.filter((val)=>val.status==="completed").length
        )
        checkSearchReturn(values.datas)
        isProductFromStore(values.datas)
    })
    it("should return results filtered by status 'cancelled'",async()=>{
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:0,limit:10},status:'cancelled'
        })
        expect(values.datas).toHaveLength(
            orders.filter((val)=>val.status==="cancelled").length
        )
        checkSearchReturn(values.datas)
        isProductFromStore(values.datas)
    })
     it("should return results filtered by status 'pending'",async()=>{
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:0,limit:15},status:'pending'
        })
        expect(values.datas).toHaveLength(
            orders.filter((val)=>val.status==="pending").length
        )
        checkSearchReturn(values.datas)
        isProductFromStore(values.datas)
    })
})

describe("getLastOrders",()=>{
    beforeAll(async()=>{
        const {validCoupons} = couponsDatas(2)
        
        const ordersWithCouponId = orders.map((val,index)=>{
            let couponId = validCoupons[index]?.id ?? null
            return {...val,couponId,userId:3}  
        }) 
        await creatManyUsersStoresAndProducts()
        await createCoupons(validCoupons)
        await createManyOrders(ordersWithCouponId)
        
    })
    afterAll(async()=>{
        await cleanCoupons()
        await deleteOrders()
        await cleanAllDb()
    })
    it("should retrieve orders from the correct store with the correct products and expected properties",async()=>{
        const lastOrders = await admin.getLastOrders(storeId)
        isProductFromStore(lastOrders)
        
        expect(lastOrders).toHaveLength(5)
         
        checkLastOrdersReturn(lastOrders)
        
    })
       it("should return an empty array when the store has no orders",async()=>{
        const lastOrders = await admin.getLastOrders(50)
        isProductFromStore(lastOrders)
        
        expect(lastOrders).toHaveLength(0)
        
    })
})