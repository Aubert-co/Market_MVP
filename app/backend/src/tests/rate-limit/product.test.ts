import supertest from "supertest"
import app from "../../serve"

describe("product rate limit",()=>{
    it("should enforce rate limit on product creation",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/product/create")
            .set("X-Forwarded-For", "1.1.1.1")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/product/create')
        .set("X-Forwarded-For", "1.1.1.1")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
    it("should enforce rate limit on product get by id",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/product/12")
            .set("X-Forwarded-For", "1.1.1.2")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/product/12')
        .set("X-Forwarded-For", "1.1.1.2")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
    it("should enforce rate limit on product filter",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/product/filter")
            .set("X-Forwarded-For", "1.1.1.3")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/product/filter')
        .set("X-Forwarded-For", "1.1.1.3")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})