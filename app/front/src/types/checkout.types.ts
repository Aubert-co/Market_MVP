import type { Product } from "./products.types"
import type { DiscountType } from "./coupons.types"
export type ItemsCheckout = Omit<Product,'category'|'description'> &{
    quantity:number
}
export type UserTotally = {
  items:ItemsCheckout[] ,
  discount?:number ,
  discountType?:DiscountType 
}