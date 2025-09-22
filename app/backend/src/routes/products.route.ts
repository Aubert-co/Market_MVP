import { prisma } from "../lib/prisma";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.services";
import { Router,Request,Response,NextFunction } from "express";
import { ProductRedisRepository } from "../repository/redis.repository";
import { ProductRedisService } from "../services/redis.services";
import redis from "../lib/redis";
import { ProductsController } from "../controller/products.controller";


const productRepository = new ProductRepository(prisma)
const productRedisRepository = new ProductRedisRepository(redis)
const productRediService = new ProductRedisService( productRedisRepository)

const productService = new ProductService(productRepository,productRediService)

const productsController = new ProductsController(productService,productRediService)

const route = Router()

route.get('/product/category/:category',productsController.GetProductsByCategory)
route.get('/product/page/:page',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetProducts(req,res,next)
);
route.get('/product/:id',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetOneProduct(req,res,next)
)
 
export default route