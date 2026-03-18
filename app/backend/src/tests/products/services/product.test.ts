import {ProductService} from '../../../modules/products/services/product.services'
import {products} from '../../__fixtures__/products'
import { FilterProductsInput } from "../../../modules/products/types/product.types"
const [product] = products
const mockRepository = {
    getProducts:jest.fn(),
    getProductById:jest.fn(),
    countProducts:jest.fn(),
    deleteProduct:jest.fn(),
    filterProducts:jest.fn()
}
const mockRedisService = {
 getCountProductInCache:jest.fn(),
    saveProductInCache:jest.fn(),
    saveCountProductsInCache:jest.fn(),
    getProductInCache:jest.fn(),
}
const productService = new ProductService( mockRepository ,mockRedisService)



describe("method getProductById",()=>{
    beforeEach(()=>{
        jest.resetAllMocks()
    })
    it("should return the product correctly",async()=>{
        const id = 39
    
        mockRepository.getProductById.mockResolvedValue(product)
        const datas = await productService.getProductById(id)
        
        expect( datas ).toEqual(product)
        expect( mockRepository.getProductById).toHaveBeenCalledTimes(1)
        expect( mockRepository.getProductById).toHaveBeenCalledWith( id)
    })
    it("should return an error when the service throws",async()=>{
      try{
            const id = 39
        
            mockRepository.getProductById.mockRejectedValue(new Error(""))
            const datas = await productService.getProductById(id)
            
        }catch(err:any){
            expect(err.message).toEqual("Failed to retrieve products. Please try again later.")
            expect(err.status).toEqual(500)
        }
    })
})

describe("method countProducts",()=>{
    it("should return the count correctly",async()=>{
        const value = '384'
        mockRepository.countProducts.mockResolvedValue(value)
        const count = await productService.countProducts()

        expect( count ).toEqual( Number(value) )
    })
     it("should return 0 when the repository returns undefined",async()=>{
        const value = undefined
        mockRepository.countProducts.mockResolvedValue(value)
        const count = await productService.countProducts()

        expect( count ).toEqual( 0 )
        expect( mockRepository.countProducts).toHaveBeenCalledTimes(1)
        expect( mockRepository.countProducts ).toHaveBeenCalledWith(  )
    })
    it("should return an error message when the repository throws",async()=>{
        try{
            const value = undefined
            mockRepository.countProducts.mockRejectedValue(new Error(""))
            await productService.countProducts()

    
        }catch(err:any){
            expect( err.message ).toEqual("Failed to count products in the database")
            expect(err.status).toEqual(500)
        }
    })
})

describe("method filterProducts",()=>{
    beforeEach(()=>{
        jest.resetAllMocks()
    })
    it("should return the product correctly",async()=>{
        const params:FilterProductsInput = {
            name:'jose',
            category:'lorem iptus',
            minPrice:34,
            maxPrice:39,
            take:10,
            skip:4,
            orderBy:'desc'
        }
        mockRepository.filterProducts.mockResolvedValue( [product] )
        const datas = await productService.filterProduct( params )

        expect( datas ).toEqual( datas )
        expect( mockRepository.filterProducts).toHaveBeenCalledTimes(1)
        expect( mockRepository.filterProducts ).toHaveBeenCalledWith( params )
    })
    it("should return an error when the repository throws",async()=>{
       try{
            const params:FilterProductsInput = {
                name:'jose',
                category:'lorem iptus',
                minPrice:34,
                maxPrice:39,
                take:10,
                skip:4,
                orderBy:'desc'
            }
            mockRepository.filterProducts.mockResolvedValue( [product] )
            const datas = await productService.filterProduct( params )

            expect( datas ).toEqual( datas )
            expect( mockRepository.filterProducts).toHaveBeenCalledTimes(1)
            expect( mockRepository.filterProducts ).toHaveBeenCalledWith( params )
        }catch(err:any){
            expect( err.status).toEqual(404)
            expect(err.message).toEqual("Products not found")
        }
    })
})