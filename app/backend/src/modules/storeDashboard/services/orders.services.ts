import { pagination } from "helpers";
import { IOrdersRepository } from "../repository/orders.repository";
import { SearchOrdersDTO } from "../types/orders.types";

type SearchOrdersSerDTO = SearchOrdersDTO & {
    page:number
}
export class OrdersServices {
    constructor(protected orderRep:IOrdersRepository){}

    async searchOrders({search,storeId,skip,status,take,orderBy,page}:SearchOrdersSerDTO){
        const {datas,pageInfo} =  await this.orderRep.searchOrders({
            search,status,skip,storeId,take,orderBy
        })
        const {skip:skipPage,currentPage,totalPages} = pagination({
            totalItems:pageInfo.totalPages,
            page,limit:take
        })
    }
}