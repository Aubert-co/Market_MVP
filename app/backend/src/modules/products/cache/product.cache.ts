import { BaseRedisServices } from "../../../services/BaseRedis.service";
import { SelectedProduct } from "../types/product.types";

const keyCachedPageProduct = (page:number)=>`product:page:${page}`
const COUNT_ALL_PRODUCTS = "count:all:products"

export interface ICacheProducts {
    saveProductsInCache(data:SelectedProduct[],page:number):Promise<void>
    getProductsInCache(page:number):Promise<SelectedProduct[] | null>
    saveCountAllProducts(data:number):Promise<void>
    getCountAllProducts():Promise<null | number>
}
export class CacheProducts extends BaseRedisServices implements ICacheProducts{
    
    async saveProductsInCache(data:SelectedProduct[],page:number){
        try{
            const key = keyCachedPageProduct(page)

            await this.saveItemsInCache<SelectedProduct[]>({
                data,
                key,
                expirationTime:3600
            })
        }catch{
            return
        }
    }
    async getProductsInCache(page:number):Promise<SelectedProduct[] | null>{
       try{
            const key = keyCachedPageProduct(page)
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
} 