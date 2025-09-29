import {UserCartService} from '../../services/useCart.services'

import {products} from '../__fixtures__/products'

import { IUserCartRepository } from '../../repository/userCart.repository'

const [datas] = products
const mockCarRep = {
    create:jest.fn(),
    removeItem:jest.fn(),
    getAllCartItems:jest.fn(),
    countUserCart:jest.fn(),
    updateCart:jest.fn()
}
const mockProductRep = {
    getProductById:jest.fn(),
    filterProducts:jest.fn(),
    countProducts:jest.fn(),
    createProduct:jest.fn(),
    getProducts:jest.fn()
}

const userCart = new UserCartService(mockCarRep as IUserCartRepository , mockProductRep)
describe("useCart create",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should successfully add an item to a user's cart",async()=>{
        const userId = 1
        const productId = 30
        const quantity = 500
        mockCarRep.countUserCart.mockResolvedValue(4)
       
        mockProductRep.getProductById.mockResolvedValue({product:datas})
        await userCart.create(userId,productId,quantity)
 

        expect( mockCarRep.countUserCart).toHaveBeenCalledWith( userId )
        expect(mockProductRep.getProductById).toHaveBeenCalledTimes(1)
        expect(mockProductRep.getProductById).toHaveBeenCalledWith( productId )
        expect(mockCarRep.create).toHaveBeenCalledTimes(1)
        expect(mockCarRep.create).toHaveBeenCalledWith(userId,productId,quantity)
    })
     it("should return an error when the user cart count is greater than 5",async()=>{
        try{
            const userId = 1
            const productId = 30
            const quantity = 500
            mockCarRep.countUserCart.mockResolvedValue(6)
        
            mockProductRep.getProductById.mockResolvedValue({product:datas})
            await userCart.create(userId,productId,quantity)


            expect( mockCarRep.countUserCart).toHaveBeenCalledWith( 4 )
            expect(mockProductRep.getProductById).toHaveBeenCalledTimes(1)
            expect(mockProductRep).toHaveBeenCalledWith( productId )
        }catch(err:any){
            expect(err.message).toEqual("Cart limit reached. You can only have up to 5 items in your cart.")
            expect(err.status).toEqual(400)
        }
    })
     it("should return an error when the product is not found",async()=>{
        try{
            const userId = 1
            const productId = 30
            const quantity = 500
            mockCarRep.countUserCart.mockResolvedValue(4)
        
            mockProductRep.getProductById.mockResolvedValue({product:null})
            await userCart.create(userId,productId,quantity)


            expect( mockCarRep.countUserCart).toHaveBeenCalledWith( 4 )
            expect(mockProductRep.getProductById).toHaveBeenCalledTimes(1)
            expect(mockProductRep).toHaveBeenCalledWith( productId )
        }catch(err:any){
            
            expect(err.message).toEqual("Product not found.")
            expect(err.status).toEqual(404)
        }
    })
})

describe("userCart update",()=>{
    it("should update correctly",async()=>{
        const userId = 11
        const values = [{cartId:34,quantity:5},{cartId:55,quantity:3}]

        await userCart.updateCart(userId,values)

        expect(mockCarRep.updateCart).toHaveBeenCalledTimes( values.length)
        values.map((val,ind)=>{
            expect( mockCarRep.updateCart).toHaveBeenNthCalledWith(ind+1,val.cartId,userId,val.quantity)
        })
    
    })
})