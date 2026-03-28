import { StoreService } from "../modules/store/services/store.services";
import { prisma } from "../lib/prisma";
import { StoreRepository } from "../modules/store/repository/store.repository";
import { VerifyStoreOwnership } from "../middleware/verifyStoreOwnership";
import { ProductRedisRepository } from "../repository/redis.repository";
import redis from "../lib/redis";
import { ProductRedisService } from "../services/redis.services";


export function makeVerifyStoreMiddle(){
    const storeRepository = new StoreRepository(prisma)
    const storeService = new StoreService(storeRepository)
    const redisRepository = new ProductRedisRepository(redis)
    const redisService = new ProductRedisService(redisRepository)
    return new VerifyStoreOwnership(storeService , redisService)
} 