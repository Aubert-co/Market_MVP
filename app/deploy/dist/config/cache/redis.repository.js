"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisRepository = void 0;
class RedisRepository {
    constructor(redis) {
        this.redis = redis;
    }
    async saveItemInCache(key, datas, expirationTime) {
        await this.redis.set(key, datas, {
            expiration: {
                type: 'EX',
                value: expirationTime
            }
        });
    }
    async getCachedItem(key) {
        return await this.redis.get(key);
    }
    async deleteCacheKey(key) {
        await this.redis.del(key);
    }
    async redisIncrement(key) {
        await this.redis.incr(key);
    }
}
exports.RedisRepository = RedisRepository;
