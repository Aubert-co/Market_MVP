import { RedisClientType } from "redis";
export interface IProductRedisRepository{
    saveProductInCache(key:string,datas:string):Promise<void>
    saveCountProductsInCache(countProduct:number):Promise<void>,
    getCountProductsInCache():Promise<string | null>,
    getCachedProduct(key:string):Promise<string | null>,
}

export class ProductRedisRepository implements IProductRedisRepository{
    constructor(private redis:RedisClientType){}
    public async saveProductInCache(key:string,datas:string):Promise<void>{
       
        await this.redis.set(key,datas,
            {
                expiration: {
                    type: 'EX',
                    value: 3600 
                }
            }
        )
    }
    public async saveCountProductsInCache(countProduct:number):Promise<void>{
        await this.redis.set('countProduct',countProduct)
    }
    public async  getCountProductsInCache():Promise<string | null>{
        return await this.redis.get('countProduct')
    }
    public async getCachedProduct(key:string):Promise<string | null>{
        return await this.redis.get(key)
    }
   
}