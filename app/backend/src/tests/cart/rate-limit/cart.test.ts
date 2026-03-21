import supertest from "supertest"
import app from "../../../serve"

describe("cart rate limit",()=>{
    it("should enforce rate limiting on getting the cart",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app)
            .get("/user/cart")
            .set("X-Forwarded-For", "1.1.1.7")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .get('/user/cart')
        .set("X-Forwarded-For", "1.1.1.7")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
    it("should enforce rate limiting on deleting the cart",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).delete("/user/cart/remove")
            .set("X-Forwarded-For", "1.1.1.8")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .delete('/user/cart/remove')
        .set("X-Forwarded-For", "1.1.1.8")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
    it("should enforce rate limiting on adding to the cart",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).post("/user/cart/add")
            .set("X-Forwarded-For", "1.1.1.9")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .post("/user/cart/add")
        .set("X-Forwarded-For", "1.1.1.9")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
     it("should enforce rate limiting on updating the cart",async()=>{
        const requests = Array.from({ length: 100 }).map(() =>
            supertest(app).put("/user/cart/update")
            .set("X-Forwarded-For", "1.1.2.0")
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await supertest(app)
        .put("/user/cart/update")
        .set("X-Forwarded-For", "1.1.2.0")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    })
})
