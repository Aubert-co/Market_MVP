import { NextFunction, Request, Response } from "express";
import { ICouponService } from "../services/coupon.services";
import { checkIsAValidNumber } from "@/helpers/checkIsValid";
import { ErrorMessage } from "@/helpers/ErrorMessage";




export class CouponController{
    constructor(protected coupon:ICouponService){}


    public async userAddCoupon(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const couponId = req.body?.couponId
            if(!checkIsAValidNumber(couponId)){
                throw new ErrorMessage({
                    message:"Invalid coupon ID. It must be a valid number.",
                    status:400,
                    action:"userAddCoupon",
                    service:"CouponController"
                })
               
            }
            const userId = req.user
            await this.coupon.userAddCoupon(couponId,userId)
            res.status(201).send({message:'Success'})
        }catch(err:any){
            next(err)
        }
    }
    public async getAvailableCoupons(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            let page = req.query?.page
            let pageNumber =  checkIsAValidNumber(page) ? Number(page) : 1
            
            const {datas,currentPage,totalPages} = await this.coupon.availableCoupons(pageNumber)
            res.status(200).send({message:'Success',datas,currentPage,totalPages})
        }catch(err:any){
            next(err)
        }
    }
    public async userListCoupons(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{

            const userId = req.user
            
            let datas = await this.coupon.userListCoupons(userId);

            datas = datas.map(val => ({
            ...val,         
            ...val.coupon   
            }));

            res.status(200).send({ message: 'Success', datas })
        }catch(err:any){
            next(err)
        }
    }
    
}