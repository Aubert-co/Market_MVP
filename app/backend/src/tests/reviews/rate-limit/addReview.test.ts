import supertest from "supertest"
import app from "../../../serve"

describe("reviews rate limit",()=>{
    it("should enforce rate limiting on adding reviews",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/reviews/create")
            .set("X-Forwarded-For", "1.1.1.5")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/reviews/create')
        .set("X-Forwarded-For", "1.1.1.5")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})