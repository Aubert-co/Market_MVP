import { calcSkipPages, pagination } from "../../../helpers";
import { IOrdersRepository } from "../orders/orders.repository";
import { GetLastOrdersDTO, LastOrdersPayload, SearchOrdersDTO, SearchOrdersResponse } from "./orders.types";
import { ErrorMessage } from "../../../helpers/ErrorMessage";

type SearchOrderWithPage = Omit<SearchOrdersDTO, "skip"> & {
    page:number
}
export interface IOrdersService {
    searchOrders({storeId,search,status,page,orderBy,limit}:SearchOrderWithPage):Promise<SearchOrdersResponse>
    getLastOrders({status,storeId}:GetLastOrdersDTO):Promise<LastOrdersPayload[]>
}
export class OrdersServices implements IOrdersService{
    constructor(protected orderRep:IOrdersRepository){}

    async searchOrders({search,storeId,status,limit,orderBy,page}:SearchOrderWithPage):Promise<SearchOrdersResponse>{
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
                currentPage,skip:skipPage,totalPages
            }
        }
        }catch(err:unknown){
            throw new ErrorMessage("",500)
        }
    }
    async getLastOrders({status,storeId}:GetLastOrdersDTO){
        try{
            return await this.orderRep.getLastOrders({status,storeId})
        }catch(err:unknown){
            throw new ErrorMessage("",500)
        }
    }
}