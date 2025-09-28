import { prisma } from "../lib/prisma";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.services";
import { Router,Request,Response,NextFunction } from "express";
import { ProductsController } from "../controller/products.controller";


const productRepository = new ProductRepository(prisma)


const productService = new ProductService(productRepository)

const productsController = new ProductsController(productService)

const route = Router()

route.post('/product/filter',
    (req:Request,res:Response,next:NextFunction)=>productsController.filterProducts(req,res,next)
)
route.get('/product/page/:page',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetProducts(req,res,next)
);
route.get('/product/:id',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetOneProduct(req,res,next)
)
 
export default route