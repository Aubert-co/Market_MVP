import { prisma } from "@/lib/prisma";
import { AdminOrderRep } from "@/modules/storeAdmin/orders/orders.repository";
import { oneStore,cleanAllDb, createManyOrders, createUserStoreAndProducts, deleteOrders } from "@/tests/__mocks__";
import { orders } from "@/tests/__fixtures__/orders";

const admin = new AdminOrderRep(prisma)
describe('AdminOrderRep search',()=>{
    beforeAll(async()=>{
        await createUserStoreAndProducts()
        await createManyOrders(orders)
    })
    afterAll(async()=>{
        await deleteOrders()
        await cleanAllDb()
    })
    it("should skip 1 item, order by latest created, and return a maximum of 5 items",async()=>{
        const storeId = oneStore.id 
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:1,limit:5}
        })
        expect(values.datas).toHaveLength(5)
        expect(values.datas[0].id).toEqual(9)
       
    })
    it("should skip 1 items, order by recent created, and return a maximum of 5 items",async()=>{
        const storeId = oneStore.id 
        const values = await admin.search({
            storeId,orderBy:'asc',pagination:{skip:1,limit:5}
        })
        expect(values.datas).toHaveLength(5)
        expect(values.datas[0].id).toEqual(2)
       
    })
    it("should filter by product id",async()=>{
        const storeId = oneStore.id 
        const values = await admin.search({
            storeId,orderBy:'desc',pagination:{skip:0,limit:5},search:1
        })
        expect(values.datas).toHaveLength(1)
        const { couponId, productId, userId, ...object } = orders[0]

        expect(values.datas[0]).toMatchObject(object)
       
    })
    
})