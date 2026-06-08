import { BaseRedisServices } from "../../../config/cache/BaseRedis.service";
import { SelectedProduct } from "../types/product.types";

const keyCachedPageProduct = (page:number,version:number)=>`products:v${version}:page:${page}`
const COUNT_ALL_PRODUCTS = "count:all:products"
const VERSION_PAGE = "list-version"
export interface ICacheProducts {
    saveProductsInCache(data:SelectedProduct[],page:number):Promise<void>
    getProductsInCache(page:number):Promise<SelectedProduct[] | null>
    saveCountAllProducts(data:number):Promise<void>
    getCountAllProducts():Promise<null | number>,
    cleanProductsCache():Promise<void>
}
export class CacheProducts extends BaseRedisServices implements ICacheProducts{
    
    async saveProductsInCache(data:SelectedProduct[],page:number){
        try{
            
            let version = await this.getCacheByKey<number>(VERSION_PAGE)
            if(!version){
                version=1
            }
            const key = keyCachedPageProduct(page,version)
            await this.saveItemsInCache<SelectedProduct[]>({
                data,
                key,
                expirationTime:3600
            })
            await this.incrementCache(VERSION_PAGE)
        }catch{
            return
        }
    }
    async getProductsInCache(page:number):Promise<SelectedProduct[] | null>{
       try{
            let version = await this.getCacheByKey<number>(VERSION_PAGE)
            if(!version){
                version = 1
            }
            const key = keyCachedPageProduct(page,version)
            return await this.getCacheByKey<SelectedProduct[]>(key)
       }catch{
            return null
       }
    }
    async saveCountAllProducts(data:number){
       try{
            await this.saveItemsInCache<number>({
                data,
                key:COUNT_ALL_PRODUCTS,
                expirationTime:3600
            })  
        }catch{
            return 
        }
    }
    async getCountAllProducts():Promise<null | number>{
        try{
            const countProducts  =await this.getCacheByKey<string>(COUNT_ALL_PRODUCTS)

            return Number(countProducts) 
        }catch{
            return null
        }
    }
    async incrementCacheVersion(key:string): Promise<void> {
        try{
            await this.incrementCache(key)
        }   catch{
            return 
        } 
    }
    async cleanProductsCache():Promise<void>{
        try{
            await Promise.all([
                this.incrementCache(VERSION_PAGE),
                this.deleteCache(COUNT_ALL_PRODUCTS)
            ])
        }catch{
            return
        }
    }
} 