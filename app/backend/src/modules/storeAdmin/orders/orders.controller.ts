import { NextFunction, Request, Response } from "express";
import { IAdminOrderService } from "./orders.services";
import { validateSearchOrders } from "@/validators/index.validators";

export class AdminOrdersControl{
    constructor(private ordersService:IAdminOrderService){}

    async searchOrders(req:Request,res:Response,next:NextFunction):Promise<any>{
     
        const {storeId} = req.params
        
        try{
            const inputs = validateSearchOrders(req)
          
            const {datas,pagination} = await this.ordersService.searchOrders({...inputs,storeId:Number(storeId)})     
           
            res.status(200).send({datas,message:'Success',pagination})
        }catch(err:unknown){
            next(err)
        }
    }
    async getLastOrders(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
        
            const {storeId}  =req.params 

            const datas = await this.ordersService.getLastOrders(Number(storeId))
            
            res.status(200).send({
                datas,message:"Success"
            })
        }catch(err:unknown){
            next(err)
        }
    }
}