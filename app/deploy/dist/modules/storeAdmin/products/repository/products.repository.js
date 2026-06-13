"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdminRepository = void 0;
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class ProductAdminRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct(data) {
        try {
            const productId = await this.prisma.product.create({ data });
            return productId.id;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                service: "ProductAdminRepository",
                action: "createProduct",
                status: 500,
                message: "Failed to create product.",
                prismaError
            });
        }
    }
    async deleteProduct(productId) {
        try {
            await this.prisma.product.delete({
                where: { id: productId }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                service: "ProductAdminRepository",
                action: "deleteProduct",
                status: 500,
                message: "Failed to delete a product.",
                prismaError
            });
        }
    }
    async countStoreProducts(storeId) {
        const countProducts = await this.prisma.product.count({
            where: { storeId }
        });
        return countProducts;
    }
    async desactiveProduct(storeId, productId) {
        await this.prisma.product.update({
            where: { storeId, id: productId },
            data: { isActive: false }
        });
    }
    async productMostViewed(storeId) {
        return await this.prisma.product.findMany({
            where: {
                storeId
            },
            include: {
                _count: {
                    select: {
                        views: true
                    }
                }
            },
            orderBy: {
                views: {
                    _count: 'desc'
                }
            },
            take: 5, omit: {
                description: true, stock: true,
                isActive: true, storeId: true, createdAt: true,
                updatedAt: true, price: true
            }
        });
    }
    async getStoreProducts({ storeId, search, category, priceOrder, take, skip, stockOrderBy }) {
        const where = {
            storeId,
            ...(category && { category }),
            ...(search && {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }),
        };
        const [products, totalItems] = await Promise.all([
            this.prisma.product.findMany({
                where,
                orderBy: [
                    {
                        createdAt: 'desc'
                    },
                    {
                        stock: stockOrderBy
                    },
                    {
                        price: priceOrder
                    }
                ],
                take,
                skip
            }),
            this.prisma.product.count({
                where
            })
        ]);
        return {
            datas: products,
            pageInfo: {
                totalItems
            }
        };
    }
}
exports.ProductAdminRepository = ProductAdminRepository;
