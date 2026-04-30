import { NextFunction, Request, Response } from "express";
import { IProductService } from "../services/product.services";
import {  checkIsAValidInteger } from "../../../helpers/checkIsValid";
import { ErrorMessage } from "../../../helpers/ErrorMessage";
import { getPage } from "@/helpers";
import { validateFilterProducts } from "@/validators/index.validators";


export class ProductsController{
    constructor(protected products:IProductService){}
    public async GetProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        let page = getPage(req.query.page)

        try{
            const {datas,currentPage,fromCache,totalPages} = await this.products.getProducts(page)
        
            res.status(200).send({message:'Sucess',datas,totalPages,currentPage,fromCache})
            
        }catch(err:unknown){
            next(err)
        }
    } 
    public async GetOneProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
        const id = req.params?.id
        if(!checkIsAValidInteger(id)){
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
        }catch(err:unknown){
            next(err)
        }
            
    }
    public async filterProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const {name,category,maxPrice,minPrice,orderBy} = validateFilterProducts(req)
          
            const datas = await this.products.filterProduct({
                name,category,maxPrice,minPrice,take:10,
                skip:0,orderBy
            })
       
            res.status(200).send({message:'Sucess',datas})
        }catch(err:unknown){
            next(err)
        }
    }
}