import { NextFunction, Response,Request } from "express";
import { StoreService } from "../services/store.services";
import { checkIsAValidNumber } from "../helpers";



export class StoreAdminController{
    constructor(protected storeService:StoreService){}
    public async GetUserStores(req:Request,res:Response,next:NextFunction):Promise<any>{
         try{
            const userId = req.user
            const stores = await this.storeService.selectUserStores(userId)
            
            res.status(200).send({message:'Sucess',datas:stores})
        }catch(err:any){
            next(err)
        }
    }
    public async GetProductFromStore(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
           
            let page = 1
            let storeId =  Number(req.params.storeId)

            if(checkIsAValidNumber(req.params?.page)){
                page  = Number(req.params.page)
            }
            const {datas ,totalPages,currentPage} = await this.storeService.getProductsByStoreId(storeId,page)

            res.status(200).send({message:'Sucess',datas,totalPages,currentPage})
        }catch(error:any){
            next(error)
        }
    }
    public async CreateStore(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            if (!req.file ){
                return res.status(422).send({message:"Invalid or missing image file."});
            }
 
        
            const {name,description} = req.body
            const userId = req.user;
            const {buffer,originalname,mimetype} = req.file
            
            await this.storeService.createStore({name,description,
                userId,buffer,originalName:originalname,mimeType:mimetype
            })
            res.status(201).send({message:"Store sucessfully created"})
        }catch(error:any){
            next(error)
        }
    }
}