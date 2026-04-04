import { Prisma, PrismaClient } from "@prisma/client";
import { LastOrdersPayload,GetLastOrdersDTO,SearchOrdersDTO, OrderListPayload, SearchOrdersReturn } from "./orders.types";
import { StatusOrder } from "@/modules/orders/types/order.types";
import { StoreDashOrders } from "../store/types/storedashboard.types";

export interface IOrdersRepository{
    getLastOrders({}:GetLastOrdersDTO):Promise<LastOrdersPayload[]>
    searchOrders({}:SearchOrdersDTO):Promise<SearchOrdersReturn>
    getStoreOrders(status:StatusOrder,storeId:number):Promise<StoreDashOrders[] | []>
    countOrders(status:StatusOrder,storeId:number):Promise<number>   
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
     public async getStoreOrders(status:StatusOrder,storeId:number):Promise<StoreDashOrders[] | []>{
        try{
            const datas =  await this.prisma.order.findMany({
                where:{
                    status,
                    product:{
                        storeId
                    },
                    
                },
                orderBy:{
                    createdAt:'desc'
                },
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
                take:5
            })
            if(!datas)return []
            return datas
        }catch(err:any){
            return []
        }
    }
    public async countOrders(status:StatusOrder,storeId:number):Promise<number>{
       try{
            const count = await this.prisma.order.count({
                where:{
                    status,
                    product:{
                        storeId
                    }
                }
            })
            if(!count)return 0

            return count;
       }catch(err:any){
            return 0
       }
    }
}