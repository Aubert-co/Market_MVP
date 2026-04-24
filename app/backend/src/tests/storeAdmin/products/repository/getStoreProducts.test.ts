import { prisma } from "@/lib/prisma"
import { ProductAdminRepository } from "@/modules/storeAdmin/products/products.repository"
import { productsByStore } from "@/tests/__fixtures__/products"
import { stores } from "@/tests/__fixtures__/stores"
import { cleanAllDb, createViews, creatManyUsersStoresAndProducts, deleteViews } from "@/tests/__mocks__"



let  admin = new ProductAdminRepository(prisma)
describe("ProductAdminRepository getStoresProducts",()=>{
    beforeEach(async()=>{
        await creatManyUsersStoresAndProducts()
        await createViews()
    })
    afterEach(async()=>{
        await deleteViews()
        await cleanAllDb()
    })
    it("should return only products from the correct store",async()=>{
        const result = await admin.getStoresProducts({
            storeId:stores[0].id,
            orderBy:'desc',
            take:5,
            skip:0
        })
        expect(result).toHaveProperty('datas')
        expect(result).toHaveProperty('pageInfo')
        const filter =  productsByStore.filter((val)=>{
            if(val.storeId === stores[0].id)return val.storeId
        })
     
        expect(result.datas).toHaveLength(5)
        expect(result.pageInfo.totalItems).toEqual(filter.length )
    })
    it("should return only the product with the given name",async()=>{
        const result = await admin.getStoresProducts({
            storeId:stores[0].id,
            orderBy:'desc',
            take:5,
            skip:0,
            search:productsByStore[0].name
        })
        expect(result).toHaveProperty('datas')
        expect(result).toHaveProperty('pageInfo')
        
     
        expect(result.datas).toHaveLength(1)
        expect(result.pageInfo.totalItems).toEqual( 1 )
    })
    it("should return an empty array when no values match the criteria",async()=>{
          const result = await admin.getStoresProducts({
            storeId:stores[0].id,
            orderBy:'desc',
            take:5,
            skip:0,
            search:'lotem irpsue te'
        })
        expect(result).toHaveProperty('datas')
        expect(result).toHaveProperty('pageInfo')
        
     
        expect(result.datas).toHaveLength(0)
        expect(result.pageInfo.totalItems).toEqual( 0 )
    })
    it("should return only products that match the categories",async()=>{
          const result = await admin.getStoresProducts({
            storeId:stores[0].id,
            orderBy:'desc',
            take:5,
            skip:0,
            category:productsByStore[0].category
        })
        expect(result).toHaveProperty('datas')
        expect(result).toHaveProperty('pageInfo')
        
        const filter = productsByStore.filter((val)=>{
            if(val.storeId === stores[0].id && val.category === productsByStore[0].category)return val
        })
    
        expect(result.datas).toHaveLength(filter.length)
        expect(result.pageInfo.totalItems).toEqual( filter.length )
    })
})