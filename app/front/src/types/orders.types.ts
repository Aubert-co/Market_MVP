import type { BaseCoupon } from "./coupons.types"
import type { Product } from "./products.types"

export type OrderStatus = "cancelled" | "pending" | "completed"
export type Order = {
    id:number,
    user:string,
    product:Omit<Product , "category" |"stock"|"description"|"price">,
    productId:number,
    total:number,
    quantity:number,
    status:OrderStatus,
    createdAt:number,
    coupon?:Omit < BaseCoupon<number>,"quantity" | "id">,
    price:number
}