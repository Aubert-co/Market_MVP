import { Prisma } from "@prisma/client";

export type StoreDashOrders = Prisma.OrderGetPayload<{
   
    select:{
        product:{
            select:{name:true,price:true,imageUrl:true}
        },
        total:true,
        quantity:true,
        user:{
            select:{name:true}
        }
    },
    
}>