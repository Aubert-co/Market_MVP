import { addCouponUsage, cleanAllDb,cleanOrders,
    cleanCoupons, createCoupons,
    createUserStoreAndProducts,oneStore,
    users } from "../__mocks__"
import request from 'supertest'
import app from '../../serve'
import { couponsDatas } from "../__fixtures__/coupons"
import { generateAccessToken } from "../../helpers/AuthTokens"
import { prisma } from "../../lib/prisma"
import { products } from "../__fixtures__/products"
import {applyDiscount} from '../../helpers/applyDiscount'
import {Order} from '../../types/order.types'
import { roundTottaly } from "../../helpers"

const {validCoupons,expiredCoupons} = couponsDatas(oneStore.id)

const [user1,user2] = users
const userId = user2.id
const cookies = generateAccessToken(userId)

describe("Api POST:/order/create errors",()=>{
    
    beforeAll(async()=>{
        const coupons = [...validCoupons,...expiredCoupons]
        await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
        await createUserStoreAndProducts()
        await createCoupons(coupons)
        const couponUsage =coupons.map((val)=>{
            return {couponId:val.id,userId}
        })
        await addCouponUsage( couponUsage )
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
        
    })
    it("should return an error message when send an empty array",async()=>{
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[]})

        expect(response.statusCode).toEqual(400)
        expect(response.body.message).toEqual("Invalid order payload: expected a non-empty array of items.")
    })
    it("should return an error message when send a array with invalid quantity",async()=>{
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[{productId:12,quantity:'e3b',couponId:13}]})

        expect(response.statusCode).toEqual(400)
        expect(response.body.message).toEqual("Invalid product ID or quantity. Both must be valid numbers.")
    })
     it("should return an error message when send a array with invalid productId",async()=>{
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[{productId:'12b',quantity:50,couponId:13}]})

        expect(response.statusCode).toEqual(400)
        expect(response.body.message).toEqual("Invalid product ID or quantity. Both must be valid numbers.")
    })
    it("should return an error message when send a array with invalid cuponId",async()=>{
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[{productId:12,quantity:50,couponId:'13bc'}]})

        expect(response.statusCode).toEqual(400)
        expect(response.body.message).toEqual("Invalid coupon ID. It must be a valid number.")
    })
    it("should return an error message when no exists product with that id",async()=>{
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[{productId:255,quantity:50,couponId:'13'}]})

        expect(response.body.message).toEqual("No valid product found to create the order.")
        expect(response.statusCode).toEqual(404)
       
    })
    it("should return an error message when send a quantity greater than stock",async()=>{
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[{productId:20,quantity:50,couponId:13}]})

        expect(response.body.message).toEqual("Insufficient product stock for the requested quantity.")
        expect(response.statusCode).toEqual(400)
       
    })
     it("should return an error message when send a expired coupon",async()=>{
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[{productId:20,quantity:2,couponId:expiredCoupons[0].id}]})

        expect(response.body.message).toEqual("Coupon not found or is invalid.")
        expect(response.statusCode).toEqual(404)
       
    })
    it("should sucessfuly create a new order",async()=>{
        const product = products[0]
        const quantity = 5
        const coupon = validCoupons[0]
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:[{productId:product.id,quantity,couponId:coupon.id}]})

        expect(response.body.message).toEqual("Sucess")
        expect(response.statusCode).toEqual(201)

        const order = await prisma.order.findMany({
            where:{
            userId
        }})
        const findProduct = await prisma.product.findUnique({
            where:{id:product.id}
        })
        expect(order).toHaveLength(1)
        const [orderItem] = order
        
        const totalWithDiscounts = applyDiscount({total:product.price*quantity,discountType:coupon.discountType,discount:coupon.discount})
        expect(orderItem.price).toEqual(product.price)
        expect(orderItem.total).toEqual(totalWithDiscounts)
        expect(orderItem.quantity).toEqual(quantity)
        expect(orderItem.userId).toEqual(userId)
        expect(orderItem.status).toEqual('pending')
        expect(orderItem.productId).toEqual(product.id)
        expect(findProduct?.stock).toEqual(product.stock-quantity)
    })
})

