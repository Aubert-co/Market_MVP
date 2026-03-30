import { StoreService } from "../modules/store/services/store.services";
import { prisma } from "../lib/prisma";
import { StoreRepository } from "../modules/store/repository/store.repository";
import { VerifyStoreOwnership } from "../middleware/verifyStoreOwnership";

import redis from "../lib/redis";
import { StoreCache } from "../modules/store/cache/store.cache";
import { RedisRepository } from "../repository/redis.repository";



export function makeVerifyStoreMiddle(){
    const storeRepository = new StoreRepository(prisma)
    const storeService = new StoreService(storeRepository)
    const redisRepository = new RedisRepository(redis)
    const cacheStore = new StoreCache(redisRepository)
    return new VerifyStoreOwnership(storeService , cacheStore)
} 