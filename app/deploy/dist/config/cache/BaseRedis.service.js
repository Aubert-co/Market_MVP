"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRedisServices = void 0;
class BaseRedisServices {
    constructor(redis) {
        this.redis = redis;
    }
    async getCacheByKey(key) {
        const cachedDatas = await this.redis.getCachedItem(key);
        if (!cachedDatas)
            return null;
        const parsed = JSON.parse(cachedDatas);
        return parsed;
    }
    async saveItemsInCache({ data, key, expirationTime = 3600 }) {
        const datas = JSON.stringify(data);
        await this.redis.saveItemInCache(key, datas, expirationTime);
    }
    async incrementCache(key) {
        return await this.redis.redisIncrement(key);
    }
    async deleteCache(key) {
        await this.redis.deleteCacheKey(key);
    }
}
exports.BaseRedisServices = BaseRedisServices;
