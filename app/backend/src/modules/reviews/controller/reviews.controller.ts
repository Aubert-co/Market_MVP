import { NextFunction, Request, Response } from "express";
import { IRewviewsService } from "../../reviews/services/reviews.services";
import { checkIsAValidNumber, checkisAValidString,checkIsAValidInteger } from "../../../helpers/checkIsValid";

export class ReviewsController{
    constructor(protected reviews:IRewviewsService){}
    public async addReview(req:Request,res:Response,next:NextFunction):Promise<any>{
        const rating = req.body?.rating
        const orderId = req.body?.order
        const content = req.body?.content
        
        if (!checkIsAValidNumber(rating)) {
            return res.status(400).send({ message: "Invalid rating. It must be a valid number." });
        }

        if (!checkIsAValidInteger(orderId)) {
            return res.status(400).send({ message: "Invalid order ID. It must be a valid number." });
        }
        if(!checkisAValidString(content,150)){
            return res.status(400).send({
                message: "Content must be between 5 and 150 characters long."
            });
        }
       try{
            const userId = req.user
            await this.reviews.addReview({content,rating,userId,orderId})
            res.status(201).send({message:'Sucess'})
        }catch(err:unknown){
            next(err)
        }
    }
   
}