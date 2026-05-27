import { OrderService } from "../../orders/services/order.services";
import { NextFunction, Request, Response } from "express";
import { orderValidator } from "../validators/order.validators";

export class OrdersController{
    constructor(protected order:OrderService){}

    public async userCreateOrder(req:Request,res:Response,next:NextFunction):Promise<any>{

        
        const userId = req.user
        try{
            const {ordersInput} = orderValidator(req)
            await this.order.createOrder({userId,items:ordersInput})
            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
    public async getUserOrders(req:Request,res:Response,next:NextFunction):Promise<any>{
        const userId  =req.user
        try{
            const datas = await this.order.getUserOrder( userId )

            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
}