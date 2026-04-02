import { NextFunction,Request, Response } from "express";

import { checkIsAValidCategory, checkIsAValidInteger, checkIsAValidNumber, checkisAValidString } from "@/helpers/checkIsValid";

import { checkIsValidImage } from "@/helpers/checkIsValidImage";
import { IProductAdminService } from "./products.services";



export class ProductAdminController{
    constructor(protected products:IProductAdminService ){}

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
    public async DeleteProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
       
        const {storeId,productIds} = req.body
        try{
          
            await this.products.deleteProduct(productIds,Number(storeId))
        
            res.status(202).send({ message: 'Delete scheduled.' });

        }catch(err:any){
            next(err)
        }
    }
    
}