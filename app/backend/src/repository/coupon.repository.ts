import { PrismaClient ,Prisma} from "@prisma/client";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { now } from "../helpers/dates";
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
    userAddCouponUsage({userId,couponId,quantity}:UserAddCoupon):Promise<void>
}
type UserAddCoupon = {
    userId:number,
    quantity:number,
    couponId:number
}
export class CouponRepository implements ICouponRepository{
    constructor(protected prisma:PrismaClient){}

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
        }catch(err:any){
            throw new ErrorMessage("Failed to create a coupon.",500)
        }
    }
    public async checkCouponByCode(code:string):Promise<boolean>{
        try{
            const coupon = await this.prisma.coupon.findFirst({
                where:{code}
            })
            if(coupon)return true
            return false
        }catch(err:any){
            throw new ErrorMessage("Failed to verify the coupon", 500);

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
        }catch(err:any){
            throw new ErrorMessage("Failed to get coupon",500)
        }
    }
    public async userListCoupons(userId:number):Promise<CouponUsage[]>{
        try{
            return await this.prisma.couponUsage.findMany({
            where:{userId,coupon:{
                expiresAt:{
                    gt:now
                }
            }},
            include:{coupon:{
                select:{expiresAt:true,discount:true,discountType:true,code:true}
            }}
        })
        }catch(err:any){
            throw new ErrorMessage("Failed to select coupons",500)
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
        }catch(err:any){
            throw new ErrorMessage("Failed to get coupons",500)
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
        }catch(err:any){
            throw new ErrorMessage("Failed to count coupon usage",500)
        }
    }
    public async doesUserHaveCoupon(userId:number,couponId:number):Promise<boolean>{
        try{
            const coupon = await this.prisma.couponUsage.findFirst({
                where:{userId,couponId}
            })
            if(coupon)return true
            return false
        }catch(err:any){    
            throw new ErrorMessage("Failed to check if the user has the coupon",500)
        }
    }
    public async getCouponById(couponId:number):Promise<Coupon | null>{
        try{
            return  await this.prisma.coupon.findUnique({
                where:{id:couponId,expiresAt:{
                    gt:now
                }}
            })
            
        }catch(err:any){
            throw new ErrorMessage("Failed to verify coupon is not expired",500)
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

        }catch(err:any){
            throw new ErrorMessage("",500)
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
        }catch(err:any){
            throw new ErrorMessage("Failed to get available coupons",500)
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
        }catch(err:any){
            throw new ErrorMessage("Failed to get available coupons",500)
        }
    }
    public async decreaseCouponQuantity(couponId:number,value:number):Promise<void>{
        try{
            await this.prisma.coupon.update({
                where:{id:couponId},
                data:{quantity:value}
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to change the coupon quantity",500)
        }
    }
    public async countStoreCoupons(storeId:number):Promise<number>{
        try{
            return await this.prisma.coupon.count({
                where:{storeId}
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to count store coupon.",500)
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