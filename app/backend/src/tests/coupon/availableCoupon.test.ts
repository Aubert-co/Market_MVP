import { 
    addCouponUsage, cleanAllDb, cleanCoupons,
    createCoupons,createUserStoreAndProducts,oneStore,users } from "../__mocks__";
import request from "supertest";
import app from "../../serve";
import {couponsDatas} from '../__fixtures__/coupons'
import { generateAccessToken } from '../../helpers/AuthTokens'

const userId = users[1].id
const cookies  = generateAccessToken(users[1].id)
 
const storeId = oneStore.id

const {expiredCoupons,validCoupons}=  couponsDatas(storeId)



describe("GET /coupon/available",()=>{
    const coupons = [...expiredCoupons]
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
   
    it("should return an empty array when there's only an expired coupon",async()=>{
        const response = await request(app)
            .get('/coupon/available/1') 
          

        expect(response.body.message).toEqual("No coupons available")
        expect(response.body).not.toHaveProperty('datas')
    })
})

describe("GET /coupon/available",()=>{
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
                        .get('/coupon/available/1')
              
        expect(response.body.message).toEqual("Sucess")
        expect(response.body.datas).toHaveLength(1)
    })
})

describe("GET /coupon/available",()=>{
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
                .get('/coupon/available/1')
                .set('Cookie', [`token=${cookies}`])

        expect(response.body.message).toEqual("Sucess")
      
        expect(response.body.datas).toHaveLength(validCoupons.length)
     
    })
})