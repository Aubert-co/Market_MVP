import { getString, getValidString } from "@/helpers";
import { checkIsAValidCategory, checkIsAValidInteger, checkIsAValidNumber, checkisAValidString, checkOrderBy } from "@/helpers/checkIsValid";
import { checkIsValidImage } from "@/helpers/checkIsValidImage";
import { ErrorMessage } from "@/helpers/ErrorMessage";
import { Orderby } from "@/types/global.types";
import { Request } from "express";

export const createProductValidator = (req:Request)=>{
        const name = req.body?.name
        const description = req.body?.description
        const stock = req.body?.stock
        const price = req.body?.price
        const category = req.body?.category
        const storeId = req.body?.storeId

      
         if (
                !req.file ||
                !checkIsValidImage({
                    fileBuffer: req.file.buffer,
                    mimeType: req.file.mimetype,
                    originalFileName: req.file.originalname,
                })
                ) {
                    throw new ErrorMessage({
                        message:"Invalid or missing image file.",
                        status:422,
                        action:"createProduct",
                        service:"controller"
                    })
            }
        
        if(!checkisAValidString(name,50)){
            throw new ErrorMessage({
                message:"Invalid name. Please check and try again.",
                service:"ProductAdminController",
                action:"createProduct",
                status:422
            })
          
            
        }
        if(!checkisAValidString(description , 1000)){
            throw new ErrorMessage({
                message:"Invalid description. Please check and try again.",
                status:422,
                service:"ProductAdminController",
                action:"createProduct"
            })
           
        }
        if (!checkIsAValidInteger(stock)) {
            throw new ErrorMessage({
                message:"Invalid or missing stock value. Must be a non-negative number.",
                service:"ProductAdminController",
                status:422,
                action:"createProduct"
            })
          
        }

        if (!checkIsAValidNumber(price)) {
            throw new ErrorMessage({
                message:"Invalid or missing price value. Must be a non-negative number.",
                service:"ProductAdminController",
                status:422,
                action:"createProduct"
            })
        }
        if(!checkIsAValidCategory(category)){
            throw new ErrorMessage({
                message:"Invalid category. Please check and try again.",
                status:422,
                action:"createProduct",
                service:"ProductAdminController",
            })
           
        }
        if(!checkIsAValidInteger(storeId)){
            throw new ErrorMessage({
                message:"Invalid request.",
                service:"ProductAdminController",
                action:"createProduct",
                status:422
            })
        }
    return {
        name,description,stock,price,category,storeId,
        buffer:req.file.buffer,originalname:req.file.originalname,mimetype:req.file.mimetype
    }
}

export const getStoreProductValidator = (req: Request) => {
    let { page, search, category, priceOrder, limit, stockOrder } = req.query
    const { storeId } = req.params

    if (!checkIsAValidInteger(storeId)) {
        throw new ErrorMessage({
            message: "Invalid storeId. Please check and try again.",
            status: 422,
            service: "controller",
            action: "getStoreProduct"
        })
    }

    const pageNumber = checkIsAValidInteger(page) ? Number(page) : 1
    const limitNumber = checkIsAValidInteger(limit) ? Number(limit) : 5

    const priceOrderStr: Orderby =
        checkOrderBy(priceOrder) ? (priceOrder as Orderby) : "asc"

    const stockOrderBy: Orderby =
        checkOrderBy(stockOrder) ? (stockOrder as Orderby) : "asc"

    let searchString = getString(search)
    let categoryString = getString(category)
    searchString = searchString === "" ? undefined : searchString
    categoryString = categoryString === "" ? undefined : categoryString
    if (searchString && checkisAValidString(searchString)) {
        throw new ErrorMessage({
            message: "Invalid search. Please check and try again.",
            status: 422,
            service: "controller",
            action: "getStoreProduct"
        })
    }

    if (categoryString && !checkIsAValidCategory(categoryString)) {
        throw new ErrorMessage({
            message: "Invalid category. Please check and try again.",
            status: 422,
            service: "controller",
            action: "getStoreProduct"
        })
    }

    return {
        storeId: Number(storeId),
        page: pageNumber,
        priceOrder: priceOrderStr,
        search: searchString,
        limit: limitNumber,
        stockOrder: stockOrderBy,
        category: categoryString
    }
}