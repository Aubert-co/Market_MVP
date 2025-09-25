import { prisma } from "../../lib/prisma";
import { addCouponUsage, cleanAllDb, cleanCoupons,
    createCoupons,createUserStoreAndProducts,oneStore,users } from "../__mocks__";
import request from "supertest";
import app from "../../serve";
import {couponsDatas} from '../__fixtures__/coupons'
import { generateAccessToken } from '../../helpers/AuthTokens'

const userId = users[1].id
const cookies  = generateAccessToken(users[1].id)

const storeId = oneStore.id

const {expiredCoupons,validCoupons}=  couponsDatas(storeId)

describe("POST /user/add/coupon",()=>{
    const coupons = [...expiredCoupons,...validCoupons]
    beforeEach(async()=>{
        await cleanAllDb()
        await cleanCoupons()
        await createUserStoreAndProducts()

        await createCoupons( coupons )
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    })
    it("should return a error message when the coupon is expired",async()=>{
        const response = await request(app)
                .post('/user/add/coupon')
                .set('Cookie', [`token=${cookies}`])
                .send({couponId:expiredCoupons[0].id})

        expect(response.body.message).toEqual("Invalid or expired coupon.")
        const couponUsage = await prisma.couponUsage.findFirst({
            where:{userId}
        })

        expect(couponUsage).toBeNull()
    })
    it("should sucessuly saves the coupon when its valid and add the couponusage and decrease the coupon quantity",async()=>{
        
        const response = await request(app)
                .post('/user/add/coupon')
                .set('Cookie', [`token=${cookies}`])
                .send({couponId:validCoupons[0].id})

        expect(response.body.message).toEqual("Sucess")
        const couponUsage = await prisma.couponUsage.findMany({
            where:{userId}
        })

        expect(couponUsage).toHaveLength(1)
        expect(couponUsage[0].couponId).toEqual(validCoupons[0].id)
        expect(couponUsage[0].usedAt).toEqual(null)
      
    })
})

describe("POST /user/add/coupon",()=>{
    const values = [validCoupons[0],validCoupons[1],validCoupons[2],validCoupons[3],...expiredCoupons]
    const datas =  values .map((val)=>{
        return {couponId:val.id,userId}
    })
    beforeEach(async()=>{
         await cleanCoupons()
        await cleanAllDb()
       
        await createUserStoreAndProducts()

        
        await createCoupons( [...validCoupons,...expiredCoupons] )

       
        await addCouponUsage(datas)
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    })
    it("should return a error message when the already have the coupon",async()=>{
        const response = await request(app)
            .post('/user/add/coupon')
            .set('Cookie', [`token=${cookies}`])
            .send({couponId:validCoupons[0].id})

        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("This user already possesses the coupon.")
    })
    it("should sucessfly add a new coupon whe the user already have 4 coupon not expired e 3 coupon expired",async()=>{
        const couponId = validCoupons[4].id
        const response = await request(app)
            .post('/user/add/coupon')
            .set('Cookie', [`token=${cookies}`])
            .send({couponId})

        expect(response.status).toEqual(201)
        expect(response.body.message).toEqual("Sucess")

        const userCoupon = await prisma.couponUsage.findFirst({
            where:{userId,couponId}
        })

        expect(userCoupon?.couponId).toEqual(couponId)
    })
})

describe("POST /user/add/coupon",()=>{
    const values = [validCoupons[0],validCoupons[1],validCoupons[2],validCoupons[3],validCoupons[4],...expiredCoupons]
    const datas =  values .map((val)=>{
        return {couponId:val.id,userId}
    })
    beforeEach(async()=>{
        await cleanCoupons()
        await cleanAllDb()
       
        await createUserStoreAndProducts()

        
        await createCoupons( [...validCoupons,...expiredCoupons] )

       
        await addCouponUsage(datas)
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    })
    
    it("should return a error message when the user already have 5 valid coupons and try to add one more",async()=>{
        const couponId = validCoupons[5].id
        const response = await request(app)
            .post('/user/add/coupon')
            .set('Cookie', [`token=${cookies}`])
            .send({couponId})

        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("Limit of active coupons reached.")

        const userCoupon = await prisma.couponUsage.findFirst({
            where:{userId,couponId}
        })

        expect(userCoupon).toBeNull()
    })
})