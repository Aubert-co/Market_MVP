import { NextFunction, Request, Response } from "express";
import { IProductService } from "../services/product.services";
import { checkIsAValidCategory, checkIsAValidNumber, checkisAValidString,checkOrderBy } from "../../../helpers/checkIsValid";
import { ErrorMessage } from "../../../helpers/ErrorMessage";


export class ProductsController{
    constructor(protected products:IProductService){}
    public async GetProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        let page = Number(req.params?.page)
       
        if( !checkIsAValidNumber(page) ){
            page = 1
        }
        try{
            const {datas,currentPage,fromCache,totalPages} = await this.products.getProducts(page)
        
            res.status(200).send({message:'Sucess',datas,totalPages,currentPage,fromCache})
            
        }catch(err:unknown){
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
        }catch(err:unknown){
            next(err)
        }
            
    }
    public async filterProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const name = req.body?.name
            let category = req.body?.category
            const minPrice = req.body?.minPrice
            const maxPrice = req.body?.maxPrice
            let orderBy = req.body?.orderBy ?? 'desc'
            const take = 10
            const skip =0
            
            if(!checkOrderBy(orderBy))orderBy = "desc"
            if(category && category.toLowerCase() ===  "todas")category = "";
            if(category && !checkIsAValidCategory(category)) {
                return res.status(400).send({message:"Invalid category provided"})
              
            }

            if (name && !checkisAValidString(name)) {
                return res.status(400).send({message:"Invalid name format"})
             
            }

            if (maxPrice && !checkIsAValidNumber(maxPrice)) {
                return res.status(400).send({message:"Invalid maximum price value"})
            
            }

            if (minPrice && !checkIsAValidNumber(minPrice)) {
                return res.status(400).send({message:"Invalid minimum price value"})
                
            }
             
            const datas = await this.products.filterProduct({
                name,category,maxPrice,minPrice,take,
                skip,orderBy
            })
       
            res.status(200).send({message:'Sucess',datas})
        }catch(err:unknown){
            next(err)
        }
    }
}