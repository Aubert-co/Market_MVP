import { Prisma } from "@prisma/client";

export type User = {
    id:number,
    name:string,
    password:string,
    email:string
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