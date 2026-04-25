import supertest from "supertest"
import app from "@/serve"

describe("store rate limit",()=>{
    it("should enforce rate limit on my stores",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/store/mystores")
            .set("X-Forwarded-For", "1.1.1.4")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/store/mystores')
        .set("X-Forwarded-For", "1.1.1.4")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
     it("should enforce rate limit on create store",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/store/create")
            .set("X-Forwarded-For", "1.1.1.5")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/store/create')
        .set("X-Forwarded-For", "1.1.1.5")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})