"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("@/middleware/error.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = __importDefault(require("@/routes/route"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("@/config/cache/redis");
const helmet_1 = __importDefault(require("helmet"));
const globalLimiter_1 = require("@/middleware/globalLimiter");
const metrics_1 = require("./metrics");
if (!process.env.NODE_ENV) {
    throw new Error("NO NODE_ENV");
}
const NODE_ENV = process.env.NODE_ENV;
const PORT = Number(process.env.PORT) || 3000;
const isDev = NODE_ENV !== "production";
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "https://market.aubertbarbosa.com"],
            imgSrc: ["'self'", "data:", "https://aubertbarbosa.com"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
}));
app.use((0, cors_1.default)({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    origin: isDev
        ? 'http://localhost:5173'
        : 'https://market.aubertbarbosa.com'
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode !== 429) {
            metrics_1.rateLimitAllowed.inc({
                route: req.path,
                method: req.method
            });
        }
    });
    next();
});
app.use(globalLimiter_1.globalLimiter);
app.use(route_1.default);
app.use((error, req, res, next) => (0, error_middleware_1.ErrorMiddleware)(error, req, res, next));
const startServer = async () => {
    try {
        await (0, redis_1.connectRedis)();
        if (NODE_ENV === "production" || NODE_ENV === "test-e2e") {
            app.listen(PORT, '0.0.0.0', () => {
                console.log(`server running on port ${PORT}`);
            });
        }
    }
    catch (err) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }
};
startServer();
exports.default = app;
