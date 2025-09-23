import { NextFunction ,Request,Response} from "express";
import { checkIsAValidNumber } from "../helpers";
import { IStoreService } from "../services/store.services";




export class VerifyStoreOwnership{
    constructor(protected store:IStoreService){}
    public getStoreId(params: any, body: any): number {
        const idFromBody = body?.storeId ?? body;
        const idFromParams = params?.storeId ?? params;

        if (checkIsAValidNumber(idFromBody)) {
            return Number(idFromBody);
        }

        if (checkIsAValidNumber(idFromParams)) {
            return Number(idFromParams);
        }

        return 0;
    }
    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
       
       
        const userId = req.user

        const storeId = this.getStoreId(req.params,req.body)
        if(storeId === 0){ 
            return res.status(400).send({message:'Invalid store ID.'})
        }
        try{
            
            const check = await this.store.checkOwnerShip(Number(storeId),Number(userId))
           
            if(!check) {
                return res.status(403).send({ message: "You do not have permission to access this store." });
            }
            next()
        } catch (err: any) {
           
            return res.status(500).send({ message: "An unexpected error occurred." });
        }
    }
}