import { PrismaClient } from "@prisma/client";
import { IStoreDashboardRep } from "repository/storeDashboard.repository";
import { StoreDashOrders } from "types/storedashboard.types";

export interface IStoreDashoard {
    getDashboard(storeId:number):Promise<GetDashboard>
}
type GetDashboard = {
    orders:{
        completed:number | null,
        pending:number | null ,
        cancelled:number | null ,
        lastPending:StoreDashOrders[] |  []
    },
    views:{
        total:number | null
    }
}
export class StoreDashboardService implements IStoreDashoard{
    constructor(protected storeDashboard:IStoreDashboardRep){}

    public async getDashboard(storeId:number):Promise<GetDashboard>{
        const   [ countCompletedOrders,countPendingOrders,
                countCancelledOrders,getTotalViews,pendingOrders
            ] =
            await Promise.allSettled([
                this.storeDashboard.countOrders('completed',storeId),
                this.storeDashboard.countOrders('pending',storeId),
                this.storeDashboard.countOrders('cancelled',storeId),
                this.storeDashboard.getTotalViews(storeId),
                this.storeDashboard.getStoreOrders('pending',storeId)
            ]);
           
        
        return {
             orders: {
                completed: countCompletedOrders.status==="fulfilled" ?countCompletedOrders.value : 0,
                pending: countPendingOrders.status === "fulfilled" ? countPendingOrders.value : 0,
                cancelled: countCancelledOrders.status === "fulfilled" ? countCancelledOrders.value : 0,
                lastPending: pendingOrders.status ==="fulfilled" ? pendingOrders.value : [],
            },
            views: {
                total: getTotalViews.status === "fulfilled" ? getTotalViews.value :0 ,
            },
        }
    }
}