import request from 'supertest'
import app from '../../serve'
import { addItemToCart, cleanAllDb, cleanUserCart, createUserStoreAndProducts ,users} from '../__mocks__'
import { products } from '../__mocks__/products'
import { prisma } from '../../lib/prisma'
import { routes } from '../__mocks__/configs'
import { generateAccessToken } from '../../helpers/AuthTokens'

const [user1,user2] = users

const cookies  = generateAccessToken(user2.id)
describe("API POST:/user/cart/add",()=>{
    beforeAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
        await createUserStoreAndProducts()
        
    })
    afterAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
        jest.clearAllMocks()
    })
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should correctly add an item to the user's cart",async()=>{
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:products[0].id,quantity:1})
        expect(response.body.message).toBe('Sucess')
        expect(response.statusCode).toEqual(201)
    })
    it("should return an  error when sending a quantity greater than 5",async()=>{
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:products[0].id,quantity:6})
        expect(response.body.message).toBe('You can only add up to 5 items of this product to the cart.')
        expect(response.statusCode).toEqual(400)
    })
    it("should return  an error when sending an invalid quantity",async()=>{
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:products[0].id,quantity:'e5'})
        expect(response.body.message).toBe('Invalid quantity. Please provide a valid number.')
        expect(response.statusCode).toEqual(400)
    })
    it("should return an error when sending an invalid productId",async()=>{
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:'abc',quantity:5})
        expect(response.body.message).toBe('Invalid product ID. Please provide a valid number.')
        expect(response.statusCode).toEqual(400)
    })
    it("should return an error when the product does not exist",async()=>{
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:1000,quantity:5})
        expect(response.body.message).toBe('Product not found.')
        expect(response.statusCode).toEqual(404)
    })
    it("should return an error when trying to create the cart item",async()=>{
        jest.spyOn(prisma.cartitem,'create').mockRejectedValueOnce(()=>new Error('something went wrong'))
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:products[0].id,quantity:5})
        expect(response.body.message).toBe('An internal error occurred while trying to add the item to the cart.')
        expect(response.statusCode).toEqual(500)
    })
    it("should return an error when an error occurs while counting the cart",async()=>{
        jest.spyOn(prisma.cartitem,'count').mockRejectedValueOnce(()=>new Error('something went wrong'))
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:products[0].id,quantity:5})
        expect(response.body.message).toBe('Failed to count cart')
        expect(response.statusCode).toEqual(500)
    })
    it("should return an error when an error occurs while searching for a product",async()=>{
        jest.spyOn(prisma.product,'findUnique').mockRejectedValueOnce(()=>new Error('something went wrong'))
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:products[0].id,quantity:5})
        expect(response.body.message).toBe('Failed to find product.')
        expect(response.statusCode).toEqual(500)
    })
})

describe("when the cart is full",()=>{
    const [product1,product2,product3,product4,product5,product6,product7] = products
     beforeAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
        await createUserStoreAndProducts()
        const userId = user2.id
        
        await addItemToCart([
            {userId,productId:product1.id,quantity:3},
            {userId,productId:product2.id,quantity:5},
            {userId,productId:product3.id,quantity:6},
            {userId,productId:product4.id,quantity:10},
            {userId,productId:product5.id,quantity:7},
            {userId,productId:product6.id,quantity:3}
    ])
    })
    afterAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
    })
    it("should return an error when the cart already has 5 items",async()=>{
        const response =await request(app)
        .post(routes.postUserCartAdd)
        .set('Cookie', [`token=${cookies}`])
        .send({productId:product7.id,quantity:3})
        expect(response.body.message).toBe('Cart limit reached. You can only have up to 5 items in your cart.')
        expect(response.statusCode).toEqual(400)
    })
    
}) 

