import { getInteger, getPage, getString, getValidString } from "@/helpers";
import { checkIsAValidCategory, checkIsAValidInteger, checkIsAValidNumber, checkisAValidString, checkIsValidStatus, checkOrderBy } from "@/helpers/checkIsValid";
import { ErrorMessage } from "@/helpers/ErrorMessage";
import { FilterProductsInput } from "@/modules/products/types/product.types";
import { SearchOrderWithPage } from "@/modules/storeAdmin/orders/orders.services";
import { Orderby } from "@/types/global.types";
import { Request } from "express";

export const validateFilterProducts = (req:Request):FilterProductsInput=>{
    const {name,orderBy,category,minPrice,maxPrice,} = req.query
    let nameStr = getString(name)
    let categoryStr = getString(category)
   
    const orderByStr: Orderby =
    orderBy === "asc" || orderBy === "desc"
        ? orderBy
        : "desc";

  
    if(categoryStr  && !checkIsAValidCategory(categoryStr)){
        throw new ErrorMessage({
            message:"Invalid category provided",
            status:400,
            service:"ValidatorFilterProducts",
            action:"filterProducts"
        })
    }
    if(nameStr && !checkisAValidString(name)){
        throw new ErrorMessage({
            message:"Invalid name format",
            status:400,
            service:"ValidatorfilterProducts",
            action:"filterProducts"
        })
    }
    if(maxPrice && !checkIsAValidNumber(maxPrice)){
        throw new ErrorMessage({
            message:"Invalid maximum price value",
            status:400,
            service:"ValidatorfilterProducts",
            action:"filterProducts"
        })
    }
    if(minPrice && !checkIsAValidNumber(minPrice)){
        throw new ErrorMessage({
            message:"Invalid minimum price value",
            status:400,
            service:"ValidatorfilterProducts",
            action:"filterProducts"
        })
    }
    return {
        orderBy:orderByStr,
        category:categoryStr,
        name:nameStr,maxPrice:Number(maxPrice),
        minPrice:Number(minPrice),take:10,skip:0
    }
}

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