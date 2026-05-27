import { NextFunction, Request, Response } from "express";
import { IRewviewsService } from "../../reviews/services/reviews.services";
import { checkIsAValidNumber, checkisAValidString,checkIsAValidInteger } from "../../../helpers/checkIsValid";
import { ErrorMessage } from "@/helpers/ErrorMessage";

export class ReviewsController{
    constructor(protected reviews:IRewviewsService){}
    public async addReview(req:Request,res:Response,next:NextFunction):Promise<any>{
        const rating = req.body?.rating
        const orderId = req.body?.order
        const content = req.body?.content
       try{
            if (!checkIsAValidNumber(rating)) {
                throw new ErrorMessage({
                    message:"Invalid rating. It must be a valid number." ,
                    status:400,
                    service:"ReviewsController",
                    action:"addReview"
                })
            }

            if (!checkIsAValidInteger(orderId)) {
                throw new ErrorMessage({
                    message:"Invalid order ID. It must be a valid number.",
                    status:400,
                    service:"ReviewsController",
                    action:"addReview"
                })
            }
            if(!checkisAValidString(content,150)){
                throw new ErrorMessage({
                    message:"Content must be between 5 and 150 characters long.",
                    status:400,
                    service:"ReviewsController",
                    action:"addReview"
                })
            }
            const userId = req.user
            await this.reviews.addReview({content,rating,userId,orderId})
            res.status(201).send({message:'Sucess'})
        }catch(err:unknown){
            next(err)
        }
    }
   
}