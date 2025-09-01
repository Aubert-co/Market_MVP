export type DiscountType = "fixed" | "percent"
export type Coupon = {
    expiresAt:number,
    code:string,
    quantity:number,
    discount:number,
    discountType:DiscountType
}