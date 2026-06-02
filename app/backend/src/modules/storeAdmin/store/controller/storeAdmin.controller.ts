import { NextFunction, Response,Request } from "express";
import { StoreService } from "../services/store.services";
import { checkIsAValidInteger } from "../../../../helpers/checkIsValid";
import { checkIsValidImage } from "@/helpers/checkIsValidImage";
import { ErrorMessage } from "@/helpers/ErrorMessage";



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
           
            let page = req.query.page
            let storeId =  Number(req.params.storeId)
            let pageNumber = checkIsAValidInteger(page) ? Number(page) : 1
           
            const {datas ,totalPages,currentPage} = await this.storeService.getProductsByStoreId(storeId,pageNumber)

            res.status(200).send({message:'Sucess',datas,totalPages,currentPage})
        }catch(error:any){
            next(error)
        }
    }
    public async CreateStore(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            
            if (
                !req.file ||
                !checkIsValidImage({
                    fileBuffer: req.file.buffer,
                    mimeType: req.file.mimetype,
                    originalFileName: req.file.originalname,
                })
                ) {
                    throw new ErrorMessage({
                        message:"Invalid or missing image file.",
                        status:422,
                        action:"CreateStore",
                        service:"StoreAdminController"
                    })
            }
 
        
            const {name,description} = req.body
            const userId = req.user;
            const {buffer,mimetype} = req.file
            
            await this.storeService.createStore({name,description,
                userId,fileBuffer:buffer,mimeType:mimetype
            })
            res.status(201).send({message:"Store sucessfully created"})
        }catch(error:any){
            next(error)
        }
    }
}