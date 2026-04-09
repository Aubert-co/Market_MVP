import { calcSkipPages, pagination } from "@/helpers/pagination";
import { IAdminOrderRep } from "./orders.repository";
import { LastOrdersPayload, OrderListPayload, SearchOrdersDTO, SearchOrdersResponse } from "./orders.types";
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage";

export type SearchOrderWithPage = Omit<SearchOrdersDTO, "pagination"> & {
    page:number,
    limit:number
}
export interface IAdminOrderService {
    searchOrders({storeId,search,status,page,orderBy,limit}:SearchOrderWithPage):Promise<SearchOrdersResponse>
    getLastOrders(storeId:number):Promise<OrderListPayload[]>
}
export class AdminOrderService implements IAdminOrderService{
    constructor(protected orderRep:IAdminOrderRep){}

   
    async searchOrders({search,storeId,status,limit,orderBy="desc",page}:SearchOrderWithPage):Promise<SearchOrdersResponse>{
         try{
            const skip = calcSkipPages(page,limit)
            
            const {datas,pageInfo} =  await this.orderRep.search<true>({
                search,status,storeId,orderBy,pagination:{skip,limit}
            })
           
            const {skip:skipPage,currentPage,totalPages} = pagination({
                totalItems:pageInfo.totalItems,
                page,limit
            })

        return {
            datas,pagination:{
                currentPage,skip:skipPage,totalPages
            }
        }
        }catch(err:unknown){
            
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to search orders.",
                status:500,
                prismaError,
                service:"OrdersServices",
                action:"searchOrders"
            })
        }
    }
    async getLastOrders(storeId:number):Promise<LastOrdersPayload[]>{
        try{
            const datas =  await this.orderRep.getLastOrders(storeId)
            return datas
        }catch(err:unknown){
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Failed to get store last orders.",
                status:500,
                service:"OrdersServices",
                action:"getLastOrders",
                prismaError
            })
        }
    }
    
    
}