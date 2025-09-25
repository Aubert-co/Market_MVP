import {  cleanAllDb,cleanOrders,
      createUserStoreAndProducts,users, createOrder,deleteReviewAndComments
     } from "../__mocks__"
import request from 'supertest'
import app from '../../serve'
import { generateAccessToken } from "../../helpers/AuthTokens"
import { prisma } from "../../lib/prisma"
import { products } from "../__fixtures__/products"


const [product] = products
const [user1,user2] = users
const userId = user2.id
const cookies = generateAccessToken(userId)

describe("Api POST:/reviews/create",()=>{
    const orderId = 50
    beforeAll(async()=>{
     
        await deleteReviewAndComments()
        await cleanOrders()
     
        await cleanAllDb()
        await createUserStoreAndProducts()
    
        
        await createOrder({productId:product.id,id:orderId,userId,quantity:5,price:30,total:150,status:'pending'})
    })
    afterAll(async()=>{
        await deleteReviewAndComments()
        await cleanOrders()
        await cleanAllDb()
        
    })
    it("should not save a new review  when send a invalid rating",async()=>{
        const response = await request(app)
        .post('/reviews/create')
        .set('Cookie', [`token=${cookies}`])
        .send({content:'lorem isptus testing',rating:'e3',order:orderId})

        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("Invalid rating. It must be a valid number.")
    })
    it("should not save a new review  when send a invalid orderId",async()=>{
        const response = await request(app)
        .post('/reviews/create')
        .set('Cookie', [`token=${cookies}`])
        .send({content:'lorem isptus testing',rating:3,order:'e3'})

        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("Invalid order ID. It must be a valid number.")
    })
    it("should not save a new review  when send a content smaller than 4 caracters",async()=>{
        const response = await request(app)
        .post('/reviews/create')
        .set('Cookie', [`token=${cookies}`])
        .send({content:'abc',rating:3,order:orderId})
 
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("Content must be between 5 and 150 characters long.")
    })
     it("should not save a new review  when the order status is different from completed",async()=>{
        const content = "lorem isptu testing a new product"
        const rating = 50
        const response = await request(app)
        .post('/reviews/create')
        .set('Cookie', [`token=${cookies}`])
        .send({content,rating,order:orderId})
 
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual("Order item not found or does not belong to the user.")

        const reviews = await prisma.review.findMany({
            where:{userId,orderId}
        })
        const comment = await prisma.comment.findMany({
            where:{userId,orderId}
        })
        expect(reviews).toHaveLength(0)
        expect(comment).toHaveLength(0)
       
    })
})


describe("Api POST:/order/create",()=>{
    const orderId = 50
    beforeAll(async()=>{
        await deleteReviewAndComments()
        await cleanOrders()
       
        await cleanAllDb()
        await createUserStoreAndProducts()
    
        
        await createOrder({productId:product.id,id:orderId,userId,quantity:5,price:30,total:150,status:'completed'})
    })
    afterAll(async()=>{
        await deleteReviewAndComments()
        await cleanOrders()
        await cleanAllDb()
        
    })
    
     it("should sucessfuly save the review",async()=>{
        const content = "lorem isptu testing a new product"
        const rating = 50
        const response = await request(app)
        .post('/reviews/create')
        .set('Cookie', [`token=${cookies}`])
        .send({content,rating,order:orderId})
 
        expect(response.status).toEqual(201)
        expect(response.body.message).toEqual("Sucess")

        const reviews = await prisma.review.findMany({
            where:{userId,orderId}
        })
        const comment = await prisma.comment.findMany({
            where:{userId,orderId}
        })
        expect(reviews).toHaveLength(1)
        expect(comment).toHaveLength(1)
       
    })
})