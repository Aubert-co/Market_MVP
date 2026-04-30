import { getString } from "@/helpers";
import { checkIsAValidCategory, checkIsAValidNumber, checkisAValidString } from "@/helpers/checkIsValid";
import { ErrorMessage } from "@/helpers/ErrorMessage";
import { FilterProductsInput } from "@/modules/products/types/product.types";
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