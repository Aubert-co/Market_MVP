import { ReviewsController } from "../controller/reviews.controller";
import { Auth } from "../middleware/auth";
import { NextFunction, Router,Request,Response } from "express";
import { ReviewsRepository } from "../repository/reviews.repository";
import { prisma } from "../lib/prisma";
import { ReviewsService } from "../services/reviews.services";
import { OrderRepository } from "../repository/order.repository";
import { CouponRepository } from "../repository/coupon.repository";

const reviewsRepository  =new ReviewsRepository(prisma)
const couponRepository = new CouponRepository(prisma)
const orderRepository = new OrderRepository(prisma,couponRepository)
const reviewsService = new ReviewsService(reviewsRepository,orderRepository)
const reviewsController =new  ReviewsController(reviewsService)
const route = Router()


route.post('/reviews/create',[Auth],
   (req:Request,res:Response,next:NextFunction)=> reviewsController.addReview(req,res,next)
)

export default route