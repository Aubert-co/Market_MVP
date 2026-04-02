import { prisma } from "@/lib/prisma";
import { ProductAdminController } from "./producs.controller";
import { Router,Request,Response,NextFunction } from "express"
import { fileUpload } from "@/lib/fileUpload";
import { Auth } from "@/middleware/auth";

import { ProductAdminRepository } from "./products.repository";
import { ProductAdminService } from "./products.services";
import { makeVerifyStoreMiddle } from "@/factory/makeVerifyStoreMiddle";



const productAdminRepository = new ProductAdminRepository(prisma)
const productAdminService = new ProductAdminService(productAdminRepository)


const verifyStoreOwnershipMiddle = makeVerifyStoreMiddle()
const productAdmin = new ProductAdminController(productAdminService)
const route = Router()


route.post('/product/create',[
    fileUpload.single('image')
    ,Auth
    ,(req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
],
  (req:Request,res:Response,next:NextFunction)=> productAdmin.createProduct(req,res,next)
)

export default route