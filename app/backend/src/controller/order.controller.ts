import { checkIsAValidNumber } from "../helpers";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { OrderService } from "../services/order.services";
import { OrderProductInput } from "../types/order.types";
import { NextFunction, Request, Response } from "express";

export class OrdersController{
    constructor(protected order:OrderService){}

    public async userCreateOrder(req:Request,res:Response,next:NextFunction):Promise<any>{

        const order = req.body?.order

        if (!Array.isArray(order) || order.length === 0) {
            throw new ErrorMessage("Invalid order payload: expected a non-empty array of items.", 400);
        }

        const items = order.map((val:any)=>{
            if (!checkIsAValidNumber(val.productId) || !checkIsAValidNumber(val.quantity)) {
                throw new ErrorMessage("Invalid product ID or quantity. Both must be valid numbers.", 400);
            }

            if (val.couponId && !checkIsAValidNumber(val.couponId)) {
                throw new ErrorMessage("Invalid coupon ID. It must be a valid number.", 400);
            }
            if(!val.couponId){
                return{ productId:Number(val.productId),quantity:Number(val.quantity)}
            }
            return {productId:Number(val.productId),quantity:Number(val.quantity),
                ...(val.couponId && { couponId: Number(val.couponId) })
            }
        }) as OrderProductInput[]
        const userId = req.user
        try{
            await this.order.createOrder({userId,items})
            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
}