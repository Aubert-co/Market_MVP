import { NextFunction, Request, Response } from "express";
import { IOrdersService } from "../services/orders.services";
import { checkIsAValidNumber, checkIsValidStatus, checkOrderBy, isAValidString } from "../../../helpers";
import { ErrorMessage } from "../../../helpers/ErrorMessage";

type Orderby = "asc" | "desc"
export class OrdersController{
    constructor(private ordersService:IOrdersService){}

    async searchOrders(req:Request,res:Response,next:NextFunction){
        let {currentPage,search,
            status,orderby,limit
        } = req.query
        const {storeId} = req.body
        
        try{
        const getString = (value: unknown) =>
        typeof value === "string" ? value : undefined;

        const pageStr   = getString(currentPage)
        const limitStr  = getString(limit)
        const searchStr = getString(search)
        const statusStr = getString(status)
        const orderStr  = getString(orderby)

        const pageNumber  = checkIsAValidNumber(pageStr)  ? Number(pageStr)  : 1
        const limitNumber = checkIsAValidNumber(limitStr) ? Number(limitStr) : 5
        const orderBy: Orderby = checkOrderBy(orderStr) ? (orderStr as Orderby) : "desc"
        const statusValue = checkIsValidStatus(statusStr)? statusStr : undefined
        if (searchStr && (!isAValidString(searchStr) || !checkIsAValidNumber(searchStr))) {
            throw new ErrorMessage("is not valid search", 422)
        }

        await this.ordersService.searchOrders({
            orderBy,
            storeId,
            search: searchStr,
            status: statusValue,
            limit: limitNumber,
            page: pageNumber
        })     
   }catch(err:unknown){
            next(err)
        }
    }
}