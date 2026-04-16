import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "@/lib/prisma";
import { Auth } from "@/middleware/auth";

import { makeVerifyStoreMiddle } from "@/factory/makeVerifyStoreMiddle";
import { AdminOrderRep } from "./orders.repository";
import { AdminOrderService } from "./orders.services";
import { AdminOrdersControl } from "./orders.controller";

const route = Router()
const ordersRepository = new AdminOrderRep(prisma)
const ordersService = new AdminOrderService(ordersRepository)
const ordersController = new AdminOrdersControl(ordersService)


route.use(Auth)

route.get('/stores/:storeId/orders',
    [(req:Request,res:Response,next:NextFunction)=>makeVerifyStoreMiddle().handler(req,res,next)],
    (req:Request,res:Response,next:NextFunction)=>ordersController.searchOrders(req,res,next)
)

route.get('/stores/:storeId/lastOrders',
    [(req:Request,res:Response,next:NextFunction)=>makeVerifyStoreMiddle().handler(req,res,next)],
    (req:Request,res:Response,next:NextFunction)=>ordersController.getLastOrders(req,res,next)
)
export default route