import { BaseRedisServices } from "../../../../services/BaseRedis.service";

export interface IStoreCache {
    saveCacheStoreId(storeId:number,userId:number):Promise<void>
    getCachedStoreId(userId:number,storeId:number):Promise<number | null>
}
const KEY_STOREID =(userId:number,storeId:number)=> `user:${userId}:store:${storeId}`

export class StoreCache extends BaseRedisServices implements IStoreCache{
    async saveCacheStoreId(storeId:number,userId:number):Promise<void>{
       try{
        const key = KEY_STOREID(userId,storeId)
        const expirationTime = 3600;
        await this.saveItemsInCache<number>({
            key,
            data:storeId,
            expirationTime
        })
       }catch{
        return 
       }
    }

    async getCachedStoreId(userId:number,storeId:number):Promise<number | null>{
        try{
            const key = KEY_STOREID(userId,storeId)
            return await this.getCacheByKey<number>(key)
        }catch{
            return null
        }
    }
}