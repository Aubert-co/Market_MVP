import { Prisma, PrismaClient } from "@prisma/client";
import { LastOrdersPayload,GetLastOrdersDTO,SearchOrdersDTO, OrderListPayload, SearchOrdersReturn } from "./orders.types";

export interface IOrdersRepository{
    getLastOrders({}:GetLastOrdersDTO):Promise<LastOrdersPayload[]>
    searchOrders({}:SearchOrdersDTO):Promise<SearchOrdersReturn>
}
export class OrdersRepository implements IOrdersRepository{
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
        limit = 5,
        orderBy = "desc"
    }: SearchOrdersDTO):Promise<SearchOrdersReturn> {
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
                product:{ select:{ name:true } }
                },
                where,
                skip,
                take:limit,
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

}