import { NextFunction, Request, Response } from "express";
import { IAdminOrderService } from "./orders.services";
import { checkIsAValidInteger, checkIsValidStatus, checkOrderBy, checkisAValidString } from "@/helpers/checkIsValid";
import { getString } from "@/helpers";
type Orderby = "asc" | "desc"
export class AdminOrdersControl{
    constructor(private ordersService:IAdminOrderService){}

    async searchOrders(req:Request,res:Response,next:NextFunction):Promise<any>{
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
            const pageNumber  = checkIsAValidInteger(pageStr)  ? Number(pageStr)  : 1
            const limitNumber = checkIsAValidInteger(limitStr) ? Number(limitStr) : 5
            const orderBy: Orderby = checkOrderBy(orderStr) ? (orderStr as Orderby) : "desc"
            const statusValue = checkIsValidStatus(statusStr)? statusStr : undefined
            if (searchStr && (!checkisAValidString(searchStr) || !checkIsAValidInteger(searchStr))) {
                return res.status(422).send({message:"is not valid search"})
            }
           
            await this.ordersService.searchOrders({
                orderBy,
                storeId:Number(storeIdStr),
                search: searchStr,
                status: statusValue,
                limit:limitNumber,
                page: pageNumber
            })     
        }catch(err:unknown){
            next(err)
        }
    }
    async getLastOrders(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const {storeId}  =req.query
            const datas = await this.ordersService.getLastOrders(Number(storeId))
            res.status(200).send({
                datas
            })
        }catch(err:unknown){
            next(err)
        }
    }
}