import { ErrorMessage } from "../../../helpers/ErrorMessage";
import { ICouponRepository } from "../repository/coupon.repository";
import { CouponUsage, GetAvailableCoupons } from "../types/coupon.types";
import { pagination } from "../../../helpers/pagination";

export interface ICouponService{
    userAddCoupon(couponId:number,userId:number):Promise<any>,
    userListCoupons(userId:number):Promise<CouponUsage[]>,
    availableCoupons(page:number):Promise<GetAvailableCoupons>
}

export class CouponServices implements ICouponService{ 
    constructor(protected coupon:ICouponRepository){}

   
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