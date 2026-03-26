import { NextFunction, Request, Response } from "express";
import { IOrdersService } from "./orders.services";
import { checkIsAValidNumber, checkIsValidStatus, checkOrderBy, getString, isAValidString } from "../../../helpers";
import { ErrorMessage } from "../../../helpers/ErrorMessage";

type Orderby = "asc" | "desc"
export class OrdersController{
    constructor(private ordersService:IOrdersService){}

    async searchOrders(req:Request,res:Response,next:NextFunction):Promise<void>{
        let {currentPage,search,
            status,orderby,limit,storeId
        } = req.query

        
        try{
       
            const pageStr   = getString(currentPage)
            const limitStr  = getString(limit)
            const searchStr = getString(search)
            const statusStr = getString(status)
            const orderStr  = getString(orderby)
            const storeIdStr = getString(storeId)
            const pageNumber  = checkIsAValidNumber(pageStr)  ? Number(pageStr)  : 1
            const limitNumber = checkIsAValidNumber(limitStr) ? Number(limitStr) : 5
            const orderBy: Orderby = checkOrderBy(orderStr) ? (orderStr as Orderby) : "desc"
            const statusValue = checkIsValidStatus(statusStr)? statusStr : undefined
            if (searchStr && (!isAValidString(searchStr) || !checkIsAValidNumber(searchStr))) {
                throw new ErrorMessage("is not valid search", 422)
            }
            
            await this.ordersService.searchOrders({
                orderBy,
                storeId:Number(storeIdStr),
                search: searchStr,
                status: statusValue,
                limit: limitNumber,
                page: pageNumber
            })     
        }catch(err:unknown){
            next(err)
        }
    }
    async getLastOrders(req:Request,res:Response,next:NextFunction):Promise<void>{
        const {storeId,status} = req.body
        try{
            
            await this.ordersService.getLastOrders({
                storeId,status
            })
        }catch(err:unknown){
            next(err)
        }
    }
}