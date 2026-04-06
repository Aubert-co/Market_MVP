import { calcSkipPages, pagination } from "@/helpers/pagination";
import { IOrdersRepository } from "./orders.repository";
import { OrderListPayload, SearchOrdersDTO, SearchOrdersResponse } from "./orders.types";
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage";

type SearchOrderWithPage = Omit<SearchOrdersDTO, "pagination"> & {
    page:number,
    limit:number
}
export interface IOrdersService {
    searchOrders({storeId,search,status,page,orderBy,limit}:SearchOrderWithPage):Promise<SearchOrdersResponse>
    getLastOrders(storeId:number):Promise<OrderListPayload[]>
}
export class OrdersServices implements IOrdersService{
    constructor(protected orderRep:IOrdersRepository){}

   
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
                message:"",
                status:500,
                prismaError,
                service:"Dashboard-OrdersServices",
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
            throw new ErrorMessage({
                message:"",
                status:500,
                service:"",
                action:""
            })
        }
    }
    
    
}