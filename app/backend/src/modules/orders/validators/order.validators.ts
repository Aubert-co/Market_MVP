import {  checkIsAValidInteger } from "../../../helpers/checkIsValid";
import { ErrorMessage } from "../../../helpers/ErrorMessage";
import { OrderProductInput } from "../types/order.types";
import {  Request } from "express";
export const orderValidator = (req:Request)=>{
    const order = req.body?.order

    if (!Array.isArray(order) || order.length === 0) {
    
        throw new ErrorMessage({
            message:"Invalid order payload: expected a non-empty array of items.",
            status:400,
            action:"userCreateOrder",
            service:"OrdersController",
        })
    }

    const items = order.map((val:any)=>{
        if (!checkIsAValidInteger(val.productId) || !checkIsAValidInteger(val.quantity)) {
            throw new ErrorMessage({
                message:"Invalid product ID or quantity. Both must be valid numbers.",
                status:400,
                action:"userCreateOrder",
                service:"OrdersController", 
            })
        }

        if (val.couponId && !checkIsAValidInteger(val.couponId)) {
        
                throw new ErrorMessage({
                message:"Invalid coupon ID. It must be a valid number.",
                status:400,
                action:"userCreateOrder",
                service:"OrdersController", 
            })
        }
        if(!val.couponId){
            return{ productId:Number(val.productId),quantity:Number(val.quantity)}
        }
        return {productId:Number(val.productId),quantity:Number(val.quantity),
            ...(val.couponId && { couponId: Number(val.couponId) })
        }
    }) as OrderProductInput[]
    return {
        ordersInput:items
    }
}