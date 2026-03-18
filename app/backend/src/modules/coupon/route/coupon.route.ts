import { CouponController } from "../controller/coupon.controller"

import { CouponRepository } from "../repository/coupon.repository"
import { CouponServices } from "../services/coupon.services"
import { Request,Response,NextFunction, Router } from "express"
import { prisma } from "../../../lib/prisma"

import { Auth } from "../../../middleware/auth"
import { makeVerifyStoreMiddle } from "../../../factory/makeVerifyStoreMiddle"


const route = Router()
const couponRepository = new CouponRepository(prisma,)
const couponService = new CouponServices(couponRepository)

const verifyStoreOwnershipMiddle = makeVerifyStoreMiddle()

const couponController = new CouponController(couponService)
route.post('/store/create/coupon',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
    ],
    (req:Request,res:Response,next:NextFunction)=>couponController.storeCreateCoupon(req,res,next)
)
route.post('/user/add/coupon',[Auth],
    (req:Request,res:Response,next:NextFunction)=>couponController.userAddCoupon(req,res,next)
)
route.get('/user/list/coupons',[Auth],
  (req:Request,res:Response,next:NextFunction)=>couponController.userListCoupons(req,res,next)
)
route.get('/coupon/available/:page',(req:Request,res:Response,next:NextFunction)=>
  couponController.getAvailableCoupons(req,res,next)
)
route.get('/store/coupons/:storeId',[
  Auth,
  (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)],
  (req:Request,res:Response,next:NextFunction)=>couponController.storeGetCoupons(req,res,next)
)
export default route