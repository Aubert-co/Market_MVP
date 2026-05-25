import { now } from "@/helpers/dates";
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage";
import { Coupon, DiscountType } from "@/modules/coupon/types/coupon.types";
import { PrismaClient } from "@prisma/client";

export type StoreCreateCouponDTO = {
    storeId:number,
    quantity:number,
    expiresAt:Date,
    discount:number,
    discountType:DiscountType,
    code:string
}
export interface IStoreCouponRep {
    storeCreateCoupon({storeId,quantity,expiresAt,code,discount,discountType}:StoreCreateCouponDTO):Promise<void>
    countStoreCoupons(storeId:number):Promise<number>
    checkCouponByCode(code:string):Promise<boolean>
    storeGetCoupons(storeId:number,limit:number,skip:number):Promise<Coupon[]>
}
export class StoreCouponRep implements IStoreCouponRep{
    constructor(protected prisma:PrismaClient){}

    public async storeCreateCoupon({
            storeId,quantity,expiresAt,code,discount,discountType
        }:StoreCreateCouponDTO):Promise<void>{
            try{
                await this.prisma.coupon.create({
                data:{
                    storeId,
                    quantity,
                    expiresAt,
                    discount,
                    discountType,
                    code
                }
            })
            }catch(err:unknown){
                
                const prismaError = getPrismaError(err)
                throw new ErrorMessage({
                    message:"Failed to create a coupon.",
                    status:500,
                    prismaError,
                    service:"CouponRepository",
                    action:"storeCreateCoupon",
                    context:{
                        storeId
                    }
                })
            }
        }
    public async countStoreCoupons(storeId:number):Promise<number>{
            try{
                return await this.prisma.coupon.count({
                    where:{storeId}
                })
            }catch(err:unknown){
                
                const prismaError = getPrismaError(err)
                throw new ErrorMessage({
                    message:"Failed to count store coupon.",
                    status:500,
                    action:"countStoreCoupons",
                    service:"CouponRepository",
                    prismaError
                })
            }
        }
    public async checkCouponByCode(code:string):Promise<boolean>{
        try{
            const coupon = await this.prisma.coupon.findFirst({
                where:{code}
            })
            if(coupon)return true
            return false
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to verify the coupon",
                status:500,
                service:"CouponRepository",
                action:"checkCouponByCode",
                prismaError
            })
        }
    }
    public async storeGetCoupons(storeId:number,limit:number=5,skip:number):Promise<Coupon[]>{
            try{
                return await this.prisma.coupon.findMany({
                    where:{
                        storeId,
                        expiresAt:{
                            gt:now
                        }
                    },
                    take:limit,
                    skip
                })
            }catch(err:unknown){
                const prismaError = getPrismaError(err)
            
                throw new ErrorMessage({
                    message:"Failed to get coupons",
                    status:500,
                    service:"CouponRepository",
                    prismaError,
                    action:"storeGetCoupons"
                })
            }
        }
}