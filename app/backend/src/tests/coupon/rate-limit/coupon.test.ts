import supertest from "supertest"
import app from "../../../serve"
import { XForwardedForIncrease } from "@/tests/__utils__/rate_limit"

describe("cart rate limit",()=>{
    it("should enforce rate limiting on creating a store coupon",async()=>{
        const xForward = XForwardedForIncrease()
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app)
            .post("/store/create/coupon")
            .set("X-Forwarded-For", xForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/store/create/coupon')
        .set("X-Forwarded-For", xForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
    it("should enforce rate limiting on a user adding a coupon",async()=>{
        const xForward = XForwardedForIncrease()
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/user/add/coupon")
            .set("X-Forwarded-For", xForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/user/add/coupon')
        .set("X-Forwarded-For", xForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
    it("should enforce rate limiting on a user listing coupons",async()=>{
        const xForward = XForwardedForIncrease()
       
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).get("/user/list/coupons")
            .set("X-Forwarded-For", xForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .get("/user/list/coupons")
        .set("X-Forwarded-For", xForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
     it("should enforce rate limiting on getting available coupons",async()=>{
         const xForward = XForwardedForIncrease()
       
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).get("/coupon/available/:page")
            .set("X-Forwarded-For", xForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .get("/coupon/available/:page")
        .set("X-Forwarded-For", xForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
     it("should enforce rate limiting on listing store coupons",async()=>{
        const xForward = XForwardedForIncrease()
       
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).get("/store/coupons/:storeId")
            .set("X-Forwarded-For", xForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .get("/store/coupons/:storeId")
        .set("X-Forwarded-For", xForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})
