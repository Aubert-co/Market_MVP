import { PrismaClient } from "@prisma/client";
import { LastOrdersPayload,GetLastOrdersDTO,SearchOrdersDTO, OrderListPayload } from "../types/orders.types";


export class OrdersRepository{
    constructor(private prisma:PrismaClient){}

    async getLastOrders({storeId,status}:GetLastOrdersDTO):Promise<LastOrdersPayload[]>{
        return await this.prisma.order.findMany({
            where:{product:{storeId},status},
            take:5,
            include:{product:{select:{name:true}}},
            orderBy:{createdAt:'desc'}
        })
    }
    async searchOrders({
        storeId,
        status,
        search,
        skip = 0,
        take = 5
    }: SearchOrdersDTO):Promise<OrderListPayload[]> {
    const searchNumber = Number(search)

    return await this.prisma.order.findMany({
        select:{
            product:{
                select:{
                    name:true
                }
            }  
        },
        where: {
        product: { storeId },
        
        ...(status && { status }),

        ...(search && {
            OR: [
        
            ...(Number.isNaN(searchNumber)
                ? []
                : [{ id: searchNumber }]),
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
        },

        skip,
        take,

        orderBy: { createdAt: 'desc' }
    })
    }
}