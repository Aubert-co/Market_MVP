import { calcSkipPages, pagination } from "@/helpers/pagination";
import { IAdminOrderRep } from "./orders.repository";
import { OrderListPayload, SearchOrdersDTO, SearchOrdersResponse } from "./orders.types";
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage";

type SearchOrderWithPage = Omit<SearchOrdersDTO, "pagination"> & {
    page:number,
    limit:number
}
export interface IAdminOrderService {
    searchOrders({storeId,search,status,page,orderBy,limit}:SearchOrderWithPage):Promise<SearchOrdersResponse>
    getLastOrders(storeId:number):Promise<OrderListPayload[]>
}
export class AdminOrderService implements IAdminOrderService{
    constructor(protected orderRep:IAdminOrderRep){}

   
    async searchOrders({search,storeId,status,limit,orderBy,page}:SearchOrderWithPage):Promise<SearchOrdersResponse>{
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
                page:currentPage,limit:skipPage,totalItems:totalPages
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
    async getLastOrders(storeId:number):Promise<OrderListPayload[]>{
        try{
            const {datas} =  await this.orderRep.search({
                storeId,orderBy:'desc'
            })
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