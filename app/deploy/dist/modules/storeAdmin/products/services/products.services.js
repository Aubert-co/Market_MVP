"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdminService = void 0;
const checkIsValidImage_1 = require("@/helpers/checkIsValidImage");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const pagination_1 = require("@/helpers/pagination");
const logger_1 = require("@/config/logger/logger");
class ProductAdminService {
    constructor(product, storage, cache) {
        this.product = product;
        this.storage = storage;
        this.cache = cache;
        this.logger = (0, logger_1.startLogger)();
    }
    async getStoreProducts({ storeId, search, category, priceOrder, take, page, stockOrderBy }) {
        try {
            const skip = (0, pagination_1.calcSkipPages)(page, take);
            const { datas, pageInfo } = await this.product.getStoreProducts({
                storeId, skip, search, category, priceOrder, take, stockOrderBy
            });
            const { skip: skipPage, currentPage, totalPages } = (0, pagination_1.pagination)({
                totalItems: pageInfo.totalItems, page, limit: take
            });
            return {
                datas,
                pagination: {
                    skip: skipPage, currentPage, totalPages
                }
            };
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get store products.",
                service: "ProductAdminService",
                status: 500,
                prismaError,
                action: "getStoresProducts"
            });
        }
    }
    async productMostViewed(storeId) {
        try {
            return await this.product.productMostViewed(storeId);
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get store most viewd products.",
                service: "ProductAdminService",
                status: 500,
                prismaError,
                action: "productMostViewed"
            });
        }
    }
    async createProduct({ category, name, description, storeId, price, stock, fileBuffer, mimeType }) {
        const countProducts = await this.product.countStoreProducts(storeId);
        if (countProducts >= 10) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Product creation limit reached: maximum 10 products allowed",
                status: 429,
                action: "createProduct",
                service: "ProductAdminService",
                context: {
                    countProducts
                }
            });
        }
        const imagePath = (0, checkIsValidImage_1.generateImgPath)();
        const imageUrl = `tmp/market/${imagePath}`;
        const dbImageUrl = `market/${imagePath}`;
        const productId = await this.product.createProduct({
            description, name, stock, storeId, category,
            price, imageUrl: dbImageUrl
        });
        const uploadImage = await this.storage.uploadImage({ mimeType, urlPath: imageUrl, fileBuffer });
        if (!uploadImage.success) {
            await this.product.deleteProduct(productId);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to save image.",
                service: "ProductAdminService",
                action: "uploadImage",
                status: 500
            });
        }
        this.logger.info({
            event: "product_created",
            message: "Product created successfully.",
            status: 201,
            action: "createProduct",
            productId,
            storeId,
            category,
            price,
            stock,
            imageKey: imageUrl,
            mimeType,
        });
        await this.cache.cleanProductsCache();
        this.logger.info({
            event: "products_cache_cleaned",
            message: "Products cache cleaned successfully.",
            status: 200,
            action: "cleanProductsCache",
            storeId,
            productId,
        });
    }
}
exports.ProductAdminService = ProductAdminService;
