import type { DiscountType } from "./coupons.types"
import type { OrderStatus } from "./storeDashboard.types"

export type UserOrders = {
    id:number,
    total:number,
    quantity:number,
    status:OrderStatus,
    createdAt:string,
    price:number
    product:{
        name:string,
        imageUrl:string
    },
    coupon?:{
        discount?:number,
        discountType?:DiscountType
    }
}
