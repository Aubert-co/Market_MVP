import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "@/lib/prisma";
import { Auth } from "@/middleware/auth";

import { makeVerifyStoreMiddle } from "@/factory/makeVerifyStoreMiddle";
import { OrdersRepository } from "./orders.repository";
import { OrdersServices } from "./orders.services";
import { OrdersController } from "./orders.controller";

const route = Router()
const ordersRepository = new OrdersRepository(prisma)
const ordersService = new OrdersServices(ordersRepository)
const ordersController = new OrdersController(ordersService)

route.use(Auth)
route.use(makeVerifyStoreMiddle)

route.get('/stores/:storeId/orders',
   
    (req:Request,res:Response,next:NextFunction)=>ordersController.searchOrders(req,res,next)
)
export default route