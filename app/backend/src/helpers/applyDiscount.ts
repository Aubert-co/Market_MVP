import { ApplyDiscountDto } from "../types/coupon"
import { roundTottaly } from "../helpers/index";

export const applyDiscount = ({total,discountType,discount}:ApplyDiscountDto):number=>{
    if(!discountType || ! discount)return total
        
    let result =
        discountType === "fixed"
      ? total - discount
      : total - (total * discount) / 100;
    result = roundTottaly(result)
  return  result >= 0 ? result : 0;
}