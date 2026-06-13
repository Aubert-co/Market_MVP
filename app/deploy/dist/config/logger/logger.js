"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogger = void 0;
const pino_1 = __importDefault(require("pino"));
const service = 'superstore-api';
const startLogger = () => {
    const env = process.env.NODE_ENV ?? 'development';
    if (env === "test-e2e") {
        return (0, pino_1.default)({ level: "info" });
    }
    if (env === 'test') {
        return (0, pino_1.default)({ level: 'debug' });
    }
    const { LOKI_URL, LOKI_USERNAME, LOKI_PASSWORD } = process.env;
    if (!LOKI_URL || !LOKI_USERNAME || !LOKI_PASSWORD) {
        throw new Error('Missing Loki environment variables');
    }
    const transport = pino_1.default.transport({
        target: 'pino-loki',
        options: {
            host: LOKI_URL,
            basicAuth: {
                username: LOKI_USERNAME,
                password: LOKI_PASSWORD
            },
            labels: {
                service,
                env
            },
            batching: true
        }
    });
    return (0, pino_1.default)({
        level: env === 'production' ? 'info' : 'debug',
        base: {
            service
        },
        timestamp: pino_1.default.stdTimeFunctions.isoTime
    }, transport);
};
exports.startLogger = startLogger;
