import supertest from 'supertest'
import app from '../../serve'
import *as database from '../../lib/prisma'

import { categories } from '../../helpers'
jest.useFakeTimers()
const mock = jest.spyOn(database.prisma.product,'findMany')
 const datas = [{
            id: 1,
            name: "Produto A",
            imageUrl: "https://example.com/produto-a.jpg",
            price: 100,
            description: "Descrição do Produto A",
            stock: 10,
            category: "Eletrônicos",
            createdAt: new Date("2025-09-28T19:41:39.585Z"),
            updatedAt: new Date("2025-09-28T19:41:39.585Z"),
            isActive: true,
            storeId: 1
        }]
describe("POST /product/filter - when user sends invalid inputs",()=>{

    beforeEach(()=>{
        jest.resetAllMocks()
    })
    it("should return an error when the category is invalid",async()=>{
        const response = await supertest(app)
        .post('/product/filter')
        .send({category:'test'})

        expect( response.status).toEqual(400)
        expect( response.body.message).toEqual("Invalid category provided")
        expect( mock ).not.toHaveBeenCalled()
    })
     it("should return an error when the name is shorter than 4 characters",async()=>{
        const response = await supertest(app)
        .post('/product/filter')
        .send({name:'tete'})

        expect( response.status).toEqual(400)
        expect( response.body.message).toEqual("Invalid name format")
        expect( mock ).not.toHaveBeenCalled()
    })
     it("should return an error when the name is longer than 16 characters",async()=>{
        const response = await supertest(app)
        .post('/product/filter')
        .send({name:'a'.repeat(16)})

        expect( response.status).toEqual(400)
        expect( response.body.message).toEqual("Invalid name format")
        expect( mock ).not.toHaveBeenCalled()
    })
     it("should return an error when the maxPrice is an invalid number",async()=>{
        const response = await supertest(app)
        .post('/product/filter')
        .send({maxPrice:'a15'})

        expect( response.status).toEqual(400)
        expect( response.body.message).toEqual("Invalid maximum price value")
        expect( mock ).not.toHaveBeenCalled()
    })
     it("should return an error when the minPrice is an invalid number",async()=>{
        const response = await supertest(app)
        .post('/product/filter')
        .send({minPrice:'a15'})

        expect( response.status).toEqual(400)
        expect( response.body.message).toEqual("Invalid minimum price value")
        expect( mock ).not.toHaveBeenCalled()
    })
    it("should return 'Invalid category provided' error when all inputs are invalid",async()=>{
        const response = await supertest(app)
        .post('/product/filter')
        .send({category:'tt',minPrice:'a15',name:'e',maxPrice:'ab3'})

        expect( response.status).toEqual(400)
        expect( response.body.message).toEqual("Invalid category provided")
        expect( mock ).not.toHaveBeenCalled()
    })
})

