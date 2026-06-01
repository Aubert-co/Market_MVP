import { NextFunction, Request, Response } from "express";

import { IStoreDashboardService } from "../services/storeDashboard.services";


export class StoreDashboardController{
    constructor(protected store:IStoreDashboardService){}

    async dashboard(req:Request,res:Response,next:NextFunction){
        try{
            const storeId = Number(req.params.storeId)
            const datas = await this.store.dashboard(storeId)
            
            res.status(200).send({
                message:"Success",
                ...datas
            })
        }catch(err:unknown){
            console.log(err)
            next(err)
        }
    }
}