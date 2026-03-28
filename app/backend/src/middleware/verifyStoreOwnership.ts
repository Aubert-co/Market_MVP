import { NextFunction ,Request,Response} from "express";
import { checkIsAValidNumber } from "../helpers";
import { IStoreService } from "../modules/store/services/store.services";
import { IProductRedisService } from "../services/redis.services";


export class VerifyStoreOwnership{
    constructor(protected store:IStoreService , protected redis:IProductRedisService){}
    protected getStoreId(req:Request): number | null {
        const bodyStoreId = req.body?.storeId
        const paramsStoreId = req.params?.storeId
        const queryStoreId = req.query?.storeId
  
        if(bodyStoreId && checkIsAValidNumber(bodyStoreId)){
            return Number(bodyStoreId)
        }
        if(paramsStoreId && checkIsAValidNumber(paramsStoreId)){
            return Number(paramsStoreId)
        }
        if(queryStoreId && checkIsAValidNumber(queryStoreId)){
            return Number(queryStoreId)
        }  
        return null
    }
    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
       
       
        const userId = req.user

        const storeId = this.getStoreId(req)
        if(!storeId ){ 
            return res.status(400).send({message:'Invalid store ID.'})
        }
        const key = `user:${userId}:store:${storeId}`
      
        try{
            const getCachedItems = await this.redis.getcachedStoreId(key)
         
            if(getCachedItems)return next();
            
            const check = await this.store.checkOwnerShip(storeId,Number(userId))
           
            if(!check) {
                return res.status(403).send({ message: "You do not have permission to access this store." });
            }
            await this.redis.saveItemsCache(key,{userId,storeId})   
            next()
        } catch(err:unknown) {
           
            return res.status(500).send({ message: "An unexpected error occurred." });
        }
    }
}