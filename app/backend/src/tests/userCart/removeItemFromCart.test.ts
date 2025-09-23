import request from 'supertest'
import app from '../../serve'
import { addItemToCart, cleanAllDb, cleanUserCart, createUserStoreAndProducts ,users} from '../__mocks__'
import { products } from '../__mocks__/products'

import { prisma } from '../../lib/prisma'
import { generateAccessToken } from '../../helpers/AuthTokens'
const [user1,user2] = users


const cookies  = generateAccessToken(user2.id)
const cookies2 = generateAccessToken(user1.id)

describe("when the cart is full",()=>{
    const [product1,product2,product3,product4,product5,product6] = products
    let carts:any = []
    beforeAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
        await createUserStoreAndProducts()
        const userId = user2.id
        
        const value = await addItemToCart([
            {userId,productId:product1.id,quantity:3},
            {userId,productId:product2.id,quantity:5},
            {userId,productId:product3.id,quantity:6},
            {userId,productId:product4.id,quantity:10},
            {userId,productId:product5.id,quantity:7}
        ])
        value.map((val)=>carts.push(Number(val.id)))
    })
    afterAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
    })
    it("should delete the items sucessfuly",async()=>{
     
        const response =await request(app)
        .delete('/user/cart/remove')
        .set('Cookie', [`token=${cookies}`])
        .send({cart:carts})
        expect(response.body.message).toBe('Sucess')
        expect(response.statusCode).toEqual(200)

        const check =await prisma.cartitem.findMany({
            where:{
                userId:user2.id
            }
        })
        expect(check).toEqual([])
    })
    it("should return an error when the cart is not an array",async()=>{
        const response =await request(app)
        .delete('/user/cart/remove')
        .set('Cookie', [`token=${cookies}`])
        .send({cart:10})
        expect(response.body.message).toBe('Invalid cart. Please provide a valid cart.')
        expect(response.statusCode).toEqual(400)
    })
    it("should return an error when the cart is a string",async()=>{
        const response =await request(app)
        .delete('/user/cart/remove')
        .set('Cookie', [`token=${cookies}`])
        .send({cart:'abec'})
        expect(response.body.message).toBe('Invalid cart. Please provide a valid cart.')
        expect(response.statusCode).toEqual(400)
    })
    it("should return an error when the cart is an object",async()=>{
        const response =await request(app)
        .delete('/user/cart/remove')
        .set('Cookie', [`token=${cookies}`])
        .send({cart:{length:3}})
        expect(response.body.message).toBe('Invalid cart. Please provide a valid cart.')
        expect(response.statusCode).toEqual(400)
    })
    it("should return an error when the array contains an invalid number",async()=>{
        const response =await request(app)
        .delete('/user/cart/remove')
        .set('Cookie', [`token=${cookies}`])
        .send({cart:['bce',1,2,10]})
        expect(response.body.message).toBe('Invalid cart id. Please provide a valid cart id')
        expect(response.statusCode).toEqual(400)
    })
})  

describe("when the user doesn't have the cart item",()=>{
    const [product1,product2,product3,product4,product5] = products
    let carts:any = []
    beforeAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
        await createUserStoreAndProducts()
        const userId = user2.id
        
        const value = await addItemToCart([
            {userId,productId:product1.id,quantity:3},
            {userId,productId:product2.id,quantity:5},
            {userId,productId:product3.id,quantity:6},
            {userId,productId:product4.id,quantity:10},
            {userId,productId:product5.id,quantity:7}
        ])
        value.map((val)=>carts.push(Number(val.id)))
    })
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    afterAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
    })
    it("should not delete the cart item when it doesn't belong to the user",async()=>{
        
        const response =await request(app)
        .delete('/user/cart/remove')
        .set('Cookie', [`token=${cookies2}`])
        .send({cart:[carts[0]]})
        expect(response.body.message).toBe('Sucess')
        expect(response.statusCode).toEqual(200)

        const check = await prisma.cartitem.findUnique({
            where:{id:carts[0]}
        })
        expect(check).not.toBeNull()
    })
    it("should return an error when an error occurs while deleting the cart item",async()=>{
        jest.spyOn(prisma.cartitem,'deleteMany').mockRejectedValueOnce(()=>new Error('something went wrong'))
        
        const response =await request(app)
        .delete('/user/cart/remove')
        .set('Cookie', [`token=${cookies}`])
        .send({cart:[carts[0]]})
        expect(response.body.message).toBe('Failed to remove a item from cart.')
        expect(response.statusCode).toEqual(500)
    })
})