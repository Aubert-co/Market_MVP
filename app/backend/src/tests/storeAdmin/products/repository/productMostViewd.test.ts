import { ErrorMessage } from "@/helpers/ErrorMessage"
import { prisma } from "@/lib/prisma"
import { ProductAdminRepository } from "@/modules/storeAdmin/products/products.repository"
import { stores } from "@/tests/__fixtures__/stores"
import { cleanAllDb, createOneStore, createOneUser, createViews, creatManyUsersStoresAndProducts, deleteProduct, deleteStore, deleteUser, deleteViews } from "@/tests/__mocks__"





let  admin = new ProductAdminRepository(prisma)
describe("ProductAdminRepository createProduct",()=>{
    beforeEach(async()=>{
        await creatManyUsersStoresAndProducts()
        await createViews()
    })
    afterEach(async()=>{
        await deleteViews()
        await cleanAllDb()
    })
    it("should return the most viewd products",async()=>{
        const result = await admin.productMostViewd(stores[0].id)
        console.log(result)
        expect(result).toHaveLength(5)
    })
})