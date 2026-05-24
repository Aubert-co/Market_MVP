import { StoreService } from "@/modules/storeAdmin/store/services/store.services";
import { prisma } from "@/database/prisma";
import { StoreRepository } from "@/modules/storeAdmin/store/repository/store.repository";
import { VerifyStoreOwnership } from "@/middleware/verifyStoreOwnership";

import redis from "@/config/cache/redis";
import { StoreCache } from "@/modules/storeAdmin/store/cache/store.cache";
import { RedisRepository } from "@/config/cache/redis.repository";



export function makeVerifyStoreMiddle(){
    const storeRepository = new StoreRepository(prisma)
    const storeService = new StoreService(storeRepository)
    const redisRepository = new RedisRepository(redis)
    const cacheStore = new StoreCache(redisRepository)
    return new VerifyStoreOwnership(storeService , cacheStore)
} 