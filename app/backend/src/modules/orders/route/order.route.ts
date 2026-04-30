import { NextFunction, Request, Response, Router } from "express";
import { OrdersController } from "../controller/order.controller";
import { prisma } from "../../../lib/prisma";
import { Auth } from "../../../middleware/auth";
import { CouponRepository } from "../../coupon/repository/coupon.repository";
import { OrderRepository } from "../repository/order.repository";
import { OrderService } from "../services/order.services";


const route = Router()
const couponRepository = new CouponRepository(prisma)
const orderRepository = new OrderRepository(prisma,couponRepository)

const orderService = new OrderService( orderRepository )
const orderController = new OrdersController( orderService)

route.post('/orders',
    [Auth],
    (req:Request,res:Response,next:NextFunction)=>orderController.userCreateOrder(req,res,next)
)
route.get('/orders',
    [Auth],
    (req:Request,res:Response,next:NextFunction)=>orderController.getUserOrders(req,res,next)
)
export default route