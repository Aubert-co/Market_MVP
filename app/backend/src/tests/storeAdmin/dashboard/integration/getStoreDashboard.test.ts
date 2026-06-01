import app from "@/serve"
import { cleanAllDb, cleanCoupons, cleanUserCart, createCoupons, createManyCartItems, createManyOrders, createManyReviews, createViews, creatManyUsersStoresAndProducts, deleteOrders, deleteReviewAndComments, deleteViews} from "@/tests/__mocks__"
import request from "supertest"
import { generateAccessToken } from '@/helpers/AuthTokens'
import { couponsDatas } from "@/tests/__fixtures__/coupons"
import { orders } from "@/tests/__fixtures__/orders"
import { cartItems, countViews, expectedRevenue, lastOrders, reviews, storeProductIds } from "../utils"
import {prisma} from "@/database/prisma"
const storeId = 1
const cookies  = generateAccessToken(storeId)
const coupons = couponsDatas(storeId)


describe("GET /api/store/dashboard/{storeid}",()=>{
    beforeAll(async()=>{
        await creatManyUsersStoresAndProducts()
        await createCoupons([...coupons.expiredCoupons,...coupons.validCoupons])
        await createViews()
        await createManyOrders(orders)
        await createManyCartItems()
        await createManyReviews()
    })
    afterAll(async ()=>{
        await deleteReviewAndComments()
        await cleanCoupons()
        await deleteViews()
        await deleteOrders() 
        await cleanUserCart()
        await cleanAllDb()
    })
    it("should successfully get the store dashboard",async()=>{
        const response = await request(app)
        .get(`/api/store/dashboard/${storeId}`)
        .set('Cookie', [`token=${cookies}`])

        expect(response.status).toEqual(200)
        expect(response.body).toStrictEqual({
            message:"Success",
            views: expect.any(Object),
            revenue: expect.any(Object),
            openOrders: expect.any(Object),
            countActiveProducts: expect.any(Object),
            totalActiveCoupons: expect.any(Object),
            productsInCart: expect.any(Object),
            reviews: {
                averageRating: expect.any(Object),
                totalReviews: expect.any(Object)
            }
        })

        expect(response.body.productsInCart).toEqual({
            value: cartItems, hasError:false
        })
        expect(response.body.views).toEqual({
            value:countViews,hasError:false
        })
        expect(response.body.countActiveProducts).toEqual({
            value:storeProductIds.size,hasError:false
        })
        expect(response.body.totalActiveCoupons).toEqual({
            value:coupons.validCoupons.length,hasError:false
        })
        expect(response.body.reviews.totalReviews).toEqual({
            value:reviews.totalReviews,hasError:false
        })
        expect(response.body.reviews.averageRating).toEqual({
            value:reviews.totalRating/reviews.totalReviews,hasError:false
        })
        expect(response.body.revenue).toEqual({
            value:expectedRevenue,hasError:false
        })
       
        expect(response.body.openOrders.hasError).toBeFalsy()
        const bodyOrders = response.body.openOrders.value

        expect(bodyOrders).toHaveLength(lastOrders.length)

        
        bodyOrders.forEach((val:any)=>{
           expect(val).toStrictEqual({
                id: expect.any(Number),
                productId: expect.any(Number),
                total: expect.any(Number),
                quantity: expect.any(Number),
                price: expect.any(Number),
                status: expect.any(String),
                createdAt: expect.any(String),
                product: {
                    name: expect.any(String),
                    imageUrl: expect.any(String)
                }
            })
        })
    })
    it("should handle errors when count coupons throws an error",async()=>{
        jest.spyOn(prisma.coupon,'count').mockRejectedValue(new Error("error"))
        const response = await request(app)
        .get(`/api/store/dashboard/${storeId}`)
        .set('Cookie', [`token=${cookies}`])

        expect(response.body).toStrictEqual({
            message:"Success",
            views: expect.any(Object),
            revenue: expect.any(Object),
            openOrders: expect.any(Object),
            countActiveProducts: expect.any(Object),
            totalActiveCoupons: expect.any(Object),
            productsInCart: expect.any(Object),
            reviews: {
                averageRating: expect.any(Object),
                totalReviews: expect.any(Object)
            }
        })

        expect(response.body.productsInCart).toEqual({
            value: cartItems, hasError:false
        })
        expect(response.body.views).toEqual({
            value:countViews,hasError:false
        })
        expect(response.body.countActiveProducts).toEqual({
            value:storeProductIds.size,hasError:false
        })
        expect(response.body.totalActiveCoupons).toEqual({
            value:0,hasError:true
        })
        expect(response.body.reviews.totalReviews).toEqual({
            value:reviews.totalReviews,hasError:false
        })
        expect(response.body.reviews.averageRating).toEqual({
            value:reviews.totalRating/reviews.totalReviews,hasError:false
        })
        expect(response.body.revenue).toEqual({
            value:expectedRevenue,hasError:false
        })
       
        expect(response.body.openOrders.hasError).toBeFalsy()
        const bodyOrders = response.body.openOrders.value

        expect(bodyOrders).toHaveLength(lastOrders.length)

        
     
    })
    it("should return errors when all dashboard metrics fail",async()=>{
        jest.spyOn(prisma.coupon,'count').mockRejectedValue(new Error("error"))
        jest.spyOn(prisma.product,'count').mockRejectedValue(new Error("error"))
        jest.spyOn(prisma.review,'count').mockRejectedValue(new Error("error"))
        jest.spyOn(prisma.review,'aggregate').mockRejectedValue(new Error("error"))
        jest.spyOn(prisma.cartitem,'aggregate').mockRejectedValue(new Error("error"))
        jest.spyOn(prisma.view,'count').mockRejectedValue(new Error("error"))
        jest.spyOn(prisma.order,'aggregate').mockRejectedValue(new Error("error"))
          jest.spyOn(prisma.order,'findMany').mockRejectedValue(new Error("error"))
        const response = await request(app)
        .get(`/api/store/dashboard/${storeId}`)
        .set('Cookie', [`token=${cookies}`])

        expect(response.body).toStrictEqual({
            message:"Success",
            views: expect.any(Object),
            revenue: expect.any(Object),
            openOrders: expect.any(Object),
            countActiveProducts: expect.any(Object),
            totalActiveCoupons: expect.any(Object),
            productsInCart: expect.any(Object),
            reviews: {
                averageRating: expect.any(Object),
                totalReviews: expect.any(Object)
            }
        })

        expect(response.body.productsInCart).toEqual({
            value: 0, hasError:true
        })
        expect(response.body.views).toEqual({
            value:0,hasError:true
        })
        expect(response.body.countActiveProducts).toEqual({
            value:0,hasError:true
        })
        expect(response.body.totalActiveCoupons).toEqual({
            value:0,hasError:true
        })
        expect(response.body.reviews.totalReviews).toEqual({
            value:0,hasError:true
        })
        expect(response.body.reviews.averageRating).toEqual({
            value:0,hasError:true
        })
        expect(response.body.revenue).toEqual({
            value:0,hasError:true
        })
        expect(response.body.openOrders).toEqual({
            value:[],hasError:true
        })
    })
    it("should not return dashboard data for a store that does not belong to the user",async()=>{
        const response = await request(app)
        .get(`/api/store/dashboard/3`)
        .set('Cookie', [`token=${cookies}`])

        expect(response.status).toEqual(403)
        expect(response.body.message).toEqual("You do not have permission to access this store.")
        expect(response.body).not.toHaveProperty("datas")
    })
     it("should return status 401 when user is not authenticated",async()=>{
        const response = await request(app)
        .get(`/api/store/dashboard/${storeId}`)
       

        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual("Access Denied")
        expect(response.body).not.toHaveProperty("datas")
    })
})

