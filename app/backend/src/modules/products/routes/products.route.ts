import { prisma } from "../../../lib/prisma";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.services";
import { Router,Request,Response,NextFunction } from "express";
import { ProductsController } from "../controller/products.controller";
import { CacheProducts } from "../cache/product.cache";
import { RedisRepository } from "../../../repository/redis.repository";
import redis from "../../../lib/redis";
import { ViewsRepository } from "@/modules/views/repository/views.repository";
import { ViewsServices } from "@/modules/views/services/views.services";
import { userSessionMiddleware } from "@/middleware/userSession.middeware";

const productRepository = new ProductRepository(prisma)
const redisRepository = new RedisRepository(redis)
const cacheProducts = new CacheProducts(redisRepository)
const productService = new ProductService(productRepository,cacheProducts)
const viewRepository = new ViewsRepository(prisma)
const viewService = new ViewsServices(viewRepository)
const productsController = new ProductsController(productService,viewService)

const route = Router()


route.post('/product/filter',
    (req:Request,res:Response,next:NextFunction)=>productsController.filterProducts(req,res,next)
)
route.get('/product/page/:page',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetProducts(req,res,next)
);
route.get('/product/:id',
    [(req:Request,res:Response,next:NextFunction)=>userSessionMiddleware(req,res,next)],
    (req:Request,res:Response,next:NextFunction)=> productsController.GetOneProduct(req,res,next)
)
 
export default route