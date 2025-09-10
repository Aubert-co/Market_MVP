export type DiscountType = "fixed" | "percent"

export type BaseCoupon<T> = {
    id:number,
    expiresAt:T,
    code:string,
    quantity:number,
    discount:number,
    discountType:DiscountType
}