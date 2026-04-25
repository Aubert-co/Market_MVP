import { ErrorMessage } from "@/helpers/ErrorMessage"
import { prisma } from "@/lib/prisma"
import { ProductAdminRepository } from "@/modules/storeAdmin/products/products.repository"
import { stores } from "@/tests/__fixtures__/stores"
import { createOneStore, createOneUser, creatManyUsersStoresAndProducts, deleteProduct, deleteStore, deleteUser } from "@/tests/__mocks__"





let  admin = new ProductAdminRepository(prisma)
describe("ProductAdminRepository createProduct",()=>{
    beforeEach(async()=>{
        await createOneUser()
        await createOneStore()
    })
    afterEach(async()=>{
        await deleteProduct()
        await deleteStore()
        await deleteUser() 
    })
    it("should successfuly create a new product",async()=>{
        const datas = {
            category:"shirt",name:"camisa plo",
            price:22,stock:45,imageUrl:"loreiptsu",description:"lorem isptu",
            storeId:stores[0].id
        }
        await admin.createProduct( datas )

        const result = await prisma.product.findMany({
            where:{storeId:stores[0].id}
        })

        expect(result).toHaveLength(1)
        expect(result[0]).toMatchObject( datas )
    })
    it("should return an error when Prisma throws an exception",async()=>{
        jest.spyOn(prisma.product,'create').mockRejectedValueOnce(new Error("error"))
         const datas = {
            category:"shirt",name:"camisa plo",
            price:22,stock:45,imageUrl:"loreiptsu",description:"lorem isptu",
            storeId:stores[0].id
        }
        try{
            await admin.createProduct( datas )
        }catch(err:unknown){
            if(err instanceof ErrorMessage){
                expect(err.message).toEqual('Failed to create product.')
                expect(err.action).toEqual('createProduct')
                expect(err.service).toEqual('ProductAdminRepository')
                expect(err.status).toEqual(500)

            }
        }

        const result = await prisma.product.findMany({
            where:{storeId:stores[0].id}
        })
 
        expect(result).toHaveLength(0)
      
    })
})