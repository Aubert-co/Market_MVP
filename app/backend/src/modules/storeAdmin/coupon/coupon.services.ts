import { ErrorMessage } from "@/helpers/ErrorMessage";
import { pagination } from "@/helpers/pagination";
import {  GetAvailableCoupons} from "@/modules/coupon/types/coupon.types";
import { IStoreCouponRep, StoreCreateCouponDTO } from "./coupon.repository";


export interface ICouponStoreService{
    storeCreateCoupon({quantity,expiresAt,
        storeId,discountType,discount,code
    }:StoreCreateCouponDTO):Promise<void>,
    storeSelectCoupon(storeId:number,limit:number,skip:number):Promise<GetAvailableCoupons>,
}
export class CouponStoreService implements ICouponStoreService{
    constructor(protected coupon:IStoreCouponRep){}
     public async storeCreateCoupon({quantity,expiresAt,
            storeId,discountType,discount,code
        }:StoreCreateCouponDTO):Promise<void>{
            const countStoreCoupons = await this.coupon.countStoreCoupons(storeId)
            code = code.toUpperCase()
            if (countStoreCoupons > 5) {
                throw new ErrorMessage({
                    message:"Limit of active coupons reached for this store.",
                    status:400,
                    action:"storeCreateCoupon",
                    service:"CouponServices",
                    context:{storeId}
                })
            }
            if(quantity > 50)quantity = 50
    
            const checkCode = await this.coupon.checkCouponByCode(code);
            if (checkCode){
               
                 throw new ErrorMessage({
                    message:"Coupon code already exists",
                    status:409,
                    action:"storeCreateCoupon",
                    service:"CouponServices",
                    context:{storeId}
                })
            }
            await this.coupon.storeCreateCoupon({
                quantity,expiresAt,storeId,discount,discountType,code
            })
        }

    public async storeSelectCoupon(storeId:number,limit:number=5,page:number):Promise<GetAvailableCoupons>{
            
            const totalItems = await this.coupon.countStoreCoupons(storeId)
            if (totalItems === 0) {
                return {
                    datas:[],
                    totalPages:1,
                    currentPage:1
                }
            }
    
            const {skip,currentPage,totalPages} =  pagination({
                page,limit,totalItems
            })
            const datas =await this.coupon.storeGetCoupons(storeId,limit,skip)
            return {
                datas,totalPages,currentPage
            }
    }
}