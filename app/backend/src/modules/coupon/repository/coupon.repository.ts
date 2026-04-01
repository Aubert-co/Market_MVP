import { PrismaClient ,Prisma} from "@prisma/client";
import { ErrorMessage, getPrismaError } from "../../../helpers/ErrorMessage";
import { now } from "../../../helpers/dates";
import { Coupon, CouponUsage, CouponUsageInfoDto,DiscountType } from "../types/coupon.types";



export type StoreCreateCoupon = {
    storeId:number,
    quantity:number,
    expiresAt:Date,
    discount:number,
    discountType:DiscountType,
    code:string
}
export interface ICouponRepository {
    storeCreateCoupon({
        storeId,quantity,expiresAt,code,discount,discountType
    }:StoreCreateCoupon):Promise<void>,
    userAddCoupon(userId:number,couponId:number):Promise<void>,
    storeGetCoupons(storeId:number,limit:number,skip:number):Promise<Coupon[]>,
    countStoreCoupons(storeId:number):Promise<number>,
    countCouponUsage(userId:number):Promise<number>,
    getCouponById(couponId:number):Promise<Coupon | null>,
    availableCoupons(limit:number,skip:number):Promise<Coupon[]>,
    userListCoupons(userId:number):Promise<CouponUsage[]>,
    countAvailableCoupons():Promise<number>,
    decreaseCouponQuantity(couponId:number,value:number):Promise<void>,
    doesUserHaveCoupon(userId:number,couponId:number):Promise<boolean>,
    checkCouponByCode(code:string):Promise<boolean>,
    userAddCouponUsage({userId,couponId,quantity}:UserAddCoupon):Promise<void>,
    isUserUsedCoupon(userId:number,couponId:number):Promise<boolean>
}
type UserAddCoupon = {
    userId:number,
    quantity:number,
    couponId:number
}
export class CouponRepository implements ICouponRepository{
    constructor(protected prisma:PrismaClient){}

    public async isUserUsedCoupon(userId:number,couponId:number):Promise<boolean>{
        try{
            const hasCoupon = await this.prisma.couponUsage.findFirst({
                where:{userId,couponId,usedAt:null}
            })
            if(hasCoupon)return true
            return false;
        }catch(err:unknown){
          
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get user coupon usage",
                status:500,
                service:"CouponRepository",
                action:"isUserUsedCoupon",
                prismaError,
                context:{
                    userId
                }
            })
        }
    }
    public async storeCreateCoupon({
        storeId,quantity,expiresAt,code,discount,discountType
    }:StoreCreateCoupon):Promise<void>{
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
    public async userAddCoupon(userId:number,couponId:number):Promise<void>{
            try{
                await this.prisma.couponUsage.create({
                data:{
                    userId,
                    couponId,
                }
            })
        }catch(err:unknown){
         
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get coupon",
                status:500,
                service:"CouponRepository",
                action:"userAddCoupon",
                prismaError
            })
        }
    }
    public async userListCoupons(userId:number):Promise<CouponUsage[]>{
        try{
            return await this.prisma.couponUsage.findMany({
            where:{userId,usedAt:null,coupon:{
                expiresAt:{
                    gt:now
                },
            }},
            include:{coupon:{
                select:{expiresAt:true,discount:true,discountType:true,code:true}
            }}
        })
        }catch(err:unknown){
       
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to select coupons",
                status:500,
                service:"CouponRepository",
                action:"userListCoupons",
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
    
    public async countCouponUsage(userId:number):Promise<number>{
        try{
            return await this.prisma.couponUsage.count({
            where:{userId,
                coupon:{
                    expiresAt:{
                        gt:now
                    },
                },
                usedAt:undefined
            }
        })
        }catch(err:unknown){
    
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to count coupon usage",
                status:500,
                action:"countCouponUsage",
                service:"CouponRepository",
                prismaError
            })
        }
    }
    public async doesUserHaveCoupon(userId:number,couponId:number):Promise<boolean>{
        try{
            const coupon = await this.prisma.couponUsage.findFirst({
                where:{userId,couponId}
            })
            if(coupon)return true
            return false
        }catch(err:unknown){    
   
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to check if the user has the coupon",
                status:500,
                action:"doesUserHaveCoupon",
                service:"CouponRepository",
                prismaError
            })
        }
    }
    public async getCouponById(couponId:number):Promise<Coupon | null>{
        try{
            return  await this.prisma.coupon.findUnique({
                where:{id:couponId,expiresAt:{
                    gt:now
                }}
            })
            
        }catch(err:unknown){
          
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to verify coupon is not expired",
                status:500,
                action:"getCouponById",
                service:"CouponRepository",
                prismaError
            })
        }
    }
    public async userHaveCoupon(userId:number,couponId:number):Promise<CouponUsageInfoDto | null>{
        try{
            return await this.prisma.couponUsage.findFirst({
                where: {
                    couponId,
                    userId,
                    usedAt: null,
                    coupon: {
                        expiresAt: {
                            gt: now
                        }
                    }
                },
                include: {
                    coupon: {
                        select: {
                            discount: true,
                            discountType: true
                        }
                    }
                }
            });

        }catch(err:unknown){
         
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to verify if the user has a coupon",
                status:500,
                action:"userHaveCoupon",
                service:"CouponRepository",
                prismaError
            })
        }   
    }
    public async availableCoupons(limit:number,skip:number):Promise<Coupon[]>{
        try{
            return await this.prisma.coupon.findMany({
                take:limit,
                skip,
                where:{
                    expiresAt:{
                        gt:now
                    }
                }
            })
        }catch(err:unknown){
           
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get available coupons",
                status:500,
                action:"availableCoupons",
                service:"CouponRepository",
                prismaError
            })
        }
    }
    public async countAvailableCoupons():Promise<number>{
        try{
            return await this.prisma.coupon.count({
                where:{
                    expiresAt:{
                        gt:now
                    }
                }
            })
        }catch(err:unknown){
          
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get available coupons",
                status:500,
                action:"countAvailableCoupons",
                service:"CouponRepository",
                prismaError
            })
        }
    }
    public async decreaseCouponQuantity(couponId:number,value:number):Promise<void>{
        try{
            await this.prisma.coupon.update({
                where:{id:couponId},
                data:{quantity:value}
            })
        }catch(err:unknown){
        
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to change the coupon quantity",
                status:500,
                action:"decreaseCouponQuantity",
                service:"CouponRepository",
                prismaError
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
    public async userAddCouponUsage({userId,couponId,quantity}:UserAddCoupon):Promise<void>{
        await this.prisma.$transaction(async(tx:Prisma.TransactionClient)=>{
            await tx.couponUsage.create({
                data:{
                    userId,
                    couponId,
                }
            });
            await tx.coupon.update({
                where:{id:couponId},
                data:{quantity}
            })
        })
    }
}