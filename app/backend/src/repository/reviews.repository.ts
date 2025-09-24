import { UserReviewsAndComments } from "../types/user.types";
import { AddReviewDto } from "../types/reviews.types";
import { PrismaClient } from "@prisma/client";

export interface IReviewsRepository  {
    addReview({userId,rating,productId,orderId}:AddReviewDto & Product):Promise<void>,
    userGetReviews(userId:number,orderId:number):Promise<UserReviewsAndComments[]>
}

type Product = {
    productId:number
}
export class ReviewsRepository implements IReviewsRepository{
    constructor(protected prisma:PrismaClient){}
    public async addReview({userId,rating,productId,orderId,content}:AddReviewDto & Product):Promise<void>{
       
        await this.prisma.$transaction(async(tx)=>{
            await tx.review.create({
                data:{
                    orderId,userId,rating,productId
                }
            })
            await tx.comment.create({
                data:{
                    userId,content,productId,orderId
                }
            })
            
        })
    }
    public async userGetReviews(userId:number,orderId:number):Promise<UserReviewsAndComments[]>{
        return await this.prisma.user.findMany({
            select:{
                reviews:{
                    where:{orderId}
                },
                comments:{
                    where:{orderId}
                }
            },
            where:{id:userId},
            
        })
    }
   
}