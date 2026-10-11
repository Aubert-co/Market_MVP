import { OrderService } from "../../orders/services/order.services";
import { NextFunction, Request, Response } from "express";
import { orderValidator } from "../validators/order.validators";
import { checkIsAValidInteger } from "../../../helpers/checkIsValid";

export class OrdersController{
    constructor(protected order:OrderService){}

    public async userCreateOrder(req:Request,res:Response,next:NextFunction):Promise<void>{

        
        const userId = req.user
        try{
            const {ordersInput} = orderValidator(req)
            await this.order.createOrder({userId,items:ordersInput})
            res.status(201).send({message:'Sucess'})
        }catch(err:unknown){
            next(err)
        }
    }
    public async getUserOrders(req:Request,res:Response,next:NextFunction):Promise<void>{
        const userId  =req.user
        try{
            const datas = await this.order.getUserOrder( userId )

            res.status(200).send({message:'Sucess',datas})
        }catch(err:unknown){
            next(err)
        }
    }

    public async getOrderDetails(req:Request,res:Response,next:NextFunction):Promise<any>{
        const orderId = req.params.id
        if(!checkIsAValidInteger(orderId)){
            return res.status(400).send({message:"Invalid order ID."})
        }

        try{
            const datas = await this.order.getOrderDetails(Number(orderId),req.user)
            if(!datas){
                return res.status(404).send({message:"Order not found."})
            }

            res.status(200).send({message:'Sucess',datas})
        }catch(err:unknown){
            next(err)
        }
    }
}