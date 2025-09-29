import { ProductRedisRepository } from "../repository/redis.repository";
import {  pagination } from "../helpers";
import { generateImgPath } from "../helpers/checkIsValidImage";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { uploadFileToGCS } from "../lib/googleStorage";
import {  IProductRepository } from "../repository/product.repository";
import {  Products, SelectedProduct ,GetProductById, FilteredProduct,FilterProductsInput} from "../types/product.types";
import { IProductRedisService, ProductRedisService } from "../services/redis.services";
import redis from "../lib/redis";

export interface IProductService{
    createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProduct
    ): Promise<void>
  
    getProducts(page:number):Promise<GetProducts>,
    getProductById(id:number):Promise< GetProductById>,
    countProducts():Promise<number>,
   
    filterProduct({name,category,maxPrice,minPrice,take,skip}:FilterProductsInput):Promise<FilteredProduct[]>
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
    protected redis: IProductRedisService
    constructor(protected product:IProductRepository){
        const redisRep = new ProductRedisRepository(redis)
        this.redis = new ProductRedisService(redisRep)
    }

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
   
    public async filterProduct({name,category,maxPrice,minPrice,take,skip}:FilterProductsInput):Promise<FilteredProduct[]>{
        try{
         
            return await this.product.filterProducts({
                name,category,maxPrice,minPrice,take,skip
            })
        }catch(err:any){
            throw new ErrorMessage("No products found",404)
        }
    }
}