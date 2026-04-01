import { generateImgPath } from "../../../helpers/checkIsValidImage";
import { ErrorMessage, getPrismaError } from "../../../helpers/ErrorMessage"

import { IStoreRepository } from "../repository/store.repository"
import { Store } from "../types/store.types";
import { Product } from "../../products/types/product.types";
import { makeUploadFile } from "../../../factory/uploadFIles";



const storage = makeUploadFile()
export interface IStoreService{
    createStore({userId,name,description,buffer,originalName,mimeType}:CreateStoreParams): Promise<void>,
    checkOwnerShip(storeId:number,userId:number):Promise<boolean>,
    findByName(storeName:string):Promise<boolean>,
    selectUserStores(userId:number):Promise<Store[]>,
    getProductsByStoreId(storeId:number,page:number):Promise<GetProductByStore>
    countProductStore(storeId:number):Promise<number>,
} 
type CreateStoreParams = {
    userId:number,
    name:string,
    description:string,
    buffer:Buffer,
    originalName:string,
    mimeType:string
}
type GetProductByStore ={
    datas:Product[],
    currentPage:number,
    totalPages:number
}
export class StoreService implements IStoreService{
   
    constructor(protected storeRepository:IStoreRepository){}
  
    public async createStore ({name,description,userId,buffer,
        originalName,mimeType
    }:CreateStoreParams):Promise<void>{
       
        const newUrlPath = generateImgPath(originalName)
        
        const existsStoreName = await this.storeRepository.findByName( name )
        if(existsStoreName){
            throw new ErrorMessage({message:"A store with this name already exists.",
                status:409,
                service:"StoreService",
                action:"createStore"
            })
        }
        const userAlreadyHaveStore = await this.storeRepository.selectUserStores( userId )
        if( userAlreadyHaveStore.length >0){
            throw new ErrorMessage({
                message:"User already has a store", 
                status:409,
                service:"StoreService",
                action:"createStore"
            })
            
        }
        
        await this.storeRepository.createStore({
            storeName:name,
            userId,
            photo:newUrlPath,
            description
        })
        await storage.uploadImage({
            fileBuffer:buffer,
            urlPath:newUrlPath,
            mimeType
        })
       
    }
    public async findByName(storeName:string):Promise<boolean>{
        try{
            const datas =  await this.storeRepository.findByName(storeName)
            if(!datas)return false;

            return true;
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({message:"Failed to find a store",
                status:409,
                service:"StoreService",
                action:"findByName",
                prismaError
            })
        }
    }
    public async checkOwnerShip(storeId:number,userId:number):Promise<boolean>{
        try{
            const datas = await this.storeRepository.checkStoreOwnerShip(storeId)
            return datas?.userId === userId;
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to find a store",
                status:409,
                service:"StoreService",
                action:"checkOwnerShip",
                prismaError
            })
        }
    }
    public async selectUserStores(userId:number):Promise<Store[]>{
        try{
            const datas = await this.storeRepository.selectUserStores(userId)
            if(datas.length ===0)return [];

            return datas ;
        }catch(err:unknown){
            const prismaError  =getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to find a store",
                status:409,
                prismaError,
                action:"selecUserStores",
                service:"StoreService"
            })
        }
    }
     public async countProductStore(storeId:number):Promise<number>{
        try{
            const count =  await this.storeRepository.countProductStore(storeId)
            if(!count)return 0

            return count;
        }catch(err:unknown){
            return 0;
        }
    }
     public async getProductsByStoreId(storeId:number,page:number):Promise<GetProductByStore>{
        const limit = 10
        
        const countProducts = await this.countProductStore(storeId);
        if(countProducts  ===0){
            return {
                datas:[],
                totalPages:0,
                currentPage:0
            }
        }
        const totalPages = Math.ceil(countProducts/limit)
        
        if(page >totalPages) page = totalPages;
        
        const skip = (page -1 )* limit
        const datas = await this.storeRepository.getProductsByStoreId(storeId,skip,limit)
        return {
            datas,
            totalPages,
            currentPage:page
        }
    }
}