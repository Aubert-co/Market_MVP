import { prisma } from "../../lib/prisma";
import { cleanAllDb, cleanCoupons,createCoupons,createUserStoreAndProducts,oneStore } from "../__mocks__";
import request from "supertest";
import app from "../../serve";
import { fiveDaysFromNow, oneMonthFromNow, oneWeekFromNow } from "../../helpers/dates";
import {couponsDatas} from '../__fixtures__/coupons'
import { generateAccessToken } from '../../helpers/AuthTokens'
const cookies  = generateAccessToken(oneStore.id)

describe("POST:/store/create/coupon",()=>{
    beforeAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
        await createUserStoreAndProducts()
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    }) 
    it("should return an error when send an invalid discount",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'134b',discountType:'fixed',expiresAt:'oneweek',code:'tesst',quantity:54,storeId:oneStore.id})

        expect(response.body.message).toEqual("Invalid discount value. Please provide a valid number.")
        expect(response.status).toEqual(400)
        
    })
    it("should return an error when send a disctounType different from fixed or percent",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'134',discountType:'fixeds',expiresAt:'oneweek',code:'tesst',quantity:54,storeId:oneStore.id})

        expect(response.body.message).toEqual("Invalid discount type. Only 'fixed' or 'percent' are allowed.")
        expect(response.status).toEqual(400)
        
    })
     it("should return an error when the discount is greater than 60 and type of discount is percent",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'61',discountType:'percent',expiresAt:'oneweek',code:'tesst',quantity:54,storeId:oneStore.id})

        expect(response.body.message).toEqual("Percentage discount cannot exceed 60%.")
        expect(response.status).toEqual(400)
        
    })
    it("should return an error when the code is smaller than 4",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'61',discountType:'fixed',expiresAt:'oneweek',code:'tes',quantity:54,storeId:oneStore.id})

        expect(response.body.message).toEqual("Invalid coupon code. Please provide a valid string.")
        expect(response.status).toEqual(400)
        
    })
     it("should return an error when the quantity is an invalid number",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'61',discountType:'fixed',expiresAt:'oneweek',code:'teste',quantity:'e3',storeId:oneStore.id})

        expect(response.body.message).toEqual("Invalid quantity. It must be a valid number and not exceed 50 units.")
        expect(response.status).toEqual(400)
        
    })
     it("should return an error when the quantity is greater than 50",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'61',discountType:'fixed',expiresAt:'oneweek',code:'teste',quantity:51,storeId:oneStore.id})

        expect(response.body.message).toEqual("Invalid quantity. It must be a valid number and not exceed 50 units.")
        expect(response.status).toEqual(400)
        
    })
    it("should return an error when the quantity is an integer",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'61',discountType:'fixed',expiresAt:'oneweek',code:'teste',quantity:49.9,storeId:oneStore.id})

        expect(response.body.message).toEqual("Invalid quantity. It must be a valid number and not exceed 50 units.")
        expect(response.status).toEqual(400) 
        
    })
     it("should return an error when the expiresAt is different from oneweeks | onemonth or fivedays",async()=>{
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount:'61',discountType:'fixed',expiresAt:'',code:'teste',quantity:35,storeId:oneStore.id})

        expect(response.body.message).toEqual("Invalid expiration date. It must be one of: oneweek, onemonth, or fivedays.")
        expect(response.status).toEqual(400) 
        
    })
    it("should sucessfuly create a coupon",async()=>{
        const discount = 61
        const discountType = "fixed"
        const expiresAt = "oneweek"
        const code = "lorem"
        const quantity = 35
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount,discountType,expiresAt,code,quantity,storeId:oneStore.id})

        expect(response.body.message).toEqual("Sucess")
        expect(response.status).toEqual(201)
        
        const checkInDB = await prisma.coupon.findMany({
            where:{
                storeId:oneStore.id
            }
        })
        expect(checkInDB).toHaveLength(1)
        expect(checkInDB[0].code).toEqual(code.toUpperCase())
        expect(checkInDB[0].discount).toEqual(discount)
        expect(checkInDB[0].discountType).toEqual(discountType)
        expect(checkInDB[0].quantity).toEqual(quantity)
        if(checkInDB[0].expiresAt){
             expect(new Date(checkInDB[0].expiresAt ).getTime()).toBe(oneWeekFromNow.getTime());
        }
       

    })
})

