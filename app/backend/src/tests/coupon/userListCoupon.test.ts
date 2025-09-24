import { prisma } from "../../lib/prisma";
import { addCouponUsage, cleanAllDb,
     cleanCoupons,createCoupons,createUserStoreAndProducts,oneStore,ParamsCoupons,users } from "../__mocks__";
import request from "supertest";
import app from "../../serve";
import {couponsDatas} from '../__mocks__/coupons'
import { generateAccessToken } from '../../helpers/AuthTokens'

const userId = users[1].id
const cookies  = generateAccessToken(users[1].id)

const storeId = oneStore.id

const {expiredCoupons,validCoupons}=  couponsDatas(storeId)



describe("GET /user/list/coupons",()=>{
    const coupons = [...expiredCoupons]
    beforeEach(async()=>{
        await cleanAllDb()
        await cleanCoupons()
        await createUserStoreAndProducts()

        await createCoupons( coupons )
        
        const couponUsage =coupons.map((val)=>{
            return {couponId:val.id,userId}
        })
        await addCouponUsage(couponUsage)
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    })
   
    it("should return an empty array when there's only an expired coupon",async()=>{
        const response = await request(app)
            .get('/user/list/coupons')
            .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual([])
    })
})

describe("GET //user/list/coupons",()=>{
    const coupons = [...expiredCoupons,validCoupons[0]]
    beforeEach(async()=>{
        await cleanAllDb()
        await cleanCoupons()
        await createUserStoreAndProducts()

        await createCoupons( coupons )
        
        const couponUsage =coupons.map((val)=>{
            return {couponId:val.id,userId:userId}
        })
        await addCouponUsage(couponUsage)
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    })
   
    it("should return only one coupon when there's only one saved",async()=>{
        const response = await request(app)
                .get('/user/list/coupons')
                .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual("Sucess")
        expect(response.body.datas).toHaveLength(1)

        expect(response.body.datas[0].couponId).toEqual(validCoupons[0].id)
    
    })
})

describe("GET //user/list/coupons",()=>{
    const coupons = [...expiredCoupons,...validCoupons]
    beforeEach(async()=>{
        await cleanAllDb()
        await cleanCoupons()
        await createUserStoreAndProducts()

        await createCoupons( coupons )
        
        const couponUsage =coupons.map((val)=>{
            return {couponId:val.id,userId:userId}
        })
        await addCouponUsage(couponUsage)
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanAllDb()
    })
   
    it("should return only valid coupons",async()=>{
        const response = await request(app)
                .get('/user/list/coupons')
                .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual("Sucess")
      
        expect(response.body.datas).toHaveLength(validCoupons.length)
     
    })
})