describe("POST /product/filter - when user sends valid inputs",()=>{
    beforeEach(()=>{
        jest.resetAllMocks()
        jest.clearAllMocks()
    })
    it("should call the service and return the correct data when the category is valid",async()=>{
       
        mock.mockResolvedValue(datas)
        const category = categories[0]
        const response = await supertest(app)
        .post('/product/filter')
        .send({category})

        expect( response.status).toEqual(200)
        expect( response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual(
            datas.map(d => ({
                ...d,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
        );
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            category: {
            contains: category,
            mode: "insensitive"
            },
            storeId: undefined
        }
        });
    })
    it("should call the service correctly when sending a valid category and return an empty array if the database throws an error",async()=>{
       
        mock.mockRejectedValueOnce(new Error(""))
        const category = categories[0]
        const response = await supertest(app)
        .post('/product/filter')
        .send({category})

        expect( response.status).toEqual(404)
        expect( response.body.message).toEqual("No products found")
        expect(response.body.datas).toBeUndefined()
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            category: {
            contains: category,
            mode: "insensitive"
            },
            storeId: undefined
        }
        });
    })
    it("should call the service and return the correct data when the name is valid",async()=>{
       
        mock.mockResolvedValue(datas)
        const name = 'lorem ipstu'
        const response = await supertest(app)
        .post('/product/filter')
        .send({name})

        expect( response.status).toEqual(200)
        expect( response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual(
            datas.map(d => ({
                ...d,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
        );
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            name: {
            contains: name,
            mode: "insensitive"
            },
            storeId: undefined
        }
        });
    })
    it("should call the service when the name is valid and return an error if the database throws",async()=>{
       
        mock.mockRejectedValue(new Error(""))
        const name = 'lorem ipstu'
        const response = await supertest(app)
        .post('/product/filter')
        .send({name})

        expect( response.status).toEqual(404)
        expect( response.body.message).toEqual("No products found")
        expect(response.body.datas).toBeUndefined()
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            name: {
            contains: name,
            mode: "insensitive"
            },
            storeId: undefined
        }
        });
    })
    it("should call the service and return the correct data when the maxPrice is valid",async()=>{
       
        mock.mockResolvedValue(datas)
        const maxPrice = 35.99
        const response = await supertest(app)
        .post('/product/filter')
        .send({maxPrice})

        expect( response.status).toEqual(200)
        expect( response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual(
            datas.map(d => ({
                ...d,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
        );
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
            skip: 0,
            take: 10,
            "orderBy":  {
                "price": "desc",
            },
            where: {
                price: {
                    lte:maxPrice
                },
                storeId: undefined
            }
            });
    })
    it("should call the service when the maxPrice is invalid and return an error if the database throws",async()=>{
       
        mock.mockRejectedValue(new Error(""))
        const maxPrice = 35.99
        const response = await supertest(app)
        .post('/product/filter')
        .send({maxPrice})

        expect( response.status).toEqual(404)
        expect( response.body.message).toEqual("No products found")
        expect(response.body.datas).toBeUndefined()
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            price: {
                lte:maxPrice
            },
            storeId: undefined
        }
        });
    })
    it("should call the service and return the correct data when the minPrice is valid",async()=>{
       
        mock.mockResolvedValue(datas)
        const minPrice = 35.99
        const response = await supertest(app)
        .post('/product/filter')
        .send({minPrice})

        expect( response.status).toEqual(200)
        expect( response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual(
            datas.map(d => ({
                ...d,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
        );
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
            skip: 0,
            take: 10,
            "orderBy":  {
                "price": "desc",
            },
            where: {
                price: {
                    gte:minPrice
                },
                storeId: undefined
            }
            });
    })
    it("should call the service when the minPrice is invalid and return an error if the database throws",async()=>{
       
        mock.mockRejectedValue(new Error(""))
        const minPrice = 35.99
        const response = await supertest(app)
        .post('/product/filter')
        .send({minPrice})

        expect( response.status).toEqual(404)
        expect( response.body.message).toEqual("No products found")
        expect(response.body.datas).toBeUndefined()
        expect( mock ).toHaveBeenCalledTimes(1)
        expect(mock ).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            price: {
                gte:minPrice
            },
            storeId: undefined
        }
        });
    })
     it("should call the service when all inputs are invalid and return an error if the database throws",async()=>{
       
        mock.mockRejectedValue(new Error(""))
        const minPrice = 35.99
        const maxPrice = 499.99
        const category = categories[0]
        const name = "valid name"
        const response = await supertest(app)
        .post('/product/filter')
        .send({minPrice,name,category,maxPrice})

        expect( response.status).toEqual(404)
        expect( response.body.message).toEqual("No products found")
        expect(response.body.datas).toBeUndefined()
        expect( mock ).toHaveBeenCalledTimes(1)
       expect(mock).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            category: {
            contains: "Roupas",
            mode: "insensitive"
            },
            name: {
            contains: "valid name",
            mode: "insensitive"
            },
            price: {
            gte: 35.99,
            lte: 499.99
            },
            storeId: undefined
        }
        });
    })
 it("should return success when all inputs are sent correctly",async()=>{
       
        mock.mockResolvedValue(datas)
        const minPrice = 35.99
        const maxPrice = 499.99
        const category = categories[0]
        const name = "valid name"
        const response = await supertest(app)
        .post('/product/filter')
        .send({minPrice,name,category,maxPrice})

        expect( response.status).toEqual(200)
        expect( response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual(
            datas.map(d => ({
                ...d,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
        );
        expect( mock ).toHaveBeenCalledTimes(1)
       expect(mock).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            category: {
            contains: "Roupas",
            mode: "insensitive"
            },
            name: {
            contains: "valid name",
            mode: "insensitive"
            },
            price: {
            gte: 35.99,
            lte: 499.99
            },
            storeId: undefined
        }
        });
    })
    it("should return 'desc' when the user sends an invalid orderBy value",async()=>{
       
        mock.mockResolvedValue(datas)
        const minPrice = 35.99
        const maxPrice = 499.99
        const category = categories[0]
        const name = "valid name"
        const orderBy = "gte"
        const response = await supertest(app)
        .post('/product/filter')
        .send({minPrice,name,category,maxPrice,orderBy})

        expect( response.status).toEqual(200)
        expect( response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual(
            datas.map(d => ({
                ...d,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
        );
        expect( mock ).toHaveBeenCalledTimes(1)
       expect(mock).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "desc",
        },
        where: {
            category: {
            contains: "Roupas",
            mode: "insensitive"
            },
            name: {
            contains: "valid name",
            mode: "insensitive"
            },
            price: {
            gte: 35.99,
            lte: 499.99
            },
            storeId: undefined
        }
        });
    })
    it("should return 'asc' when orderBy is provided",async()=>{
       
        mock.mockResolvedValue(datas)
        const minPrice = 35.99
        const maxPrice = 499.99
        const category = categories[0]
        const name = "valid name"
        const orderBy = "asc"
        const response = await supertest(app)
        .post('/product/filter')
        .send({minPrice,name,category,maxPrice,orderBy})

        expect( response.status).toEqual(200)
        expect( response.body.message).toEqual("Sucess")
        expect(response.body.datas).toEqual(
            datas.map(d => ({
                ...d,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
        );
        expect( mock ).toHaveBeenCalledTimes(1)
       expect(mock).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        "orderBy":  {
            "price": "asc",
        },
        where: {
            category: {
            contains: "Roupas",
            mode: "insensitive"
            },
            name: {
            contains: "valid name",
            mode: "insensitive"
            },
            price: {
            gte: 35.99,
            lte: 499.99
            },
            storeId: undefined
        }
        });
    })
})