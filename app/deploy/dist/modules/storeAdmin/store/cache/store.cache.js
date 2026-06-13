"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCache = void 0;
const BaseRedis_service_1 = require("../../../../config/cache/BaseRedis.service");
const KEY_STOREID = (userId, storeId) => `user:${userId}:store:${storeId}`;
class StoreCache extends BaseRedis_service_1.BaseRedisServices {
    async saveCacheStoreId(storeId, userId) {
        try {
            const key = KEY_STOREID(userId, storeId);
            const expirationTime = 3600;
            await this.saveItemsInCache({
                key,
                data: storeId,
                expirationTime
            });
        }
        catch {
            return;
        }
    }
    async getCachedStoreId(userId, storeId) {
        try {
            const key = KEY_STOREID(userId, storeId);
            return await this.getCacheByKey(key);
        }
        catch {
            return null;
        }
    }
}
exports.StoreCache = StoreCache;
