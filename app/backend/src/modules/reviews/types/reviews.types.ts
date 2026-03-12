import { Prisma } from "@prisma/client";
export type AddReviewDto = {
    userId:number,
    orderId:number,
    rating:number,
    content:string
}

export type UserReviewsAndComments = Prisma.UserGetPayload<{
    select:{
        reviews:{
            where:{
                orderId:number
            }
        },
        comments:{
            where:{
                orderId:number
            }
        }
    }
}>