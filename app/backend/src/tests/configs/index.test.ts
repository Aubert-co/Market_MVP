import request from "supertest";
import app from "../../serve";

describe("route test/reset",()=>{
    it("expect test/reset is not available",async()=>{
        const response = await request(app)
        .post("/test/reset")
        
        expect(response.status).toEqual(404)
    })
})