describe("Api POST:/order/create",()=>{


    beforeEach(async()=>{
        const selectedCoupons = validCoupons
        const coupons = [selectedCoupons[0],selectedCoupons[1],selectedCoupons[2] ,...expiredCoupons]
        await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
        await createUserStoreAndProducts()
        await createCoupons(coupons)
        const couponUsage =coupons.map((val)=>{
            return {couponId:val.id,userId,usedAt:null}
        })
        await addCouponUsage( couponUsage )
      
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
        
    })
    it("should sucessfuly create a new order",async()=>{
        const [product1,product2,product3,product4,product5] = products
        const [coupon1,coupon2,coupon3]=validCoupons

        const orders = [
            {productId:product1.id,quantity:2,couponId:coupon1.id,price:product1.price,discount:coupon1.discount,discountType:coupon1.discountType},
            {productId:product2.id,quantity:3,couponId:coupon2.id ,price:product2.price,discount:coupon2.discount,discountType:coupon2.discountType},
            {productId:product3.id,quantity:2,couponId:null,price:product3.price},
            {productId:product4.id,quantity:3,couponId:null,price:product4.price},
            {productId:product5.id,quantity:1,couponId:coupon3.id,price:product5.price,discount:coupon3.discount,discountType:coupon3.discountType}
        ]
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:orders})

        expect(response.body.message).toEqual("Sucess")
        expect(response.statusCode).toEqual(201)

        const order = await prisma.order.findMany({
            where:{
            userId
        }})
        const couponUsage = await prisma.couponUsage.findMany({
            where: {
                userId,
                couponId: { in: [coupon1.id, coupon2.id, coupon3.id] },
            },
        });

        expect(couponUsage).toHaveLength(3)

        couponUsage.map((val)=>{
            expect( val.usedAt ).not.toBeNull()
        })
    
        expect(order).toHaveLength(5)
        order.map((val:Order,index:number)=>{
            const orderItem = orders[index]
            const tottaly = applyDiscount({
                total:orderItem.price*orderItem.quantity,
                discount:orderItem?.discount,
                discountType:orderItem?.discountType
            }) 
            expect(val.couponId).toEqual(orderItem.couponId)
            expect(val.total).toEqual(roundTottaly(tottaly))
        })
        
    })
     
     it("should return an error when one of the products does not exist",async()=>{
        const [product1,product2,product3,product4,product5] = products
        const [coupon1,coupon2,coupon3]=validCoupons

        const orders = [
            {productId:product1.id,quantity:2,couponId:coupon1.id,price:product1.price,discount:coupon1.discount,discountType:coupon1.discountType},
            {productId:product2.id,quantity:3,couponId:coupon2.id ,price:product2.price,discount:coupon2.discount,discountType:coupon2.discountType},
            {productId:product3.id,quantity:2,couponId:null,price:product3.price},
            {productId:product4.id,quantity:3,couponId:null,price:product4.price},
            {productId:50,quantity:1,couponId:coupon3.id,price:product5.price,discount:coupon3.discount,discountType:coupon3.discountType}
        ]
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:orders})

        expect(response.body.message).toEqual("No valid product found to create the order.")
        expect(response.statusCode).toEqual(404)

        const order = await prisma.order.findMany({
            where:{
            userId
        }})

        expect(order).toHaveLength(0)
    })
    it("should return an error when one of the coupons is invalid",async()=>{
        const [product1,product2,product3,product4,product5] = products
        const [coupon1,coupon2,coupon3]=validCoupons

        const orders = [
            {productId:product1.id,quantity:2,couponId:coupon1.id,price:product1.price,discount:coupon1.discount,discountType:coupon1.discountType},
            {productId:product2.id,quantity:3,couponId:coupon2.id ,price:product2.price,discount:coupon2.discount,discountType:coupon2.discountType},
            {productId:product3.id,quantity:2,couponId:null,price:product3.price},
            {productId:product4.id,quantity:3,couponId:null,price:product4.price},
            {productId:product5.id,quantity:1,couponId:555,price:product5.price,discount:coupon3.discount,discountType:coupon3.discountType}
        ]
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:orders})

        expect(response.body.message).toEqual("Coupon not found or is invalid.")
        expect(response.statusCode).toEqual(404)

        const order = await prisma.order.findMany({
            where:{
            userId
        }})

        expect(order).toHaveLength(0)
    })
    it("should return an error when one of the coupons is expired",async()=>{
        const [product1,product2,product3,product4,product5] = products
        const [coupon1,coupon2,coupon3]=validCoupons

        const orders = [
            {productId:product1.id,quantity:2,couponId:coupon1.id,price:product1.price,discount:coupon1.discount,discountType:coupon1.discountType},
            {productId:product2.id,quantity:3,couponId:coupon2.id ,price:product2.price,discount:coupon2.discount,discountType:coupon2.discountType},
            {productId:product3.id,quantity:2,couponId:null,price:product3.price},
            {productId:product4.id,quantity:3,couponId:null,price:product4.price},
            {productId:product5.id,quantity:1,couponId:expiredCoupons[0].id,price:product5.price,discount:coupon3.discount,discountType:coupon3.discountType}
        ]
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:orders})

        expect(response.body.message).toEqual("Coupon not found or is invalid.")
        expect(response.statusCode).toEqual(404)

        const order = await prisma.order.findMany({
            where:{
            userId
        }})

        expect(order).toHaveLength(0)
    })
    it("should return an error when the stock is smaller than the quantity",async()=>{
        const [product1,product2,product3,product4,product5] = products
        const [coupon1,coupon2,coupon3]=validCoupons

        const orders = [
            {productId:product1.id,quantity:2,couponId:coupon1.id,price:product1.price,discount:coupon1.discount,discountType:coupon1.discountType},
            {productId:product2.id,quantity:3,couponId:coupon2.id ,price:product2.price,discount:coupon2.discount,discountType:coupon2.discountType},
            {productId:product3.id,quantity:2,couponId:null,price:product3.price},
            {productId:product4.id,quantity:3,couponId:null,price:product4.price},
            {productId:product5.id,quantity:product5.stock+1,couponId:null,price:product5.price,discount:coupon3.discount,discountType:coupon3.discountType}
        ]
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:orders})

        expect(response.body.message).toEqual("Insufficient product stock for the requested quantity.")
        expect(response.statusCode).toEqual(400)

        const order = await prisma.order.findMany({
            where:{
            userId
        }})

        expect(order).toHaveLength(0)
    })
})

