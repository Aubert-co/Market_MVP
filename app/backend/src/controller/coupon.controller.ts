import { NextFunction, Request, Response } from "express";
import { ICouponService } from "../services/coupon.services";
import { checkIsAValidNumber, isAValidString } from "../helpers";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { convertStringToDate, validDates } from "../helpers/dates";


export class CouponController{
    constructor(protected coupon:ICouponService){}

   
    public async storeCreateCoupon(req:Request,res:Response,next:NextFunction):Promise<any>{
       
        try{
            const discount = req.body?.discount
            const discountType = req.body?.discountType
            const code = req.body?.code
            const quantity = req.body?.quantity
            const expiresAt = req.body?.expiresAt
            const typeOfDiscount = ["fixed","percent"]
            if (!checkIsAValidNumber(discount)) {
                return res.status(400).send({
                    message: "Invalid discount value. Please provide a valid number."
                });
            }

            if ( !typeOfDiscount.includes(discountType) ) {
                return res.status(400).send({
                    message: "Invalid discount type. Only 'fixed' or 'percent' are allowed."
                });
            }

            if (Number(discount) > 60 && discountType === 'percent') {
                return res.status(400).send({
                    message: "Percentage discount cannot exceed 60%."
                });
            }

            if (!isAValidString(code)) {
                return res.status(400).send({
                    message: "Invalid coupon code. Please provide a valid string."
                });
            }

            if (!checkIsAValidNumber(quantity) || Number(quantity) > 50 || !Number.isInteger(quantity)) {
                return res.status(400).send({
                    message: "Invalid quantity. It must be a valid number and not exceed 50 units."
                });
            }

            if(!validDates(expiresAt)){
                return res.status(400).send({
                    message: "Invalid expiration date. It must be one of: oneweek, onemonth, or fivedays."
                });
            }
            const {storeId} = req.body
        
            const convertToDate = convertStringToDate( expiresAt )
            
            await this.coupon.storeCreateCoupon({
                storeId,discountType,code,discount,
                expiresAt:convertToDate,quantity
            })
            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    
    }

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
            let page = Number(req.params?.page)
            if(!checkIsAValidNumber(page)){
                page = 1
            }
            const {datas,currentPage,totalPages} = await this.coupon.availableCoupons(Number(page))
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
    public async storeGetCoupons(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const storeId = Number(req.params.storeId)

            const datas = await this.coupon.storeSelectCoupon(storeId,5,0)

            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
}