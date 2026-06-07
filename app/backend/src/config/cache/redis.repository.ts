import { RedisClientType } from "redis";

export interface IRedisRepository{
    saveItemInCache(key:string,datas:string,expirationTime:number):Promise<void>
    getCachedItem(key:string):Promise<string | null>,
    deleteCacheKey(key:string):Promise<void>,
    redisIncrement(key:string):Promise<void>
}

export class RedisRepository implements IRedisRepository{
    constructor(private redis:RedisClientType){}
    public async saveItemInCache(key:string,datas:string,expirationTime:number):Promise<void>{
       
        await this.redis.set(key,datas,
            {
                expiration: {
                    type: 'EX',
                    value: expirationTime 
                }
            }
        )
    }
    
    public async getCachedItem(key:string):Promise<string | null>{
        return await this.redis.get(key)
    }
    public async deleteCacheKey(key:string):Promise<void>{
        await this.redis.del(key)
    }
    public async redisIncrement(key:string):Promise<void>{
        await this.redis.incr(key)
    }
}