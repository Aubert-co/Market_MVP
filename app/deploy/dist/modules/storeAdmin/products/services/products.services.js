"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdminService = void 0;
const checkIsValidImage_1 = require("@/helpers/checkIsValidImage");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const compressImages_1 = require("@/helpers/compressImages");
const retry_1 = require("@/helpers/retry");
const pagination_1 = require("@/helpers/pagination");
class ProductAdminService {
    constructor(product, storage, cache) {
        this.product = product;
        this.storage = storage;
        this.cache = cache;
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
        const imageUrl = (0, checkIsValidImage_1.generateImgPath)();
        const compressBuff = await (0, retry_1.retry)({
            func: compressImages_1.compressImage,
            body: { fileBuffer },
            retries: 2
        });
        if (!compressBuff.success || compressBuff.data === undefined) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to compress.",
                action: "compressImage",
                service: "ProductAdminService",
                status: 500
            });
        }
        const productId = await this.product.createProduct({
            description, name, stock, storeId, category,
            price, imageUrl
        });
        const uploadImage = await this.storage.uploadImage({ mimeType, urlPath: imageUrl, fileBuffer: compressBuff.data });
        if (!uploadImage.success) {
            await this.product.deleteProduct(productId);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to save image.",
                service: "ProductAdminService",
                action: "uploadImage",
                status: 500
            });
        }
        await this.cache.cleanProductsCache();
    }
}
exports.ProductAdminService = ProductAdminService;
