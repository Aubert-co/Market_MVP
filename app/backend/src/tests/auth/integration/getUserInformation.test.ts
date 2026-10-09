import request from "supertest";
import app from "@/serve";
import { generateAccessToken } from "@/helpers/AuthTokens";
import { prisma } from "@/database/prisma";
import { createOneUser, deleteUser, oneUser } from "@/tests/__mocks__";

const endpoint = "/api/auth/me";

describe("API GET /auth/me",()=>{
    beforeAll(async()=>{
        await deleteUser()
        await createOneUser()
    })

    afterAll(async()=>{
        await deleteUser()
    })

    it("should return the authenticated user's information",async()=>{
        const token = generateAccessToken(oneUser.id)

        const response = await request(app)
            .get(endpoint)
            .set("Cookie", [`token=${token}`])

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            message:"success",
            datas:{
                id:oneUser.id,
                name:oneUser.name,
                email:oneUser.email
            }
        })
    })

    it("should return 404 when the authenticated user does not exist",async()=>{
        const token = generateAccessToken(999999)

        const response = await request(app)
            .get(endpoint)
            .set("Cookie", [`token=${token}`])

        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual({message:"User not found"})
    })

    it("should return an error when the database fails to find the user",async()=>{
        jest.spyOn(prisma.user,"findUnique")
            .mockRejectedValueOnce(new Error("Simulated DB error: Connection lost."))
        const token = generateAccessToken(oneUser.id)

        const response = await request(app)
            .get(endpoint)
            .set("Cookie", [`token=${token}`])

        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual({message:"Failed to find an user"})
    })

    it("should return 401 when the request does not include an authentication token",async()=>{
        const response = await request(app).get(endpoint)

        expect(response.statusCode).toEqual(401)
        expect(response.body).toEqual({message:"Access Denied"})
    })
})
