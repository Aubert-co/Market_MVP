import { generateImgPath } from "../../../../helpers/checkIsValidImage";
import { ErrorMessage, getPrismaError } from "../../../../helpers/ErrorMessage"
import { IStoreRepository } from "../repository/store.repository"
import { Store } from "../types/store.types";
import { Product } from "../../../products/types/product.types";
import { makeUploadFile } from "../../../../config/imageUpload/uploadFIles";
import { startLogger } from "@/config/logger/logger";




const storage = makeUploadFile()
export interface IStoreService{
    createStore({userId,name,description,fileBuffer,mimeType}:CreateStoreParams): Promise<void>,
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
    fileBuffer:Buffer,
 
    mimeType:string
}
type GetProductByStore ={
    datas:Product[],
    currentPage:number,
    totalPages:number
}
export class StoreService implements IStoreService{
    private readonly logger = startLogger()
    constructor(protected storeRepository:IStoreRepository){}
  
    public async createStore ({name,description,userId,fileBuffer,
        mimeType
    }:CreateStoreParams):Promise<void>{
       
        const imagePath = generateImgPath()
        const imageUrl = `tmp/market/${imagePath}`
        const photo = `market/${imagePath}`
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
      
        const storeId = await this.storeRepository.createStore({
            storeName:name,
            userId,
            photo,
            description
        })
        const isFileUpload = await storage.uploadImage({
            fileBuffer,
            urlPath:imageUrl,
            mimeType
        })
        if(!isFileUpload.success){
            await this.storeRepository.deleteStore(storeId)
            throw new ErrorMessage({
                message:"Failed to save image.",
                service:"ProductAdminService",
                action:"uploadImage",
                status:500
            })
        }
        this.logger.info({
            event: "store_created_success",
            message: "Store created successfully.",
            status: 201,
            action: "createStore",
            storeId,
            userId,
            imageKey: imageUrl,
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
            

            this.logger.info({
                event: "user_stores_selected",
                message: "User stores retrieved successfully.",
                status: 200,
                action: "selectUserStores",
                userId,
                totalStores: datas.length,
            })
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
        
        this.logger.info({
            event: "store_products_listed",
            message: "Store products retrieved successfully.",
            status: 200,
            action: "getProductsByStoreId",
            storeId,
            totalProducts: countProducts,
        })
        return {
            datas,
            totalPages,
            currentPage:page
        }
    }
}