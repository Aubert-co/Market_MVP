import { CouponController } from "../controller/coupon.controller"
import { VerifyStoreOwnership } from "../middleware/verifyStoreOwnership"
import { CouponRepository } from "../repository/coupon.repository"
import { CouponServices } from "../services/coupon.services"
import { Request,Response,NextFunction, Router } from "express"
import { prisma } from "../lib/prisma"
import { StoreService } from "../services/store.services"
import { StoreRepository } from "../repository/store.repository"
import { Auth } from "../middleware/auth"
import { ProductRepository } from "../repository/product.repository"

const route = Router()
const couponRepository = new CouponRepository(prisma,)
const couponService = new CouponServices(couponRepository)
const storeRepository = new StoreRepository(prisma)
const productRepository = new ProductRepository(prisma)
const storeService = new StoreService(storeRepository,productRepository)
const verifyStoreOwnershipMiddle = new VerifyStoreOwnership(storeService)
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
export default route