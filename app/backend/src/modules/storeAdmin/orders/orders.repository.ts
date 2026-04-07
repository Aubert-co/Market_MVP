import { Prisma, PrismaClient } from "@prisma/client";
import {  SearchOrdersDTO ,SearchOrdersResult} from "./orders.types";



export interface IAdminOrderRep{
   search<T extends boolean>({search,storeId,status,orderBy,pagination}:SearchOrdersDTO):Promise<SearchOrdersResult<T>>
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
        if(pagination){
            const [orders, total] = await Promise.all([
                this.prisma.order.findMany({
                    select:{
                        product:{ select:{ name:true } }
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
        const datas = await this.prisma.order.findMany({
                select:{
                    product:{ select:{ name:true } }
                },
                where,
                orderBy: { createdAt: orderBy }
            })
        return {datas} as SearchOrdersResult<T>
    }
    
    
}