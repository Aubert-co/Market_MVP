import { Prisma } from "@prisma/client";

export type DiscountType = "fixed" | "percent"
export type Coupon = Prisma.CouponGetPayload<{include?:{}}>

export type CouponUsage = Prisma.CouponUsageGetPayload<{include:{coupon:{
    select:{expiresAt:true,discount:true,discountType:true,code:true}
}}}>

export type GetCouponDto = {
    discount?:number ,
    discountType ?:DiscountType 
}

export type ApplyDiscountDto = GetCouponDto &{
    total:number
}
export type CouponUsageInfoDto = Prisma.CouponUsageGetPayload<{
    include:{
        coupon:{
            select:{
                discount:true,
                discountType:true
            }
        }
    }
}>