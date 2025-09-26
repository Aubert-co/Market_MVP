import {  pagination } from "../helpers";
import { generateImgPath } from "../helpers/checkIsValidImage";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { uploadFileToGCS } from "../lib/googleStorage";
import {  IProductRepository,GetProductById } from "../repository/product.repository";
import { Product, Products, SelectedProduct } from "../types/product.types";
import { IProductRedisService } from "./redis.services";

export interface IProductService{
    createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProduct
    ): Promise<void>
    selectByCategory(category:string,limit:number,skip:number ):Promise<Product[]>,
    getProducts(page:number):Promise<GetProducts>,
    getProductById(id:number):Promise< GetProductById>,
    countProducts():Promise<number>,
    deleteProduct(productIds:any,storeId:number):Promise<void>
}

type CreateProduct = Products & {
    mimeType:string,
    fileBuffer:Buffer,
    originalName:string
}
type GetProducts = {
    datas:SelectedProduct[],
    currentPage:number,
    totalPages:number,
    fromCache:boolean
}
export class ProductService  implements IProductService{
    constructor(protected product:IProductRepository,protected redis:IProductRedisService){}

    public async createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProduct
    ): Promise<void> {
        const imageUrl = generateImgPath(originalName)
        
        await this.product.createProduct({
            description,name,stock,storeId,category,
            price,imageUrl
        })
        await uploadFileToGCS({
            fileBuffer,
            mimeType,
            urlPath:imageUrl
        })
    }
    public async selectByCategory( category:string,limit:number,skip:number ):Promise<Product[]>{
        try{
            return await this.product.selectByCategory(category,limit,skip) ;
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        } 
    }
   
    public async getProducts( page:number):Promise<GetProducts>{
        const limit = 10
        let countProducts = await this.redis.getCountProductInCache()
        if ( countProducts <= 0 ) {
            const count = await this.product.countProducts()
            
            if ( count > 0) {
                await this.redis.saveCountProductsInCache(count)
                countProducts = count;
            }
        }
        if (countProducts === 0) {
            throw new ErrorMessage("No products available at the moment.",204)
        }
        const {skip,currentPage,totalPages} = pagination({
            totalItems:countProducts,page,limit
        })
        const key = `product:page:${currentPage}`

        const getProductsInCache =await this.redis.getProductInCache( key )
  
         if(getProductsInCache.length >0 ){
            return {
                datas:getProductsInCache,
                totalPages,currentPage,fromCache:true
            }
        }
 
        const datas = await this.product.getProducts(limit,skip)
        if(datas.length >0)await this.redis.saveProductInCache( key ,datas)

        return{
            datas,totalPages,currentPage,fromCache:false
        }
    }
    public async getProductById(id:number):Promise<GetProductById>{
        try{
            const datas = await this.product.getProductById(id);
            
            return datas
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
    }
   
    public async countProducts():Promise<number>{
        try {
            const count =  await this.product.countProducts();
            if(count)return Number(count);

            return 0;
        } catch (err: any) {
            throw new ErrorMessage("Failed to count products in the database", 500);
        }

    }
   
   
    public async deleteProduct(productIds:any,storeId:number):Promise<void>{
        if (!Array.isArray(productIds) || productIds.length === 0) {
            throw new ErrorMessage("Invalid product IDs provided.",400)
        }
       
    }
}