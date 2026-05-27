import { getInteger, getPage, getValidString } from "@/helpers";
import {  checkIsAValidInteger, checkIsValidStatus, checkOrderBy } from "@/helpers/checkIsValid";
import { ErrorMessage } from "@/helpers/ErrorMessage";

import { SearchOrderWithPage } from "@/modules/storeAdmin/orders/services/orders.services";
import { Orderby } from "@/types/global.types";
import { Request } from "express";



type ValidateSearcbOrdersDTO = Omit<SearchOrderWithPage,"storeId">
export const validateSearchOrders = (req:Request):ValidateSearcbOrdersDTO=>{
  let {currentPage,orderId,
            status,orderBy,limit
        } = req.query

      
    const limitStr  = getInteger(limit) 
    const statusStr = getValidString(status)
    const orderStr  = getValidString(orderBy)

    const limitNumber = limitStr ? limitStr: 5
    const orderByStr: Orderby = checkOrderBy(orderStr) ? (orderStr as Orderby) : "desc"
    const statusValue = checkIsValidStatus(statusStr) ? statusStr : undefined
    
                
    if (orderId && !checkIsAValidInteger(orderId)) {
        throw new ErrorMessage({
            message:"Invalid orderId. It must be a valid integer.",
            status:400,
            service:"Validate",
            action:"validateSearchOrders"
        })
    }

    
    return {
        page:getPage(currentPage),
        searchByOrderId:Number(orderId),
        limit:limitNumber,
        status:statusValue,
        orderBy:orderByStr,
    }
}