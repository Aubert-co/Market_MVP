import { createClient, RedisClientType } from 'redis';


if (! process.env.REDIS_URL) {
  throw new Error('Undefined redis url');
}
export const REDIS_URL = process.env.REDIS_URL;
const redis: RedisClientType = createClient({
  url: REDIS_URL, 
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) return new Error('Redis retry limit exceeded');
      return Math.min(retries * 100, 3000);
    },
  },
});

/*
redis.on('error', (err) => {
  console.error('Redis error:', err);
});

redis.on('connect', () => console.log('redis connect'));
redis.on('reconnecting', () => console.log('redis reconnecting'));
redis.on('end', () => console.log('redis end'));
*/
let isConnected = false;

export const connectRedis = async () => {
  if (!isConnected) {
    try {
      await redis.connect();
      isConnected = true;
    } catch (err) {
      throw new Error(
        'Erro ao conectar ao Redis: ' + (err instanceof Error ? err.message : String(err))
      );
    }
  }
};

export default redis;
