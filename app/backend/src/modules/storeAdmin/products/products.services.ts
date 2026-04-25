import { generateImgPath } from "@/helpers/checkIsValidImage";
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage";
import {  IProductAdminRepository } from "./products.repository";
import { IImageUploadService } from "@/services/ImageUploadService";
import { compressImage } from "@/helpers/compressImages";
import { FuncReturn, retry } from "@/helpers/retry";
import {  productMostViewedResult, GetStoreProductResult,GetStoreProductsPage, CreateProductDTO } from "./products.types";
import { calcSkipPages, pagination } from "@/helpers/pagination";



export interface IProductAdminService{
    createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProductDTO
    ): Promise<void>
    productMostViewed(storeId:number):Promise<productMostViewedResult[]>
   getStoreProducts({storeId,search,category,orderBy,take,page}:GetStoreProductsPage ):Promise<GetStoreProductResult>
}


export class ProductAdminService  implements IProductAdminService{
    
    constructor(protected product:IProductAdminRepository ,protected storage:IImageUploadService){
        
    }
    public async getStoreProducts({ storeId, search, category, orderBy, take ,page}: GetStoreProductsPage): Promise<GetStoreProductResult> {
       try{
        const skip = calcSkipPages(page,take)
        const {datas,pageInfo} =  await this.product.getStoreProducts({
            storeId,skip,search,category,orderBy,take,
        })
        const {skip:skipPage,currentPage,totalPages}=pagination({
            totalItems:pageInfo.totalItems,page,limit:take
        })
        return {
            datas,
            pagination:{
                skip:skipPage,currentPage,totalPages
            }
        }
         
       }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get store products.",
                service:"ProductAdminService",
                status:500,
                prismaError,
                action:"getStoresProducts"
            })
       }
    }
    public async productMostViewed(storeId: number): Promise<productMostViewedResult[]> {
        try{
           
            return await this.product.productMostViewed(storeId)
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get store most viewd products.",
                service:"ProductAdminService",
                status:500,
                prismaError,
                action:"productMostViewed"
            })
        }
    }
    public async createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProductDTO
    ): Promise<void> {
        
        const countProducts = await this.product.countStoreProducts(storeId)
        if (countProducts >= 10){
            throw new ErrorMessage({
                message:"Product creation limit reached: maximum 10 products allowed",
                status:429,
                action:"createProduct",
                service:"ProductAdminService",
                context:{
                    countProducts
                }
            })
        }
        const imageUrl = generateImgPath(originalName)
        
        const compressBuff:FuncReturn<Buffer> = await retry({
            func:compressImage,
            body:{fileBuffer},
            retries:2
        })

        if(!compressBuff.success || compressBuff.data===undefined ){
            throw new ErrorMessage({
                message:"Failed to compress.",
                action:"compressImage",
                service:"ProductAdminService",
                status:500
            })
        }
        const productId = await this.product.createProduct({
            description,name,stock,storeId,category,
            price,imageUrl
        })
        
        const uploadImage =await retry({
            func:this.storage.uploadImage,
            body:{mimeType,urlPath:imageUrl,fileBuffer:compressBuff.data},
            retries:2
        })
    
        if(!uploadImage.success){
            await this.product.deleteProduct(productId)
            
            throw new ErrorMessage({
                message:"Failed to save image.",
                service:"ProductAdminService",
                action:"uploadImage",
                status:500
            })
        }
    }
   
    
}