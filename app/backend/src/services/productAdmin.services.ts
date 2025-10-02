import { generateImgPath } from "../helpers/checkIsValidImage";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { uploadFileToGCS } from "../lib/googleStorage";
import {  IProductAdminRepository } from "../repository/productAdmin.repository";
import {  Products } from "../types/product.types";


export interface IProductAdminService{
    createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProduct
    ): Promise<void>
    
    deleteProduct(productIds:any,storeId:number):Promise<void>
}

type CreateProduct = Products & {
    mimeType:string,
    fileBuffer:Buffer,
    originalName:string
}

export class ProductAdminService  implements IProductAdminService{
    constructor(protected product:IProductAdminRepository){}

    public async createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProduct
    ): Promise<void> {
        
        const countProducts = await this.product.countStoreProducts(storeId)
        if (countProducts >= 10){
            throw new ErrorMessage("Product creation limit reached: maximum 10 products allowed", 429);
        }
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
   
    public async deleteProduct(productIds:any,storeId:number):Promise<void>{
        if (!Array.isArray(productIds) || productIds.length === 0) {
            throw new ErrorMessage("Invalid product IDs provided.",400)
        }
       
    }
}