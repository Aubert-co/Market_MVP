import { NextFunction, Request, Response } from "express";
import { ICouponService } from "../services/coupon.services";
import { checkIsAValidNumber } from "@/helpers/checkIsValid";
import { getString } from "@/helpers";



export class CouponController{
    constructor(protected coupon:ICouponService){}


    public async userAddCoupon(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const couponId = req.body?.couponId
            if(!checkIsAValidNumber(couponId)){
                return res.status(400).send({
                    message: "Invalid coupon ID. It must be a valid number."
                });
            }
            const userId = req.user
            await this.coupon.userAddCoupon(couponId,userId)
            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
    public async getAvailableCoupons(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            let page = req.query?.page
            let pageNumber =  checkIsAValidNumber(page) ? Number(page) : 1
            
            const {datas,currentPage,totalPages} = await this.coupon.availableCoupons(pageNumber)
            res.status(200).send({message:'Sucess',datas,currentPage,totalPages})
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

            res.status(200).send({ message: 'Sucess', datas })
        }catch(err:any){
            next(err)
        }
    }
    
}