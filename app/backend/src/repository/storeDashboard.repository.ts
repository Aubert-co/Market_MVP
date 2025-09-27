import {  PrismaClient } from "@prisma/client";
import { StoreRepository } from "./store.repository";
import { StatusOrder } from "types/order.types";
import { StoreDashOrders } from "types/storedashboard.types";

export interface StoreDashboardRep {
    getStoreOrders(status:StatusOrder,storeId:number):Promise<StoreDashOrders[] | []>
    countOrders(status:StatusOrder,storeId:number):Promise<number>   
}
export class StoreDashboardRep extends StoreRepository implements StoreDashboardRep {
    constructor(prisma:PrismaClient){
        super(prisma)
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
    public async getTotalViews(storeId: number): Promise<number> {
        try{
            const count = await this.prisma.view.count({
                where: {
                product: { storeId },
                },
            });
            if(!count)return  0

            return count
        }catch(err:any){
            return 0
        }
    }

}
