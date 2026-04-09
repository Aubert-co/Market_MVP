import { Prisma, PrismaClient } from "@prisma/client";
import {  LastOrdersPayload, SearchOrdersDTO ,SearchOrdersResult} from "./orders.types";



export interface IAdminOrderRep{
   search<T extends boolean>({search,storeId,status,orderBy,pagination}:SearchOrdersDTO):Promise<SearchOrdersResult<T>>
   getLastOrders(storeId:number):Promise<LastOrdersPayload[]>
}

export class AdminOrderRep implements IAdminOrderRep{
    constructor(private prisma:PrismaClient){}

    public async  search<T extends boolean>({search,storeId,status,orderBy,pagination}:SearchOrdersDTO):
    Promise<SearchOrdersResult<T>>{
        const searchNumber = Number(search)

       const where: Prisma.OrderWhereInput= {
        product: { storeId },
        
        ...(status && { status }),

        ...(search && {
            OR: [
            ...(Number.isNaN(searchNumber) ? [] : [{ id: searchNumber }]),
            {
                product: {
                name: {
                    contains: String(search),
                    mode: 'insensitive'
                }
                }
            }
            ]
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
                        },
                    },
                    product:{
                        select:{
                            price:true,
                            name:true,imageUrl:true
                        }
                    },
                    total:true,status:true,id:true,
                    quantity:true,price:true,createdAt:true
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
            } as SearchOrdersResult<T>
    } 
    
    public async getLastOrders(storeId:number):Promise<LastOrdersPayload[]>{
        return await this.prisma.order.findMany({
            where:{
                product:{storeId}
            },
        include: {
            product: {
                select: {
                    name: true,
                    price: true,
                    imageUrl:true
                }
            },
            coupon: {
                select: {
                discount: true,
                discountType: true,
                code: true
                }
            },
            user: {
                select: {
                id: true,
                name: true
                }
            },

            }
        })
    }
}