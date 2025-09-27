import { StoreDashboardRep } from "../repository/storeDashboard.repository";
import { StoreDashboardService } from "../services/storeDashboard.services";
import { StoreDashController } from "../controller/storeDash.controller";
import { prisma } from "../lib/prisma";
import { NextFunction, Response, Router,Request } from "express";
import { Auth } from "../middleware/auth";
import { VerifyStoreOwnership } from "../middleware/verifyStoreOwnership";
import { StoreRepository } from "../repository/store.repository";
import { StoreService } from "../services/store.services";

const dashboardRepository = new StoreDashboardRep(prisma)
const storeRep = new StoreRepository(prisma )
const storeService = new StoreService(storeRep)
const dashboardService = new StoreDashboardService(dashboardRepository)
const dashboardController = new StoreDashController( dashboardService )
const verifyStoreOwnership = new VerifyStoreOwnership(storeService)
const route = Router()

route.get('/store/dashboard/:storeId',
    [Auth,
        (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnership.handler(req,res,next)],
    (req:Request,res:Response,next:NextFunction)=>dashboardController.getDashboard(req,res,next)
)

export default route 