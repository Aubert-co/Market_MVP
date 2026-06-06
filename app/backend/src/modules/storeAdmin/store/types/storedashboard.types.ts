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

export type ProductMostViewed = Prisma.ProductGetPayload<{
    select:{
        id:true,
        name:true,
        imageUrl:true,
        _count:{
            select:{
                views:true
            }
        }
    }
}>

export type ProductMostViewedService = Omit<ProductMostViewed,'_count'> & {
    view:number
}