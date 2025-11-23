import { cleanAllDb, createUserStoreAndProducts } from "../__mocks__"
import {ProductRepository} from '../../repository/product.repository'
import {prisma} from '../../lib/prisma'
import { products } from "../__fixtures__/products"

describe("Method filter products",()=>{
    const filter = new ProductRepository(prisma)
    beforeAll(async ()=>{
        await cleanAllDb()
       await createUserStoreAndProducts()
    })
    afterAll(async()=>{
        await cleanAllDb()
    })
    it("should return products filtered by name",async()=>{
        const name = "teclado"
        const fixturesValues = products.filter((val)=> val.name.normalize('NFD').toLocaleLowerCase().startsWith(name))
        
        const filtered = await filter.filterProducts({name,take:10,skip:0,orderBy:'desc'})
        
        expect( filtered ).toHaveLength( fixturesValues.length)
    })
    it("should return products filtered by category",async()=>{
        const category = "Acessórios"
        const fixturesValues = products.filter((val)=>val.category === "Acessórios")
        
        const filtered = await filter.filterProducts({category,take:10,skip:0,orderBy:'desc'})

        expect( filtered ).toHaveLength( fixturesValues.length )
    })
    it("should return products filtered by category and name",async()=>{
        const category = "Acessórios"
        const name ="mouse"
        const fixturesValues = products.filter((val)=>val.category === "Acessórios")
        
        const filtered = await filter.filterProducts({category,name,take:10,skip:0,orderBy:'desc'})

        expect( filtered ).toHaveLength(1)
    })
    it("should return products filtered by maxPrice",async()=>{
        const maxPrice = 300
        const fixturesValues  =products.filter((val)=>val.price < 300)
        
        const filtered = await filter.filterProducts({maxPrice,take:10,skip:0,orderBy:'desc'})

        expect( filtered ).toHaveLength( fixturesValues.length)
    })
    it("should return only 2 products filtered by maxPrice when take is 2",async()=>{
        const maxPrice = 300
        const fixturesValues  =products.filter((val)=>val.price < maxPrice)
        const take = 2
        const filtered = await filter.filterProducts({maxPrice,take:2,skip:0,orderBy:'desc'})

        expect( filtered ).toHaveLength( 2 )
    })
    it("should return products filtered by maxPrice and minPrice",async()=>{
        const maxPrice = 1000
        const minPrice = 500
        const fixturesValues = products.filter((val)=>{
            return val.price > minPrice && val.price < maxPrice
        })
        
        const filtered = await filter.filterProducts({maxPrice,minPrice,take:10,skip:0,orderBy:'asc'})
        expect( filtered ).toHaveLength( fixturesValues.length)
    })
     it("should return products filtered by maxPrice , minPrice and name",async()=>{
        const maxPrice = 1000
        const minPrice = 500
        const fixturesValues = products.filter((val)=>{
            return val.price > minPrice && val.price < maxPrice
        })
        const name = fixturesValues[0].name
        const filtered = await filter.filterProducts({maxPrice,name,minPrice,take:10,skip:0,orderBy:'asc'})
        expect( filtered ).toHaveLength( 1 )
    })
    it("should return products filtered by storeId",async()=>{
       
        const storeId = 1
        const fixturesValues = products.filter((val)=>{
            return val.storeId === storeId
        })
        const take = 10
        const filtered = await filter.filterProducts({storeId,take,skip:0,orderBy:'asc'})
        expect( filtered ).toHaveLength( fixturesValues.length-take )
    })
    it("should return an empty array when there are no products for the given store ID",async()=>{
       
        const storeId = 2
        const fixturesValues = products.filter((val)=>{
            return val.storeId === storeId
        })
        const take = 10
        const filtered = await filter.filterProducts({storeId,take,skip:0,orderBy:'asc'})
        expect( filtered ).toHaveLength( fixturesValues.length)
    })
    it("should return products filtered by take and skip",async()=>{
       const take = 10
        const skip = 1
        const fixturesValues = products
        const filtered = await filter.filterProducts({ take, skip ,orderBy:'desc'})

        const expectedLength = Math.min(take, Math.max(0, fixturesValues.length - skip))

        expect(filtered).toHaveLength(expectedLength)

    })
})