describe("Api POST:/order/create",()=>{


    beforeEach(async()=>{
        const selectedCoupons = validCoupons
        const coupons = [selectedCoupons[0],selectedCoupons[1],selectedCoupons[2] ,...expiredCoupons]
        await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
        await createUserStoreAndProducts()
        await createCoupons(coupons)
        const couponUsage =coupons.map((val)=>{
            return {couponId:val.id,userId,usedAt:new Date()}
        })
        await addCouponUsage( couponUsage )
      
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
        
    })
    it("should return an error if the user has already used the coupon",async()=>{
        const [product1,product2,product3,product4,product5] = products
        const [coupon1,coupon2,coupon3]=validCoupons

        const orders = [
            {productId:product1.id,quantity:2,couponId:coupon1.id,price:product1.price,discount:coupon1.discount,discountType:coupon1.discountType},
            {productId:product2.id,quantity:3,couponId:coupon2.id ,price:product2.price,discount:coupon2.discount,discountType:coupon2.discountType},
            {productId:product3.id,quantity:2,couponId:null,price:product3.price},
            {productId:product4.id,quantity:3,couponId:null,price:product4.price},
            {productId:product5.id,quantity:1,couponId:coupon3.id,price:product5.price,discount:coupon3.discount,discountType:coupon3.discountType}
        ]
        const response = await request(app)
        .post('/order/create')
        .set('Cookie', [`token=${cookies}`])
        .send({order:orders})

        expect(response.body.message).toEqual("Coupon has already been used")
        expect(response.statusCode).toEqual(409)

        const order = await prisma.order.findMany({
            where:{
            userId
        }})

        expect(order).toHaveLength(0)
    })
})