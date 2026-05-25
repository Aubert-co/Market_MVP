import { StoreCouponRep } from "./coupon.repository"
import { CouponStoreService } from "./coupon.services"
import { Request,Response,NextFunction, Router } from "express"
import { prisma } from "@/database/prisma"
import { CouponStoreController } from "./coupon.controller"
import { Auth } from "@/middleware/auth"
import { makeVerifyStoreMiddle } from "@/factory/makeVerifyStoreMiddle"

const route = Router()
const couponRepository = new StoreCouponRep(prisma)
const couponService = new CouponStoreService(couponRepository)

const verifyStoreOwnershipMiddle = makeVerifyStoreMiddle()

const couponController = new CouponStoreController(couponService)

route.get('/stores/coupons/:storeId',[
  Auth,
  (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)],
  (req:Request,res:Response,next:NextFunction)=>couponController.storeGetCoupons(req,res,next)
)
route.post('/stores/coupons',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
    ],
    (req:Request,res:Response,next:NextFunction)=>couponController.storeCreateCoupon(req,res,next)
)

export default route