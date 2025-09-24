import { NextFunction, Request, Response, Router } from "express";
import { OrdersController } from "../controller/order.controller";
import { prisma } from "../lib/prisma";
import { Auth } from "../middleware/auth";
import { CouponRepository } from "../repository/coupon.repository";
import { OrderRepository } from "../repository/order.repository";
import { OrderService } from "../services/order.services";


const route = Router()

const orderRepository = new OrderRepository(prisma,couponRepository)

const couponRepository = new CouponRepository(prisma)
const orderService = new OrderService( orderRepository )
const orderController = new OrdersController( orderService)

route.post('/order/create',
    [Auth],
    (req:Request,res:Response,next:NextFunction)=>orderController.userCreateOrder(req,res,next)
)

export default route