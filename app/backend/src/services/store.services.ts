import { IProductRepository } from "../repository/product.repository";
import { generateImgPath } from "../helpers/checkIsValidImage";
import { ErrorMessage } from "../helpers/ErrorMessage"
import { uploadFileToGCS } from "../lib/googleStorage";
import { IStoreRepository } from "../repository/store.repository"
import { Store } from "../types/store.types";
import { Product } from "../types/product.types";

export interface IStoreService{
    createStore({userId,name,description,buffer,originalName,mimeType}:CreateStoreParams): Promise<void>,
    checkOwnerShip(storeId:number,userId:number):Promise<boolean>,
    findByName(storeName:string):Promise<boolean>,
    selectUserStores(userId:number):Promise<Store[]>,
    getProductsByStoreId(storeId:number,page:number):Promise<GetProductByStore>
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
   
    constructor(protected storeRepository:IStoreRepository,protected product:IProductRepository){}
  
    public async createStore ({name,description,userId,buffer,
        originalName,mimeType
    }:CreateStoreParams):Promise<void>{
       
        const newUrlPath = generateImgPath(originalName)
        
        const existsStoreName = await this.storeRepository.findByName( name )
        if(existsStoreName)throw new ErrorMessage("A store with this name already exists.",409)

        await this.storeRepository.createStore({storeName:name,
            userId,photo:newUrlPath,description
        })
        await uploadFileToGCS({
            fileBuffer:buffer,urlPath:newUrlPath,
            mimeType
        })
       
    }
    public async findByName(storeName:string):Promise<boolean>{
        try{
            const datas =  await this.storeRepository.findByName(storeName)
            if(!datas)return false;

            return true;
        }catch(err:any){
            throw new ErrorMessage("Failed to find a store",409)
        }
    }
    public async checkOwnerShip(storeId:number,userId:number):Promise<boolean>{
        try{
            const datas = await this.storeRepository.checkStoreOwnerShip(storeId)
            return datas?.userId === userId;
        }catch(err:any){
            throw new ErrorMessage("Failed to find a store",409)
        }
    }
    public async selectUserStores(userId:number):Promise<Store[]>{
        try{
            const datas = await this.storeRepository.selectUserStores(userId)
            if(!datas && datas.length <0)return [];

            return datas ;
        }catch(err:any){
            throw new ErrorMessage("Failed to find a store",409)
        }
    }
     public async getProductsByStoreId(storeId:number,page:number):Promise<GetProductByStore>{
        const limit = 10
        
        const countProducts = await this.product.countProductStore(storeId);
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
        const datas = await this.product.getProductsByStoreId(storeId,skip,limit)
        return {
            datas,
            totalPages,
            currentPage:page
        }
    }
}