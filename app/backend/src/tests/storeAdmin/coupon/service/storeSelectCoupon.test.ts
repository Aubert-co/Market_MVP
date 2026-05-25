import { oneWeekFromNow } from "@/helpers/dates"
import { ErrorMessage } from "@/helpers/ErrorMessage"
import { IStoreCouponRep } from "@/modules/storeAdmin/coupon/coupon.repository"
import {CouponStoreService} from "@/modules/storeAdmin/coupon/coupon.services"
import { couponsDatas } from "@/tests/__fixtures__/coupons"


const mock = {
    countStoreCoupons:jest.fn(),
    checkCouponByCode:jest.fn(),
    storeGetCoupons:jest.fn(),
    storeCreateCoupon:jest.fn()
} as IStoreCouponRep
const couponService = new CouponStoreService(mock)
describe("Service StoreCreateCoupon",()=>{
    const storeId = 1
    it("should not create a coupon when the store coupon count is greater than 5",async()=>{
        jest.spyOn(mock,'countStoreCoupons').mockResolvedValue(6)
       try{
         
            await couponService.storeCreateCoupon({
            quantity:5,storeId,expiresAt:oneWeekFromNow,
            discount:30,discountType:"percent",code:"CODE10"
            })
         
       }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.status).toEqual(400)
            expect(err.message).toEqual("Limit of active coupons reached for this store.")
       }

    })
     it("should not create a coupon when checkCouponByCode returns true",async()=>{
        jest.spyOn(mock,'countStoreCoupons').mockResolvedValue(5)
        jest.spyOn(mock,'checkCouponByCode').mockResolvedValue(true)
       try{
         
            await couponService.storeCreateCoupon({
            quantity:5,storeId,expiresAt:oneWeekFromNow,
            discount:30,discountType:"percent",code:"CODE10"
            })
         
       }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.status).toEqual(409)
            expect(err.message).toEqual("Coupon code already exists")
       }

    })
      it("should create a coupon with all correctly provided data",async()=>{
        jest.spyOn(mock,'countStoreCoupons').mockResolvedValue(5)
        jest.spyOn(mock,'checkCouponByCode').mockResolvedValue(false)

        await couponService.storeCreateCoupon({
            quantity:5,storeId,expiresAt:oneWeekFromNow,
            discount:30,discountType:"percent",code:"CODE10"
        })
         
        expect(mock.storeCreateCoupon).toHaveBeenCalledWith({
            quantity:5,storeId,expiresAt:oneWeekFromNow,
            discount:30,discountType:"percent",code:"CODE10"
        })

    })
})

describe("Service storeSelectCoupon",()=>{
    const storeId = 5
    const limit = 5
    const page = 2
    it("should not call storeGetCoupon when countStoreCoupons returns 0",async()=>{
        jest.spyOn(mock,'countStoreCoupons').mockResolvedValue(0)

        const response  = await couponService.storeSelectCoupon(storeId,limit,page)

        expect(response.datas).toEqual([])
        expect(response.currentPage).toEqual(1)
        expect(response.totalPages).toEqual(1)
        expect(mock.countStoreCoupons).toHaveBeenCalledWith(storeId)
        expect(mock.storeGetCoupons).not.toHaveBeenCalled()
    })
     it("should call storeGetCoupons when countStoreCoupons returns a number greater than 0",async()=>{
        jest.spyOn(mock,'countStoreCoupons').mockResolvedValue(10)
        jest.spyOn(mock,'storeGetCoupons').mockResolvedValue([])
        const response  = await couponService.storeSelectCoupon(storeId,limit,page)

        expect(response.datas).toEqual([])
        expect(response.currentPage).toEqual(2)
        expect(response.totalPages).toEqual(2)

        expect(mock.storeGetCoupons).toHaveBeenCalledWith(storeId,limit,5)
    })
})