import { IProductRedisRepository } from "../repository/redis.repository";
import { Product,SelectedProduct } from "../modules/products/types/product.types";
import { CacheStoreId } from "../types/cache.types";

export interface IProductRedisService{
    getCountProductInCache():Promise<number>,
    saveProductInCache(key:string,data:SelectedProduct[]):Promise<any>,
    saveCountProductsInCache(countProducts:number):Promise<void>,
    getProductInCache(key:string):Promise<SelectedProduct[] >,
    getcachedStoreId(key:string):Promise<CacheStoreId | null>,
    saveItemsCache<T>(key:string,datas:T):Promise<void>
}

export class ProductRedisService implements IProductRedisService{
    constructor(private redis:IProductRedisRepository){}
    public async saveProductInCache(key:string,data:SelectedProduct[]):Promise<any>{
        const datas = JSON.stringify(data)
        try{
            await this.redis.saveProductInCache(key,datas)
        }catch(err:any){
            return [];
        }
    }
     public async getProductInCache(key:string):Promise<SelectedProduct[] >{
        try{
            const cachedDatas = await this.redis.getCachedProduct(key)
          
            if(!cachedDatas)return [];
            
            const parsed = JSON.parse(cachedDatas)
            if(!Array.isArray(parsed))return [];
           
            return parsed as Product[] 
        }catch(err:any){
            return [];
        }
    }
   
    public async saveCountProductsInCache(countProducts:number):Promise<void>{
        try{
            await this.redis.saveCountProductsInCache(countProducts);
        }catch(err:any){
            return;
        }
    }
    public async getCountProductInCache():Promise<number>{
        try{
            const count =  await this.redis.getCountProductsInCache();
            if(count)return Number(count);

            return 0;
        }catch(err:any){
            return 0;
        }
    }
    protected async getCacheByKey<T>(key:string):Promise<T | null>{
        try{
            const cachedDatas = await this.redis.getCachedProduct(key)
        
            if(!cachedDatas)return null ;
            
            const parsed = JSON.parse(cachedDatas)
            
            return parsed as T
        }catch{
            return null;
        }
        
    }
    public async saveItemsCache<T>(key:string,datas:T){
        const parsedDatas = JSON.stringify(datas)
        await this.redis.saveProductInCache(key,parsedDatas)
    }
    public async getcachedStoreId(key:string):Promise<CacheStoreId | null>{
        try{
            return await this.getCacheByKey<CacheStoreId>(key)
        }catch{
            return null;
        }
    }
}