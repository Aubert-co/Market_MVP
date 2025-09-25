import { Prisma } from "@prisma/client"
export type CreateOrderDto = {
    productId:number,
    price:number,
    userId:number,
    total:number,
    quantity:number,
    id:number,
    status:string
}

export type ParamsCoupons = {
    expiresAt:Date,
    quantity:number,
    code:string,
    discount:number,
    discountType: "fixed" | "percent",
    storeId:number,
    id:number
}

export type ParamsCart = {
    userId:number,
    productId:number,
    quantity:number
}

export type ParamCouponUsage = {
    userId:number,
    couponId:number
}
export type DatasCouponUsage = ParamCouponUsage &{
    id:number
}

export type itemsCart = Prisma.CartitemGetPayload<{}>

export type itemCoupon = Prisma.CouponGetPayload<{}>