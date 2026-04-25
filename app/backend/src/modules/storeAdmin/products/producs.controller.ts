import { NextFunction,Request, Response } from "express";

import { checkIsAValidCategory, checkIsAValidInteger, checkIsAValidNumber, checkisAValidString, checkOrderBy } from "@/helpers/checkIsValid";

import { checkIsValidImage } from "@/helpers/checkIsValidImage";
import { IProductAdminService } from "./products.services";
import { Orderby } from "@/types/global.types";
import { getString } from "@/helpers";



export class ProductAdminController{
    constructor(protected products:IProductAdminService ){}

    public async productMostViewed(req:Request,res:Response,next:NextFunction){
        
        const {storeId} = req.params
        try{
            const datas = await this.products.productMostViewed(Number(storeId))
            
            res.status(200).send({message:'Success',datas})
        }catch(err:unknown){
            
            next(err)
        }
    }
    public async getStoreProducts(req:Request,res:Response,next:NextFunction){
        let {page,search,category,orderBy,limit} = req.query
        const {storeId} = req.params

        const pageNumber = checkIsAValidInteger(page)  ? Number(page) : 1
        const orderByStr: Orderby = checkOrderBy(orderBy) ? (orderBy as Orderby) : "desc"
        const limitNumber = checkIsAValidInteger(limit) ? Number(limit) : 5
        const searchString = getString(search)
        const categoryString = getString(category)
        if( searchString && !checkisAValidString(searchString)){
            return res.status(422).send({message:"Invalid search. Please check and try again."});
        }
        if(categoryString && !checkIsAValidCategory(categoryString)){
            return res.status(422).send({message:"Invalid category. Please check and try again."})
        }
        try{
            const {datas,pagination} = await this.products.getStoreProducts({
                storeId:Number(storeId),search:searchString,category:categoryString,orderBy:orderByStr,
                take:limitNumber,page:pageNumber
            })
            res.status(200).send({message:"Success",datas,pagination})
        }catch(err:unknown){
            console.log(err)
            next(err)
        }
    }
    public async createProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
        
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
                return res.status(422).send({message:"Invalid or missing image file."}) 
            }
        
        if(!checkisAValidString(name,50)){
            return res.status(422).send({message:"Invalid name. Please check and try again."})
            
        }
        if(!checkisAValidString(description , 1000)){
            return res.status(422).send({message:"Invalid description. Please check and try again."})
        }
        if (!checkIsAValidInteger(stock)) {
            return res.status(422).send({message:"Invalid or missing stock value. Must be a non-negative number."});
        }

        if (!checkIsAValidNumber(price)) {
            return res.status(422).send({message:"Invalid or missing price value. Must be a non-negative number."});
        }
        if(!checkIsAValidCategory(category)){
            return res.status(422).send({message:"Invalid category. Please check and try again."})
        }
        if(!checkIsAValidInteger(storeId)){
            return res.status(400).send({message:'Invalid request.'});
        }
       
        const {buffer,originalname,mimetype} = req.file
        
      
       try{
            
            await this.products.createProduct({category,
                name,
                description,
                price:Number(price),
                stock:Number(stock),
                storeId:Number(storeId),
                fileBuffer:buffer,
                originalName:originalname,
                mimeType:mimetype,
            })

          
            res.status(201).send({message:"Product sucessfully created."})
       }catch(err:any){
            next(err)
       }
    }
   
    
}