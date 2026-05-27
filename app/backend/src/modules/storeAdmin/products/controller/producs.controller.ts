import { NextFunction,Request, Response } from "express";
import { IProductAdminService } from "../services/products.services";
import { createProductValidator, getStoreProductValidator } from "../validators/products.validators";



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
        try{
            const {storeId,search,category,priceOrder,stockOrder,limit,page} = getStoreProductValidator(req)
            const {datas,pagination} = await this.products.getStoreProducts({
                storeId,search,category,priceOrder,
                take:limit,page,stockOrderBy:stockOrder
            })
            res.status(200).send({message:"Success",datas,pagination})
        }catch(err:unknown){
            next(err)
        }
    }
    public async createProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
        
        try{
            const {stock,storeId,name,description,category,price,buffer,originalname,mimetype} = createProductValidator(req)

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