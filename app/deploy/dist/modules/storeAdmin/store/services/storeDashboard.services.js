"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreDashboardService = void 0;
const refactorDatas = (datas) => datas.map(({ _count, ...val }) => {
    return { ...val, view: _count.views };
});
class StoreDashboardService {
    constructor(order, storeDashboard, storeAdmin, couponsAdmin) {
        this.order = order;
        this.storeDashboard = storeDashboard;
        this.storeAdmin = storeAdmin;
        this.couponsAdmin = couponsAdmin;
    }
    async dashboard(storeId) {
        const [totalViews, monthlyRevenue, openOrders, countActiveProducts, countCoupons, averageReviews, countReviews, productsInCart, topViewedProducts] = await Promise.allSettled([
            this.storeDashboard.getTotalViews(storeId),
            this.storeDashboard.getMonthlyRevenue(storeId),
            this.order.getLastOrders(storeId, "pending"),
            this.storeAdmin.countProductStore(storeId, true),
            this.couponsAdmin.countStoreCoupons(storeId),
            this.storeDashboard.averageReviews(storeId),
            this.storeDashboard.countReviews(storeId),
            this.storeDashboard.countUserProductsInCart(storeId),
            this.storeDashboard.topViewedProducts(storeId)
        ]);
        return {
            views: totalViews.status === "fulfilled" ? { value: totalViews.value, hasError: false } : { value: 0, hasError: true },
            revenue: monthlyRevenue.status === "fulfilled" ? { value: monthlyRevenue.value, hasError: false } : { value: 0, hasError: true },
            openOrders: openOrders.status === "fulfilled" ? { value: openOrders.value, hasError: false } : { value: [], hasError: true },
            countActiveProducts: countActiveProducts.status === "fulfilled" ? { value: countActiveProducts.value, hasError: false } : { value: 0, hasError: true },
            totalActiveCoupons: countCoupons.status === "fulfilled" ? { value: countCoupons.value, hasError: false } : { value: 0, hasError: true },
            reviews: {
                averageRating: averageReviews.status === "fulfilled" ? { value: averageReviews.value, hasError: false } : { value: 0, hasError: true },
                totalReviews: countReviews.status === "fulfilled" ? { value: countReviews.value, hasError: false } : { value: 0, hasError: true }
            },
            productsInCart: productsInCart.status === "fulfilled" ? { value: productsInCart.value, hasError: false } : { value: 0, hasError: true },
            topViewedProducts: topViewedProducts.status === "fulfilled" ? { value: refactorDatas(topViewedProducts.value), hasError: false } : { value: [], hasError: true }
        };
    }
}
exports.StoreDashboardService = StoreDashboardService;