describe("create coupon",()=>{
    beforeEach(async()=>{
        await cleanCoupons()
        await cleanAllDb()
        await createUserStoreAndProducts()
        jest.clearAllMocks()
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    }) 

    it("should create a coupon with one month expiration",async()=>{
        const discount = 61
        const discountType = "fixed"
        const expiresAt = "onemonth"
        const code = "lorem"
        const quantity = 35
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount,discountType,expiresAt,code,quantity,storeId:oneStore.id})

        expect(response.body.message).toEqual("Sucess")
        expect(response.status).toEqual(201)
        
        const checkInDB = await prisma.coupon.findMany({
            where:{
                storeId:oneStore.id
            }
        })
        expect(checkInDB).toHaveLength(1)
        expect(checkInDB[0].code).toEqual(code.toUpperCase())
        expect(checkInDB[0].discount).toEqual(discount)
        expect(checkInDB[0].discountType).toEqual(discountType)
        expect(checkInDB[0].quantity).toEqual(quantity)
        if(checkInDB[0].expiresAt){
             expect(new Date(checkInDB[0].expiresAt ).getTime()).toBe(oneMonthFromNow.getTime());
        }
    })
     it("should create a coupon with five days expiration",async()=>{
        const discount = 61
        const discountType = "fixed"
        const expiresAt = "fivedays"
        const code = "lorem"
        const quantity = 35
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount,discountType,expiresAt,code,quantity,storeId:oneStore.id})

        expect(response.body.message).toEqual("Sucess")
        expect(response.status).toEqual(201)
        
        const checkInDB = await prisma.coupon.findMany({
            where:{
                storeId:oneStore.id
            }
        })
        expect(checkInDB).toHaveLength(1)
        expect(checkInDB[0].code).toEqual(code.toUpperCase())
        expect(checkInDB[0].discount).toEqual(discount)
        expect(checkInDB[0].discountType).toEqual(discountType)
        expect(checkInDB[0].quantity).toEqual(quantity)
        if(checkInDB[0].expiresAt){
             expect(new Date(checkInDB[0].expiresAt ).getTime()).toBe(fiveDaysFromNow.getTime());
        }
    })
    it("should return an error when the error occurs in the database",async()=>{
        jest.spyOn(prisma.coupon,'create').mockRejectedValueOnce(()=>new Error('something went wrong'))
        const discount = 61
        const discountType = "fixed"
        const expiresAt = "fivedays"
        const code = "lorem"
        const quantity = 35
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount,discountType,expiresAt,code,quantity,storeId:oneStore.id})

        expect(response.body.message).toEqual("Failed to create a coupon.")
        expect(response.status).toEqual(500)
        
        const checkInDB = await prisma.coupon.findMany({
            where:{
                storeId:oneStore.id
            }
        })
        expect(checkInDB).toHaveLength(0)
        
    })
     it("should return an error when the error occurs in the database",async()=>{
        jest.spyOn(prisma.coupon,'count').mockRejectedValueOnce(()=>new Error('something went wrong'))
        const discount = 61
        const discountType = "fixed"
        const expiresAt = "fivedays"
        const code = "lorem"
        const quantity = 35
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount,discountType,expiresAt,code,quantity,storeId:oneStore.id})

        expect(response.body.message).toEqual("Failed to count store coupon.")
        expect(response.status).toEqual(500)
        
        const checkInDB = await prisma.coupon.findMany({
            where:{
                storeId:oneStore.id
            }
        })
        expect(checkInDB).toHaveLength(0)
        
    })
})

describe("when already have a coupon with that code",()=>{
    const storeId = oneStore.id
    const {expiredCoupons,validCoupons} = couponsDatas(storeId)
    
        beforeEach(async()=>{
            await cleanCoupons()
            await cleanAllDb()
           
            await createUserStoreAndProducts()
    
            
            await createCoupons( [validCoupons[0]] )
        })
        afterAll(async()=>{
            await cleanCoupons()
            await cleanAllDb()
        })
         it("should return a message error when already exists a coupon with that code ",async()=>{
        const discount = 61
        const discountType = "fixed"
        const expiresAt = "fivedays"
        const code = "active15"
        const quantity = 35
        const response = await request(app)
        .post('/store/create/coupon')
        .set('Cookie', [`token=${cookies}`])
        .send({discount,discountType,expiresAt,code,quantity,storeId:oneStore.id})

        expect(response.body.message).toEqual("Coupon code already exists")
        expect(response.status).toEqual(409)
        
        const checkInDB = await prisma.coupon.findMany({
            where:{
                storeId:oneStore.id
            }
        })
        expect(checkInDB).toHaveLength(1)
        
    })
})