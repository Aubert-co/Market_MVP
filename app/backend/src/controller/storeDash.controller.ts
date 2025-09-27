import { NextFunction, Request, Response } from "express";
import { StoreDashboardService } from "services/storeDashboard.services";

export class StoreDashController{
    constructor(protected storeDashService:StoreDashboardService){}

    public async getDashboard(req:Request,res:Response,next:NextFunction){
        try{
            const storeId = req.params.storeId
            const datas = await this.storeDashService.getDashboard(Number(storeId))

            return res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
}