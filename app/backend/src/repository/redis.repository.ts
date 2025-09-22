import { RedisClientType } from "redis";
export interface IProductRedisRepository{
    saveProductInCache(key:string,datas:string):Promise<void>
    saveCountProductsInCache(countProduct:number):Promise<void>,
    getCountProductsInCache():Promise<string | null>,
    getCachedProduct(key:string):Promise<string | null>,
    saveRecentCategories(category:string,userId:number):Promise<void>,
    getRecentCategories(userId: number): Promise<string[]>,
    
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
     public async saveRecentCategories(category:string,userId:number):Promise<void>{
        const key = `user${userId}:recent_categories`;
        await this.redis.lRem(key, 0, category);
        await this.redis.lPush(key,category);
        await this.redis.lTrim(key,0,4);
    }
    public async getRecentCategories(userId: number): Promise<string[]> {
        const categories = await this.redis.lRange(`user:${userId}:recent_categories`, 0, -1);
        return categories;
    }
}