import { Prisma, PrismaClient } from "@prisma/client";
import {  LastOrdersPayload, SearchOrdersDTO , SearchOrdersReturn} from "./orders.types";



export interface IAdminOrderRep{
   search({searchByOrderId,storeId,status,orderBy,pagination}:SearchOrdersDTO):Promise<SearchOrdersReturn>
   getLastOrders(storeId:number):Promise<LastOrdersPayload[]>
}

export class AdminOrderRep implements IAdminOrderRep{
    constructor(private prisma:PrismaClient){}

    public async  search({searchByOrderId,storeId,status,orderBy,pagination}:SearchOrdersDTO):
    Promise<SearchOrdersReturn>{
      
       
       const where: Prisma.OrderWhereInput= {
        product: { storeId },
        
        ...(status && { status }),

        ...(searchByOrderId && {
            AND: {id:searchByOrderId}
            })
        }
        
            const [orders, total] = await Promise.all([
                this.prisma.order.findMany({
                   select:{
                    user:{
                        select:{name:true,id:true}
                    },
                    coupon:{
                        select:{
                            discount:true,
                            discountType:true,
                            code:true
                        },
                    },
                    product:{
                        select:{
                            price:true,
                            name:true,imageUrl:true
                        }
                    },
                    total:true,status:true,id:true,
                    quantity:true,price:true,createdAt:true,productId:true,
                    couponId:false,
                   },
                    where,
                    skip:pagination.skip,
                    take:pagination.limit,
                    orderBy: { createdAt: orderBy }
                }),

                this.prisma.order.count({ where })
            ])

            return {
                datas: orders,
                pageInfo:{
                    totalItems:total
                }
            } 
    } 
    
    public async getLastOrders(storeId:number):Promise<LastOrdersPayload[]>{
        return await this.prisma.order.findMany({
            where:{
                product:{storeId}
            },
        orderBy:{
            createdAt:'desc'
        },
        take:5,
        include: {
            product: {
                select: {
                    name: true,
                    imageUrl:true
                }
            },
            
            },
            omit:{
                couponId:true,userId:true
            }
        },)
    }
}