"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeVerifyStoreMiddle = makeVerifyStoreMiddle;
const store_services_1 = require("@/modules/storeAdmin/store/services/store.services");
const prisma_1 = require("@/database/prisma");
const store_repository_1 = require("@/modules/storeAdmin/store/repository/store.repository");
const verifyStoreOwnership_1 = require("@/middleware/verifyStoreOwnership");
const redis_1 = __importDefault(require("@/config/cache/redis"));
const store_cache_1 = require("@/modules/storeAdmin/store/cache/store.cache");
const redis_repository_1 = require("@/config/cache/redis.repository");
function makeVerifyStoreMiddle() {
    const storeRepository = new store_repository_1.StoreRepository(prisma_1.prisma);
    const storeService = new store_services_1.StoreService(storeRepository);
    const redisRepository = new redis_repository_1.RedisRepository(redis_1.default);
    const cacheStore = new store_cache_1.StoreCache(redisRepository);
    return new verifyStoreOwnership_1.VerifyStoreOwnership(storeService, cacheStore);
}
