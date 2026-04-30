import supertest from "supertest"
import app from "@/serve"
import { XForwardedForIncrease } from "@/tests/__utils__/rate_limit"

describe("product rate limit",()=>{

    it("should enforce rate limiting on getting a product by id",async()=>{
        const xForward = XForwardedForIncrease()
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).get('/api/product/12/details')
            .set("X-Forwarded-For", xForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .get('/api/product/12/details')
        .set("X-Forwarded-For", xForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
    it("should enforce rate limiting on product filtering",async()=>{
        const xForward  =XForwardedForIncrease()
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).get("/api/product/search")
            .set("X-Forwarded-For", xForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .get("/api/product/search")
        .set("X-Forwarded-For", xForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})