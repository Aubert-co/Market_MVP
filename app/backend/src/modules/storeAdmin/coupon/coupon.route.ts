

import { CouponRepository } from "@/modules/coupon/repository/coupon.repository"
import { CouponStore } from "./coupon.services"
import { Request,Response,NextFunction, Router } from "express"
import { prisma } from "@/lib/prisma"
import { CouponStoreController } from "./coupon.controller"
import { Auth } from "@/middleware/auth"
import { makeVerifyStoreMiddle } from "@/factory/makeVerifyStoreMiddle"

const route = Router()
const couponRepository = new CouponRepository(prisma)
const couponService = new CouponStore(couponRepository)

const verifyStoreOwnershipMiddle = makeVerifyStoreMiddle()

const couponController = new CouponStoreController(couponService)

route.get('/store/coupons/:storeId',[
  Auth,
  (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)],
  (req:Request,res:Response,next:NextFunction)=>couponController.storeGetCoupons(req,res,next)
)
route.post('/store/create/coupon',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
    ],
    (req:Request,res:Response,next:NextFunction)=>couponController.storeCreateCoupon(req,res,next)
)

export default route