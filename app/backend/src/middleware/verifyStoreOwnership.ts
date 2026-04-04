import { NextFunction ,Request,Response} from "express";
import {  checkIsAValidInteger } from "@/helpers/checkIsValid";
import { IStoreService } from "@/modules/storeAdmin/store/services/store.services";
import { IStoreCache } from "@/modules/storeAdmin/store/cache/store.cache";


export class VerifyStoreOwnership{
    constructor(protected store:IStoreService , protected redis:IStoreCache){}
    protected getStoreId(req:Request): number | null {
        const bodyStoreId = req.body?.storeId
        const paramsStoreId = req.params?.storeId
        const queryStoreId = req.query?.storeId
  
        if(bodyStoreId && checkIsAValidInteger(bodyStoreId)){
            return Number(bodyStoreId)
        }
        if(paramsStoreId && checkIsAValidInteger(paramsStoreId)){
            return Number(paramsStoreId)
        }
        if(queryStoreId && checkIsAValidInteger(queryStoreId)){
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
        
      
        try{
            const getCachedItems = await this.redis.getCachedStoreId(userId,storeId)
         
            if(getCachedItems)return next();
            
            const check = await this.store.checkOwnerShip(storeId,Number(userId))
           
            if(!check) {
                return res.status(403).send({ message: "You do not have permission to access this store." });
            }
            await this.redis.saveCacheStoreId(storeId,userId)   
            next()
        } catch(err:unknown) {
           
            return res.status(500).send({ message: "An unexpected error occurred." });
        }
    }
}