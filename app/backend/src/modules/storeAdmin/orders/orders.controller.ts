import { NextFunction, Request, Response } from "express";
import { IAdminOrderService } from "./orders.services";
import { checkIsAValidInteger, checkIsValidStatus, checkOrderBy, checkisAValidString } from "@/helpers/checkIsValid";
import { getString } from "@/helpers";
type Orderby = "asc" | "desc"
export class AdminOrdersControl{
    constructor(private ordersService:IAdminOrderService){}

    async searchOrders(req:Request,res:Response,next:NextFunction):Promise<any>{
        let {currentPage,orderId,
            status,orderBy,limit
        } = req.query
        let storeId = req.params.storeId
        
        try{
            
            const pageStr   = getString(currentPage)
            const limitStr  = getString(limit)
            const statusStr = getString(status)
            const orderStr  = getString(orderBy)
            const storeIdStr = getString(storeId)
            const pageNumber  = checkIsAValidInteger(pageStr)  ? Number(pageStr)  : 1
            const limitNumber = checkIsAValidInteger(limitStr) ? Number(limitStr) : 5
            const orderByStr: Orderby = checkOrderBy(orderStr) ? (orderStr as Orderby) : "desc"
            const statusValue = checkIsValidStatus(statusStr)? statusStr : undefined

           
            if (orderId && !checkIsAValidInteger(orderId)) {
                return res.status(400).send({
                    message: "Invalid orderId. It must be a valid integer."
                });
            }
          
            const {datas,pagination} = await this.ordersService.searchOrders({
                orderBy:orderByStr,
                storeId:Number(storeIdStr),
                searchByOrderId: Number(orderId),
                status: statusValue,
                limit:limitNumber,
                page: pageNumber
            })     
           
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