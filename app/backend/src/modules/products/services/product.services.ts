import {  pagination } from "../../../helpers/pagination";
import { ErrorMessage, getPrismaError } from "../../../helpers/ErrorMessage";
import {  IProductRepository } from "../repository/product.repository";
import {   SelectedProduct ,GetProductById, FilteredProduct,FilterProductsInput} from "../types/product.types";
import { ICacheProducts } from "../cache/product.cache";


export interface IProductService{
    getProducts(page:number):Promise<GetProducts>,
    getProductById(id:number):Promise< GetProductById>,
    countProducts():Promise<number>,
    filterProduct({name,category,maxPrice,minPrice,take,skip}:FilterProductsInput):Promise<FilteredProduct[]>
}


type GetProducts = {
    datas:SelectedProduct[],
    currentPage:number,
    totalPages:number,
    fromCache:boolean
}
export class ProductService  implements IProductService{
    
    constructor(protected product:IProductRepository,protected redis:ICacheProducts){
    }


    public async getProducts( page:number):Promise<GetProducts>{
        const limit = 10
        let countProducts = (await this.redis.getCountAllProducts()) ?? 0
        if ( countProducts <= 0 ) {
            const count = await this.product.countProducts()
            
            if ( count > 0) {
                await this.redis.saveCountAllProducts(count)
                countProducts = count;
            }
        }
        if (countProducts === 0) {
        
             throw new ErrorMessage({
                message:"No products available at the moment.",
                status:204,
                action:"getProducts",
                service:"ProductService",
                context:{
                    page
                }
            })
        }
        const {skip,currentPage,totalPages} = pagination({
            totalItems:countProducts,page,limit
        })
       

        const getProductsInCache = await this.redis.getProductsInCache( currentPage )
  
         if(getProductsInCache && getProductsInCache.length >0 ){
            return {
                datas:getProductsInCache,
                totalPages,currentPage,fromCache:true
            }
        }
 
        const datas = await this.product.getProducts(limit,skip)
        if(datas.length >0)await this.redis.saveProductsInCache( datas,currentPage )

        return{
            datas,totalPages,currentPage,fromCache:false
        }
    }
    public async getProductById(id:number):Promise<GetProductById>{
        try{
            const datas = await this.product.getProductById(id);
            
            return datas
        }catch(err:unknown){
       
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to retrieve products. Please try again later.",
                status:500,
                action:"getProductById",
                service:"ProductService",
                prismaError
            })
        }
    }
   
    public async countProducts():Promise<number>{
        try {
            const count =  await this.product.countProducts();
            if(count)return Number(count);

            return 0;
        } catch (err: unknown) {
           
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to count products in the database",
                status:500,
                action:"countProducts",
                service:"ProductService",
                prismaError
            })
        }

    }
   
    public async filterProduct({name,category,maxPrice,minPrice,take,skip,orderBy}:FilterProductsInput):Promise<FilteredProduct[]>{
        try{
         
            return await this.product.filterProducts({
                name,category,maxPrice,minPrice,take,skip,orderBy
            })
        }catch(err:unknown){
        
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"No products found",
                status:404,
                action:"filterProduct",
                service:"ProductService",
                context:{
                    name,category,maxPrice,minPrice,take,skip,orderBy
                },
                prismaError
            })
        }
    }
}