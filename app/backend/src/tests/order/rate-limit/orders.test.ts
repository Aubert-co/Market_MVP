import supertest from "supertest"
import app from "../../../serve"

describe("orders rate limit",()=>{
    it("should enforce rate limiting on creating an order",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/order/create")
            .set("X-Forwarded-For", "1.1.1.6")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/order/create')
        .set("X-Forwarded-For", "1.1.1.6")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
      it("should enforce rate limiting on listing orders",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).get("/orders/me")
            .set("X-Forwarded-For", "1.1.1.7")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/orders/me')
        .set("X-Forwarded-For", "1.1.1.7")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})