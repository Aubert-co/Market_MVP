"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitAllowed = exports.rateLimitBlocked = exports.metricsRoute = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const register = new prom_client_1.default.Registry();
prom_client_1.default.collectDefaultMetrics({ register });
const metricsRoute = async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
};
exports.metricsRoute = metricsRoute;
exports.rateLimitBlocked = new prom_client_1.default.Counter({
    name: "rate_limit_blocked_total",
    help: "Total requests blocked by rate limit",
    labelNames: ["route", "method"]
});
exports.rateLimitAllowed = new prom_client_1.default.Counter({
    name: "rate_limit_allowed_total",
    help: "Total requests allowed by rate limit",
    labelNames: ["route", "method"]
});
