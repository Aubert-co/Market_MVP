"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.REDIS_URL = void 0;
const redis_1 = require("redis");
if (!process.env.REDIS_URL) {
    throw new Error('Undefined redis url');
}
exports.REDIS_URL = process.env.REDIS_URL;
const redis = (0, redis_1.createClient)({
    url: exports.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10)
                return new Error('Redis retry limit exceeded');
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
const connectRedis = async () => {
    if (!isConnected) {
        try {
            await redis.connect();
            isConnected = true;
        }
        catch (err) {
            throw new Error('Erro ao conectar ao Redis: ' + (err instanceof Error ? err.message : String(err)));
        }
    }
};
exports.connectRedis = connectRedis;
exports.default = redis;
