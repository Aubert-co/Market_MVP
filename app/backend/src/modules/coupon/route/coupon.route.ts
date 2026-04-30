import { CouponController } from "../controller/coupon.controller"

import { CouponRepository } from "../repository/coupon.repository"
import { CouponServices } from "../services/coupon.services"
import { Request,Response,NextFunction, Router } from "express"
import { prisma } from "../../../lib/prisma"

import { Auth } from "../../../middleware/auth"


const route = Router()
const couponRepository = new CouponRepository(prisma,)
const couponService = new CouponServices(couponRepository)


const couponController = new CouponController(couponService)

route.post('/coupons',[Auth],
    (req:Request,res:Response,next:NextFunction)=>couponController.userAddCoupon(req,res,next)
)
route.get('/coupons',[Auth],
  (req:Request,res:Response,next:NextFunction)=>couponController.userListCoupons(req,res,next)
)
route.get('/coupons/available',(req:Request,res:Response,next:NextFunction)=>
  couponController.getAvailableCoupons(req,res,next)
)

export default route