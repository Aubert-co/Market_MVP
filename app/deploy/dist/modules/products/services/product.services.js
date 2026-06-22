"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const pagination_1 = require("../../../helpers/pagination");
const ErrorMessage_1 = require("../../../helpers/ErrorMessage");
const logger_1 = require("@/config/logger/logger");
const logger = (0, logger_1.startLogger)();
class ProductService {
    constructor(product, redis) {
        this.product = product;
        this.redis = redis;
    }
    async getProducts(page) {
        const limit = 10;
        let countProducts = (await this.redis.getCountAllProducts()) ?? 0;
        if (countProducts <= 0) {
            const count = await this.product.countProducts();
            if (count > 0) {
                await this.redis.saveCountAllProducts(count);
                countProducts = count;
            }
        }
        if (countProducts === 0) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "No products available at the moment.",
                status: 204,
                action: "getProducts",
                service: "ProductService",
                context: {
                    page
                }
            });
        }
        const { skip, currentPage, totalPages } = (0, pagination_1.pagination)({
            totalItems: countProducts, page, limit
        });
        const getProductsInCache = await this.redis.getProductsInCache(currentPage);
        if (getProductsInCache && getProductsInCache.length > 0) {
            return {
                datas: getProductsInCache,
                totalPages, currentPage, fromCache: true
            };
        }
        logger.info({
            event: "cache_miss",
            hit: false,
            service: "redis-cache",
            layer: "cache",
            message: "Redis cache miss"
        });
        const datas = await this.product.getProducts(limit, skip);
        if (datas.length > 0)
            await this.redis.saveProductsInCache(datas, currentPage);
        return {
            datas, totalPages, currentPage, fromCache: false
        };
    }
    async getProductById(id) {
        try {
            const datas = await this.product.getProductById(id);
            return datas;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to retrieve products. Please try again later.",
                status: 500,
                action: "getProductById",
                service: "ProductService",
                prismaError
            });
        }
    }
    async countProducts() {
        try {
            const count = await this.product.countProducts();
            if (count)
                return Number(count);
            return 0;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to count products in the database",
                status: 500,
                action: "countProducts",
                service: "ProductService",
                prismaError
            });
        }
    }
    async filterProduct({ name, category, maxPrice, minPrice, take, skip, orderBy }) {
        try {
            return await this.product.filterProducts({
                name, category, maxPrice, minPrice, take, skip, orderBy
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to filter products.",
                status: 500,
                action: "filterProduct",
                service: "ProductService",
                context: {
                    name, category, maxPrice, minPrice, take, skip, orderBy
                },
                prismaError
            });
        }
    }
}
exports.ProductService = ProductService;
