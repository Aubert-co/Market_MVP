import { PrismaClient } from "@prisma/client";
import { StoreDashboardRep } from "repository/storeDashboard.repository";
import { StoreDashOrders } from "types/storedashboard.types";

export interface StoreDashoard {
    getDashboard(storeId:number):Promise<GetDashboard>
}
type GetDashboard = {
    orders:{
        completed:number,
        pending:number,
        cancelled:number,
        lastPending:StoreDashOrders[]
    },
    views:{
        total:number
    }
}
export class StoreDashboardService implements StoreDashoard{
    constructor(protected storeDashboard:StoreDashboardRep){}

    public async getDashboard(storeId:number):Promise<GetDashboard>{
        const[
            countCompletedOrders,countPendingOrders,
            countCancelledOrders,getTotalViews,pendingOrders]=
            await Promise.all([
                this.storeDashboard.countOrders('completed',storeId),
                this.storeDashboard.countOrders('pending',storeId),
                this.storeDashboard.countOrders('cancelled',storeId),
                this.storeDashboard.getTotalViews(storeId),
                this.storeDashboard.getStoreOrders('pending',storeId)
            ]);
        return {
             orders: {
                completed: countCompletedOrders,
                pending: countPendingOrders,
                cancelled: countCancelledOrders,
                lastPending: pendingOrders,
            },
            views: {
                total: getTotalViews,
            },
        }
    }
}