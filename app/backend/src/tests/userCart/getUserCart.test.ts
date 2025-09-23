import request from 'supertest'
import app from '../../serve'
import { addItemToCart, cleanAllDb, cleanUserCart, createUserStoreAndProducts ,users} from '../__mocks__'
import { products } from '../__mocks__/products'
import { prisma } from '../../lib/prisma'
import { generateAccessToken } from '../../helpers/AuthTokens'
const [user1,user2] = users


const cookies  =generateAccessToken(user2.id)
describe("when the cart is full",()=>{
    const [product1,product2,product3,product4,product5,product6] = products
     beforeAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
        await createUserStoreAndProducts()
        const userId = user2.id
        const userId1 = user1.id
        await addItemToCart([
            {userId:userId1,productId:product1.id,quantity:3},
            {userId,productId:product2.id,quantity:5},
            {userId,productId:product3.id,quantity:6},
            {userId,productId:product4.id,quantity:10},
            {userId,productId:product5.id,quantity:7}
    ])
    })
    afterAll(async()=>{
        await cleanUserCart()
        await cleanAllDb()
    })
    it("should get the user cart successfully",async()=>{
        const response =await request(app)
        .get('/user/cart')
        .set('Cookie', [`token=${cookies}`])
        
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(4)

        response.body.datas.map((val:any)=>{
            expect(val.userId).toEqual(user2.id)
        })
    })
     it("should not get the user cart when a database error occurs",async()=>{
        jest.spyOn(prisma.cartitem,'findMany').mockRejectedValueOnce(()=>new Error('something went wrong'))
        const response =await request(app)
        .get('/user/cart')
        .set('Cookie', [`token=${cookies}`])
        
        expect(response.body.message).toEqual("Failed to get items from cart.")
        expect(response.status).toEqual(500)
        expect(response.body).not.toHaveProperty("datas")

         
    })
}) 
