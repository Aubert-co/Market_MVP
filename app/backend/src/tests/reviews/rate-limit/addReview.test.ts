import supertest from "supertest"
import app from "../../../serve"
import { XForwardedForIncrease } from "@/tests/__utils__/rate_limit"

describe("reviews rate limit",()=>{
    it("should enforce rate limiting on adding reviews",async()=>{
        const XForward = XForwardedForIncrease()
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/reviews/create")
            .set("X-Forwarded-For", XForward)
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post('/reviews/create')
        .set("X-Forwarded-For", XForward)
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})