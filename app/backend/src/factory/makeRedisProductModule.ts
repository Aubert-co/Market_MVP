import redis from "../lib/redis"
import { ProductRedisRepository } from "../repository/redis.repository"
import { ProductRedisService } from "../services/redis.services"

export const makeRedisProductModule = ()=>{
    const redisRep = new ProductRedisRepository(redis)
    return new ProductRedisService(redisRep)
}