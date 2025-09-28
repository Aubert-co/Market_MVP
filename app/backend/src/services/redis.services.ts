import { IProductRedisRepository } from "../repository/redis.repository";
import { Product,SelectedProduct } from "../types/product.types";

export interface IProductRedisService{
    getCountProductInCache():Promise<number>,
    saveProductInCache(key:string,data:SelectedProduct[]):Promise<any>,
    saveCountProductsInCache(countProducts:number):Promise<void>,
    getProductInCache(key:string):Promise<SelectedProduct[] >
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
}