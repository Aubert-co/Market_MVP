import { ErrorMessage } from "../helpers/ErrorMessage";
import { ICouponRepository,StoreCreateCoupon } from "../repository/coupon.repository";
import { Coupon,CouponUsage } from "../types/coupon.types";
import { pagination } from "../helpers";

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
            throw new ErrorMessage("Limit of active coupons reached for this store.", 400);
        }
        if(quantity > 50)quantity = 50

        const checkCode = await this.coupon.checkCouponByCode(code);
        if (checkCode) throw new ErrorMessage("Coupon code already exists", 409);

        await this.coupon.storeCreateCoupon({
            quantity,expiresAt,storeId,discount,discountType,code
        })
    }
    public async userAddCoupon(couponId:number,userId:number):Promise<any>{
        const coupon = await this.coupon.getCouponById(couponId)
        
        if (!coupon) {
            throw new ErrorMessage("Invalid or expired coupon.", 410);
        }
        const doesUserHaveCoupon = await this.coupon.doesUserHaveCoupon(userId,couponId)
        if(doesUserHaveCoupon)throw new ErrorMessage("This user already possesses the coupon.",400)

        const countUserCoupons = await this.coupon.countCouponUsage(userId)
       
        if(countUserCoupons >= 5){
            throw new ErrorMessage("Limit of active coupons reached.", 400);
        }
        const quantity = coupon.quantity-1
        try{
            await this.coupon.userAddCouponUsage({quantity,userId,couponId})
        }catch(err:any){
            throw new ErrorMessage("Failed to add user coupon",500)
        }
    
    }
    public async storeSelectCoupon(storeId:number,limit:number=5,page:number):Promise<GetAvailableCoupons>{
        
        const totalItems = await this.coupon.countStoreCoupons(storeId)
        if (totalItems === 0) {
            throw new ErrorMessage("There are no available coupons for this store.", 404);
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
        
        if(countCoupons ===0)throw new ErrorMessage("No coupons available",200)
        const { skip ,currentPage,totalPages} = pagination({
            totalItems:countCoupons,limit,page
        })
        const datas = await this.coupon.availableCoupons(limit,skip)

        return{
            datas,totalPages,currentPage
        }
    }
}