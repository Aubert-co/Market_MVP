import { ICouponStore } from "./coupon.services";
import { NextFunction, Request, Response } from "express";
import { checkIsAValidNumber, checkisAValidString } from "@/helpers/checkIsValid";
import { convertStringToDate, validDates } from "@/helpers/dates";

export class CouponStoreController {
    constructor(protected coupon:ICouponStore){}
    public async storeGetCoupons(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const storeId = Number(req.params.storeId)

            const datas = await this.coupon.storeSelectCoupon(storeId,5,0)

            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
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

            if (!checkisAValidString(code)) {
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
}