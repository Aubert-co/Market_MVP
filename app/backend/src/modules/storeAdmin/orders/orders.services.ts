import { calcSkipPages, pagination } from "@/helpers/pagination";
import { IOrdersRepository } from "./orders.repository";
import { GetLastOrdersDTO, LastOrdersPayload, SearchOrdersDTO, SearchOrdersResponse } from "./orders.types";
import { ErrorMessage, getPrismaError } from "@/helpers/ErrorMessage";

type SearchOrderWithPage = Omit<SearchOrdersDTO, "skip"> & {
    page:number
}
export interface IOrdersService {
    searchOrders({storeId,search,status,page,orderBy,limit}:SearchOrderWithPage):Promise<SearchOrdersResponse>
    
}
export class OrdersServices implements IOrdersService{
    constructor(protected orderRep:IOrdersRepository){}

    protected async orderFilter({search,storeId,status,limit,orderBy,page}:SearchOrderWithPage):Promise<SearchOrdersResponse>{
         try{
            const skip = calcSkipPages(page,limit)
            const {datas,pageInfo} =  await this.orderRep.searchOrders({
                search,status,skip,storeId,limit,orderBy
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
    async searchOrders({search,storeId,status,limit,orderBy,page}:SearchOrderWithPage):Promise<SearchOrdersResponse>{
       return await this.orderFilter({
        storeId,search,status,limit,orderBy,page
       })
    }
    async getLastOrders(storeId:number,){
        return await this.orderFilter({
            storeId,orderBy:'desc'
        })
    }
    
}