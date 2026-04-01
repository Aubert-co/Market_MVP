import { ErrorMessage } from "../../../helpers/ErrorMessage";
import { ICouponRepository,StoreCreateCoupon } from "../repository/coupon.repository";
import { Coupon,CouponUsage } from "../types/coupon.types";
import { pagination } from "../../../helpers/pagination";

export interface ICouponService{
    storeCreateCoupon({quantity,expiresAt,
        storeId,discountType,discount,code
    }:StoreCreateCoupon):Promise<void>,
    userAddCoupon(couponId:number,userId:number):Promise<any>,
    storeSelectCoupon(storeId:number,limit:number,skip:number):Promise<GetAvailableCoupons>,
    userListCoupons(userId:number):Promise<CouponUsage[]>,
    availableCoupons(page:number):Promise<GetAvailableCoupons>
}
type GetAvailableCoupons = {
    datas:Coupon[],
    currentPage:number,
    totalPages:number
}
export class CouponServices implements ICouponService{ 
    constructor(protected coupon:ICouponRepository){}

    public async storeCreateCoupon({quantity,expiresAt,
        storeId,discountType,discount,code
    }:StoreCreateCoupon):Promise<void>{
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
    public async userAddCoupon(couponId:number,userId:number):Promise<any>{
        const coupon = await this.coupon.getCouponById(couponId)
        
        if (!coupon) {
           
            throw new ErrorMessage({
                message:"Invalid or expired coupon.",
                status:410,
                action:"userAddCoupon",
                service:"CouponServices",
                context:{couponId,userId}
            })
        }
        const doesUserHaveCoupon = await this.coupon.doesUserHaveCoupon(userId,couponId)
        if(doesUserHaveCoupon){
          
            throw new ErrorMessage({
                message:"This user already possesses the coupon.",
                status:400,
                action:"doesUserHaveCoupon",
                service:"CouponServices",
                context:{couponId,userId}
            })
        }
        const countUserCoupons = await this.coupon.countCouponUsage(userId)
       
        if(countUserCoupons >= 5){
      
            throw new ErrorMessage({
                message:"Limit of active coupons reached.",
                status:400,
                action:"countUserCoupons",
                service:"CouponServices",
                context:{couponId,userId}
            })
        }
        const quantity = coupon.quantity-1
        try{
            await this.coupon.userAddCouponUsage({quantity,userId,couponId})
        }catch(err:any){
       
             throw new ErrorMessage({
                message:"Failed to add user coupon",
                status:500,
                action:"userAddCouponUsage",
                service:"CouponServices",
                context:{couponId,userId}
            })
        }
    
    }
    public async storeSelectCoupon(storeId:number,limit:number=5,page:number):Promise<GetAvailableCoupons>{
        
        const totalItems = await this.coupon.countStoreCoupons(storeId)
        if (totalItems === 0) {
          
            throw new ErrorMessage({
                message:"here are no available coupons for this store.",
                status:404,
                action:"storeSelectCoupon",
                service:"CouponServices",
                context:{storeId}
            })
        }

        const {skip,currentPage,totalPages} =  pagination({
            page,limit,totalItems
        })
        const datas =await this.coupon.storeGetCoupons(storeId,limit,skip)
        return {
            datas,totalPages,currentPage
        }
    }
    public async userListCoupons(userId:number):Promise<CouponUsage[]>{
        return await this.coupon.userListCoupons(userId)
    }
    public async availableCoupons(page:number):Promise<GetAvailableCoupons>{
        const limit = 10
        const countCoupons = await this.coupon.countAvailableCoupons()
        
        if(countCoupons ===0){
         
            throw new ErrorMessage({
                message:"No coupons available",
                status:200,
                action:"availableCoupons",
                service:"CouponServices",
                
            })
        }
        const { skip ,currentPage,totalPages} = pagination({
            totalItems:countCoupons,limit,page
        })
        const datas = await this.coupon.availableCoupons(limit,skip)

        return{
            datas,totalPages,currentPage
        }
    }
}