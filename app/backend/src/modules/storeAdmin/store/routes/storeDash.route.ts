import { makeVerifyStoreMiddle } from "@/factory/makeVerifyStoreMiddle";
import { Auth } from "@/middleware/auth";
import { NextFunction, Request, Response, Router } from "express";
import { StoreDashboardController } from "../controller/storeDash.controller";
import { StoreDashboardService } from "../services/storeDashboard.services";
import { StoreDashboardRep } from "../repository/storeDashboard.repository";
import { prisma } from "@/database/prisma";
import { AdminOrderRep } from "../../orders/repository/orders.repository";
import { StoreRepository } from "../repository/store.repository";
import { StoreCouponRep } from "../../coupon/coupon.repository";

const route = Router()

const orderAdminRep = new AdminOrderRep(prisma)
const storeDashboardRep = new StoreDashboardRep(prisma)
const storeAdminRep = new StoreRepository(prisma)
const couponsAdmin  =new StoreCouponRep(prisma)
const storeService = new StoreDashboardService(orderAdminRep,storeDashboardRep,storeAdminRep,couponsAdmin)
const storeDashboard = new StoreDashboardController(storeService)
route.use(Auth)
route.get('/store/dashboard/:storeId',[(req:Request,res:Response,next:NextFunction)=>makeVerifyStoreMiddle().handler(req,res,next)]
,[
    (req:Request,res:Response,next:NextFunction)=>storeDashboard.dashboard(req,res,next)
])

export default route