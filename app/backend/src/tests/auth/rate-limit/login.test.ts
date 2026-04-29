import request from "supertest";
import app from "@/serve";




describe("Api post/login:When the password is invalid",()=>{
   
    it("should return status 422 and 'Invalid password...' When the password is greater than 15.", async () => {
         const requests = Array.from({ length: 100 }).map(() =>
            request(app)
            .post("/login")
            .set("X-Forwarded-For", "1.1.3.1")
            .send({password:"12345",email:"lucas@gmail.com"})
        )
        const responses = await Promise.all(requests)

        const blocked = responses.filter(res => res.status === 429)

        expect(blocked.length).toBe(0)
        const response = await request(app)
        .post('/login')
        .set("X-Forwarded-For", "1.1.3.1")
        expect(response.status).toBe(429)
        expect( response.body.message).toEqual("Too many requests from this IP, please try again later.")
    });
     
})