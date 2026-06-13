"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreDashboardRep = void 0;
class StoreDashboardRep {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async countReviews(storeId) {
        return await this.prisma.review.count({
            where: {
                product: {
                    storeId
                }
            }
        });
    }
    async averageReviews(storeId) {
        const values = await this.prisma.review.aggregate({
            where: {
                product: {
                    storeId
                }
            },
            _avg: {
                rating: true
            }
        });
        return values._avg.rating ?? 0;
    }
    async countUserProductsInCart(storeId) {
        const values = await this.prisma.cartitem.aggregate({
            where: {
                product: {
                    storeId
                }
            },
            _sum: {
                quantity: true
            }
        });
        return values._sum.quantity ?? 0;
    }
    async getTotalViews(storeId) {
        const count = await this.prisma.view.count({
            where: {
                product: { storeId },
            },
        });
        if (!count)
            return 0;
        return count;
    }
    async getMonthlyRevenue(storeId) {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const result = await this.prisma.order.aggregate({
            where: {
                product: { storeId },
                createdAt: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth,
                },
                status: { not: "cancelled" },
            },
            _sum: {
                total: true,
            },
        });
        return result._sum.total || 0;
    }
    async topViewedProducts(storeId) {
        return await this.prisma.product.findMany({
            where: {
                storeId
            },
            orderBy: {
                views: {
                    _count: 'desc'
                }
            },
            take: 5,
            select: {
                id: true,
                name: true,
                imageUrl: true,
                _count: {
                    select: {
                        views: true
                    }
                }
            }
        });
    }
}
exports.StoreDashboardRep = StoreDashboardRep;
