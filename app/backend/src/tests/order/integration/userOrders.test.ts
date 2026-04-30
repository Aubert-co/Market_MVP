import { generateAccessToken } from "../../../helpers/AuthTokens"
import app from "../../../serve"
import { orders } from "../../__fixtures__/orders"
import { cleanAllDb, cleanCoupons, cleanOrders, createCoupons, createManyOrders, createUserStoreAndProducts,creatManyUsersStoresAndProducts,oneStore,users } from "../../__mocks__"
import request from 'supertest'
import { couponsDatas } from "../../__fixtures__/coupons"
import { prisma } from "../../../lib/prisma"
import { manyUsers } from "@/tests/__fixtures__/users"

const user =manyUsers[2]
const {validCoupons} = couponsDatas( oneStore.id )
const cookies = generateAccessToken(user.id)
const newOrders = orders.map((val,index)=>{
    return {...val,couponId:validCoupons[index]?.id}
})
const endpoint = "/api/orders"
describe("Api get /orders",()=>{
    beforeAll(async()=>{
          await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
    })
    beforeEach(async()=>{
 
        await creatManyUsersStoresAndProducts()
        await createCoupons( validCoupons )
        await createManyOrders(newOrders)
     
    })
    afterAll(async()=>{
        await cleanCoupons()
        await cleanOrders()
        await cleanAllDb()
        
    }) 
    it("should successfully get user orders",async()=>{
        const response =  
        await request(app)
            .get(endpoint)
            .set('Cookie', [`token=${cookies}`]);

        
        expect( response.status).toEqual(200)
        expect( response.body.datas).toHaveLength( 5 )
        
    })
})

describe("Api get /orders db erros",()=>{
    it("should return an error message with status 500 when a database error occurs",async()=>{
        jest.spyOn(prisma.order,'findMany').mockRejectedValue('error')

        const response  = await request(app)
        .get(endpoint)
        .set('Cookie', [`token=${cookies}`]);

        expect( response.status).toEqual( 500 )
        expect( response.body.message).toEqual("Database error while fetching user orders.")
    })
})