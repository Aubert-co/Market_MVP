"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheProducts = void 0;
const BaseRedis_service_1 = require("../../../config/cache/BaseRedis.service");
const keyCachedPageProduct = (page, version) => `products:v${version}:page:${page}`;
const COUNT_ALL_PRODUCTS = "count:all:products";
const VERSION_PAGE = "list-version";
class CacheProducts extends BaseRedis_service_1.BaseRedisServices {
    async saveProductsInCache(data, page) {
        try {
            let version = await this.getCacheByKey(VERSION_PAGE);
            if (!version) {
                version = 1;
            }
            const key = keyCachedPageProduct(page, version);
            await this.saveItemsInCache({
                data,
                key,
                expirationTime: 3600
            });
            await this.incrementCache(VERSION_PAGE);
        }
        catch {
            return;
        }
    }
    async getProductsInCache(page) {
        try {
            let version = await this.getCacheByKey(VERSION_PAGE);
            if (!version) {
                version = 1;
            }
            const key = keyCachedPageProduct(page, version);
            return await this.getCacheByKey(key);
        }
        catch {
            return null;
        }
    }
    async saveCountAllProducts(data) {
        try {
            await this.saveItemsInCache({
                data,
                key: COUNT_ALL_PRODUCTS,
                expirationTime: 3600
            });
        }
        catch {
            return;
        }
    }
    async getCountAllProducts() {
        try {
            const countProducts = await this.getCacheByKey(COUNT_ALL_PRODUCTS);
            return Number(countProducts);
        }
        catch {
            return null;
        }
    }
    async incrementCacheVersion(key) {
        try {
            await this.incrementCache(key);
        }
        catch {
            return;
        }
    }
    async cleanProductsCache() {
        try {
            await Promise.all([
                this.incrementCache(VERSION_PAGE),
                this.deleteCache(COUNT_ALL_PRODUCTS)
            ]);
        }
        catch {
            return;
        }
    }
}
exports.CacheProducts = CacheProducts;
