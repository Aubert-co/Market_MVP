import { SaveItemsCacheDTO } from "types/cache.types";
import { IRedisRepository } from "../repository/redis.repository";



export abstract class BaseRedisServices {
    constructor(protected redis:IRedisRepository){}

    protected async getCacheByKey<T>(key:string):Promise<T | null>{
        
        const cachedDatas = await this.redis.getCachedItem(key)
    
        if(!cachedDatas)return null ;
        
        const parsed = JSON.parse(cachedDatas)
        
        return parsed as T
    }
    protected async saveItemsInCache<T>({data,key,expirationTime=3600}:SaveItemsCacheDTO<T>):Promise<void>{
        const datas = JSON.stringify(data)
        await this.redis.saveItemInCache(key,datas,expirationTime)
    }
}