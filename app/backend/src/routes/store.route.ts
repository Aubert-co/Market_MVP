import { Router,NextFunction,Request,Response} from 'express'
import { StoreAdminController } from '../controller/storeAdmin.controller'
import { ValidateImageAndFields } from '../middleware/validateImgAndFiles'
import { Auth } from '../middleware/auth'
import { StoreService } from '../services/store.services'
import { prisma } from '../lib/prisma'
import { StoreRepository } from '../repository/store.repository'
import { ProductRepository } from '../repository/product.repository'
import { VerifyStoreOwnership } from '../middleware/verifyStoreOwnership'
import { fileUpload } from '../lib/fileUpload'

const validateImageAndFields = new  ValidateImageAndFields
const productRepository = new ProductRepository(prisma)
const storeRepository = new StoreRepository(prisma)
const storeService = new StoreService(storeRepository,productRepository)
const storeAdminController = new StoreAdminController(storeService)
const verifyStoreOwnershipMiddle = new VerifyStoreOwnership(storeService)
const route = Router()
 
route.get('/store/mystores',[Auth],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetUserStores(req,res,next));

route.get('/admin/store/products/:storeId/:page',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetProductFromStore(req,res,next)
);
route.post('/store/create',[fileUpload.single('image'),Auth,
    validateImageAndFields.handler
],(req:Request,res:Response,next:NextFunction)=>storeAdminController.CreateStore(req,res,next))


export default route