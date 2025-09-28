import { NextFunction, Request, Response } from "express";
import { IProductService } from "../services/product.services";
import { checkIsAValidCategory, checkIsAValidNumber, isAValidString } from "../helpers";
import { Product } from "../types/product.types";
import { IProductRedisService } from "../services/redis.services";
import { ErrorMessage } from "../helpers/ErrorMessage";


export class ProductsController{
    constructor(protected products:IProductService,protected productCache:IProductRedisService){}
    public async GetProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        let page = Number(req.params?.page)
       
        if( !checkIsAValidNumber(page) ){
            page = 1
        }
        try{
            const {datas,currentPage,fromCache,totalPages} = await this.products.getProducts(page)
        
            res.status(200).send({message:'Sucess',datas,totalPages,currentPage,fromCache})
            
        }catch(err:any){
            next(err)
        }
    } 
    public async GetOneProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
        const id = req.params?.id
        if(!checkIsAValidNumber(id)){
            return res.status(500).send({message:"Failed to retrieve products. Please try again later."});
        }
        try{
            const values = await this.products.getProductById(Number(id));
            
            const datas = {
                product: values.product ? [values.product] : [],
                ratings: values.ratings,
                comments: values.product?.comments ?? [],
                reviews: values.product?.reviews ?? []
            };

            res.status(200).send({ message: 'Success', datas });
        }catch(err:any){
            next(err)
        }
            
    }
    public async filterProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const name = req.body?.name
            const category = req.body?.category
            const minPrice = req.body?.minPrice
            const maxPrice = req.body?.maxPrice
            const take = 10
            const skip =0
           
           if (category && !checkIsAValidCategory(category)) {
                throw new ErrorMessage("Invalid category provided", 400);
            }

            if (name && !isAValidString(name)) {
                throw new ErrorMessage("Invalid name format", 400);
            }

            if (maxPrice && !checkIsAValidNumber(maxPrice)) {
                throw new ErrorMessage("Invalid maximum price value", 400);
            }

            if (minPrice && !checkIsAValidNumber(minPrice)) {
                throw new ErrorMessage("Invalid minimum price value", 400);
            }
             
            const datas = await this.products.filterProduct({
                name,category,maxPrice,minPrice,take,
                skip
            })
       
            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
}