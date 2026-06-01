import { IStoreCouponRep } from "../../coupon/coupon.repository";
import { IAdminOrderRep } from "../../orders/repository/orders.repository";
import { LastOrdersPayload } from "../../orders/types/orders.types";
import { IStoreRepository } from "../repository/store.repository";
import { IStoreDashboardRep } from "../repository/storeDashboard.repository";

type MetricResult<T> = {
    value:T,
    hasError:boolean
}
export type DashboardResult = {
    views: MetricResult<number>;
    revenue: MetricResult<number>;
    openOrders: MetricResult<LastOrdersPayload[]>;
    countActiveProducts:MetricResult<number>,
    totalActiveCoupons:MetricResult<number>,
    reviews:{
        averageRating:MetricResult<number>,
        totalReviews:MetricResult<number>
    },
    productsInCart:MetricResult<number>
}
export interface IStoreDashboardService  {
    dashboard(storeId:number):Promise<DashboardResult>
}
export class StoreDashboardService {
    constructor(
        protected order: IAdminOrderRep,
        protected storeDashboard: IStoreDashboardRep,
        protected storeAdmin:IStoreRepository,
        protected couponsAdmin:IStoreCouponRep
    ) {}

    async dashboard(storeId: number): Promise<DashboardResult> {
        const [totalViews, monthlyRevenue, openOrders,countActiveProducts,countCoupons,averageReviews,countReviews,productsInCart] =
         await Promise.allSettled([
            this.storeDashboard.getTotalViews(storeId),
            this.storeDashboard.getMonthlyRevenue(storeId),
            this.order.getLastOrders(storeId, "pending"),
            this.storeAdmin.countProductStore(storeId,true),
            this.couponsAdmin.countStoreCoupons(storeId),
            this.storeDashboard.averageReviews(storeId),
            this.storeDashboard.countReviews(storeId),
            this.storeDashboard.countUserProductsInCart(storeId)
        ]);
        
        return {
            views: totalViews.status === "fulfilled" ? {value:totalViews.value,hasError:false} : {value:0,hasError:true},
            revenue: monthlyRevenue.status === "fulfilled" ? {value:monthlyRevenue.value,hasError:false} : {value:0,hasError:true},
            openOrders: openOrders.status === "fulfilled" ? {value:openOrders.value,hasError:false} : {value:[],hasError:true},
            countActiveProducts:countActiveProducts.status === "fulfilled" ? {value:countActiveProducts.value,hasError:false} :{ value:0,hasError:true},
            totalActiveCoupons:countCoupons.status==="fulfilled" ? {value:countCoupons.value,hasError:false}:{value:0,hasError:true},
            reviews:{
                averageRating:averageReviews.status==="fulfilled" ? {value:averageReviews.value,hasError:false} : {value:0,hasError:true},
                totalReviews:countReviews.status==="fulfilled" ? {value:countReviews.value,hasError:false} : {value:0,hasError:true}
            },
            productsInCart:productsInCart.status === "fulfilled" ? {value:productsInCart.value,hasError:false} : {value:0,hasError:true}
        };
    }
}