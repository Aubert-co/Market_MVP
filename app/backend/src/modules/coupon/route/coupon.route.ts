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

route.post('/user/add/coupon',[Auth],
    (req:Request,res:Response,next:NextFunction)=>couponController.userAddCoupon(req,res,next)
)
route.get('/user/list/coupons',[Auth],
  (req:Request,res:Response,next:NextFunction)=>couponController.userListCoupons(req,res,next)
)
route.get('/coupon/available/:page',(req:Request,res:Response,next:NextFunction)=>
  couponController.getAvailableCoupons(req,res,next)
)

export default route