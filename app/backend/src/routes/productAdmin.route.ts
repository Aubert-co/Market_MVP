import { prisma } from "../lib/prisma";
import { ProductAdminController } from "../controller/productAdmin.controller";
import { Router,Request,Response,NextFunction } from "express"
import { fileUpload } from "../lib/fileUpload";
import { Auth } from "../middleware/auth";
import { VerifyStoreOwnership } from "../middleware/verifyStoreOwnership";
import { ProductRepository } from "../repository/product.repository";
import { StoreRepository } from "../repository/store.repository";
import { ProductAdminRepository } from "../repository/productAdmin.repository";
import { StoreService } from "../services/store.services";
import { ProductAdminService } from "../services/productAdmin.services";

const storeRepository = new StoreRepository(prisma)
const productRepository = new ProductRepository(prisma)
const productAdminRepository = new ProductAdminRepository(prisma)
const productAdminService = new ProductAdminService(productAdminRepository)
const storeService = new StoreService(storeRepository,productRepository)

const verifyStoreOwnershipMiddle = new VerifyStoreOwnership(storeService)
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