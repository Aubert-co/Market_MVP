import { IStoreCouponRep } from "@/modules/storeAdmin/coupon/coupon.repository"
import { IAdminOrderRep } from "@/modules/storeAdmin/orders/repository/orders.repository"
import { IStoreRepository } from "@/modules/storeAdmin/store/repository/store.repository"
import { IStoreDashboardRep } from "@/modules/storeAdmin/store/repository/storeDashboard.repository"
import { StoreDashboardService } from "@/modules/storeAdmin/store/services/storeDashboard.services"

const spyOrder = {
    search:jest.fn(),
    getLastOrders:jest.fn(),
    
} as IAdminOrderRep
const spyStoreDash = {
    averageReviews:jest.fn(),
    countReviews:jest.fn(),
    getTotalViews:jest.fn(),
    getMonthlyRevenue:jest.fn(),
    countUserProductsInCart:jest.fn(),
    topViewedProducts:jest.fn()
} as IStoreDashboardRep
const spyStoreAdmin = {
    countProductStore:jest.fn(),
    selectUserStores:jest.fn(),
    checkStoreOwnerShip:jest.fn(),
    createStore:jest.fn(),
    findByName:jest.fn(),
    getProductsByStoreId:jest.fn(),
    deleteStore:jest.fn()
} as IStoreRepository
const spyCouponsAdmin ={
storeCreateCoupon:jest.fn(),
storeGetCoupons:jest.fn(),
countStoreCoupons:jest.fn(),
checkCouponByCode:jest.fn()
} as IStoreCouponRep
describe("StoreDashboard service",()=>{
    const service = new StoreDashboardService(spyOrder,spyStoreDash,spyStoreAdmin,spyCouponsAdmin)
    const storeId = 3
    const counProducts = 10
    const averageReviews = 50
    const countReviews = 500
    const totalViews = 1000
    const getMonthlyRevenue = 1000
    const countUserProductsInCart = 3000
   
    it("should not affect other dashboard metrics when one service throws an error",async()=>{
        
        jest.spyOn(spyCouponsAdmin,'countStoreCoupons').mockRejectedValue(new Error("failed"))
        jest.spyOn(spyStoreAdmin,'countProductStore').mockResolvedValue(counProducts)
        jest.spyOn(spyOrder,'getLastOrders').mockResolvedValue([])
        jest.spyOn(spyStoreDash,'averageReviews').mockResolvedValue(averageReviews)
        jest.spyOn(spyStoreDash,'countReviews').mockResolvedValue(countReviews)
        jest.spyOn(spyStoreDash,'getTotalViews').mockResolvedValue(totalViews)
        jest.spyOn(spyStoreDash,'getMonthlyRevenue').mockResolvedValue(getMonthlyRevenue)
        jest.spyOn(spyStoreDash,'countUserProductsInCart').mockResolvedValue(countUserProductsInCart)
        jest.spyOn(spyStoreDash,'topViewedProducts').mockResolvedValue([])
        const response =  await service.dashboard(storeId)
        
        expect(response.totalActiveCoupons).toEqual({
            value:0,hasError:true
        })
        expect(response.countActiveProducts).toEqual({
            value:counProducts,hasError:false
        })
        expect(response.revenue).toEqual({
            value:getMonthlyRevenue,hasError:false
        })
        expect(response.views).toEqual({
            value:totalViews,hasError:false
        })
        expect(response.openOrders).toEqual({
            value:[],hasError:false
        })
        expect(response.revenue).toEqual({
            value:getMonthlyRevenue,hasError:false
        })
        expect(response.reviews.averageRating).toEqual({
            value:averageReviews,hasError:false
        })
        expect(response.reviews.totalReviews).toEqual({
            value:countReviews,hasError:false
        })
        expect(response.productsInCart).toEqual({
            value:countUserProductsInCart,hasError:false
        })
        expect(response.topViewedProducts).toEqual({
            value:[],hasError:false
        })
    })
    it("should return hasError true for all metrics when all services fail", async () => {
    jest.spyOn(spyCouponsAdmin, 'countStoreCoupons').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyStoreAdmin, 'countProductStore').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyOrder, 'getLastOrders').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyStoreDash, 'averageReviews').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyStoreDash, 'countReviews').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyStoreDash, 'getTotalViews').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyStoreDash, 'getMonthlyRevenue').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyStoreDash,'countUserProductsInCart').mockRejectedValue(new Error("failed"))
    jest.spyOn(spyStoreDash,'topViewedProducts').mockRejectedValue(new Error("error"))
    const response = await service.dashboard(storeId)

    expect(response.totalActiveCoupons).toEqual({
        value: 0,
        hasError: true
    })

    expect(response.countActiveProducts).toEqual({
        value: 0,
        hasError: true
    })

    expect(response.revenue).toEqual({
        value: 0,
        hasError: true
    })

    expect(response.views).toEqual({
        value: 0,
        hasError: true
    })

    expect(response.openOrders).toEqual({
        value: [],
        hasError: true
    })

    expect(response.reviews.averageRating).toEqual({
        value: 0,
        hasError: true
    })

    expect(response.reviews.totalReviews).toEqual({
        value: 0,
        hasError: true
    })
    expect(response.productsInCart).toEqual({
        value: 0,
        hasError: true
    })
    expect(response.topViewedProducts).toEqual({
        value:[],
        hasError:true
    })
})
})