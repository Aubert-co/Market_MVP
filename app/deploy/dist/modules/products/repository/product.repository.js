"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const ErrorMessage_1 = require("../../../helpers/ErrorMessage");
class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProducts(limit, skip = 0) {
        try {
            const [products, ratings] = await this.prisma.$transaction([
                this.prisma.product.findMany({
                    take: limit,
                    skip,
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        price: true
                    },
                    orderBy: {
                        id: 'asc'
                    }
                }),
                this.prisma.review.groupBy({
                    by: ['productId'],
                    _avg: {
                        rating: true
                    },
                    orderBy: {
                        productId: 'asc'
                    }
                })
            ]);
            const ratingMap = new Map(ratings.map(r => [r.productId, r._avg?.rating ?? null]));
            const productsWithRatings = products.map(product => ({
                ...product,
                averageRating: ratingMap.get(product.id) ?? null
            }));
            return productsWithRatings;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "An unexpected error occurred. Please try again later.",
                status: 500,
                action: "getProducts",
                service: "ProductRepository",
                context: {
                    limit, skip
                },
                prismaError
            });
        }
    }
    async getProductById(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
                include: {
                    reviews: {
                        select: {
                            rating: true
                        }
                    },
                    comments: {
                        select: { content: true,
                            user: {
                                select: { name: true }
                            } },
                        take: 5
                    },
                }
            });
            const ratings = await this.prisma.review.aggregate({
                where: { productId: id },
                _avg: { rating: true },
                _count: { rating: true }
            });
            return {
                product, ratings
            };
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to find product.",
                status: 500,
                action: "getProductById",
                service: "ProductRepository",
                context: {
                    productId: id
                },
                prismaError
            });
        }
    }
    async countProducts() {
        return await this.prisma.product.count();
    }
    async filterProducts({ name, category, maxPrice, minPrice, storeId, take = 10, skip = 0, orderBy, }) {
        return await this.prisma.product.findMany({
            where: {
                storeId,
                ...(name && { name: { contains: name, mode: 'insensitive' } }),
                ...(category && { category: { contains: category, mode: 'insensitive' } }),
                ...(minPrice || maxPrice
                    ? {
                        price: {
                            ...(minPrice && { gte: minPrice }),
                            ...(maxPrice && { lte: maxPrice })
                        }
                    }
                    : {})
            },
            orderBy: { price: orderBy },
            take,
            skip
        });
    }
}
exports.ProductRepository = ProductRepository;
