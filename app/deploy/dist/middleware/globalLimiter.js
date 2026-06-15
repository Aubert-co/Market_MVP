"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalLimiter = void 0;
const metrics_1 = require("@/metrics");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const isTestE2E = process.env.NODE_ENV === "test-e2e";
let max = 100;
if (isTestE2E) {
    max = 10000000;
}
const IGNORED = new Set(["/metrics", "/health"]);
exports.globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => IGNORED.has(req.path),
    handler: (req, res) => {
        metrics_1.rateLimitBlocked.inc({
            route: req.path,
            method: req.method
        });
        return res.status(429).json({
            status: 429,
            message: "Too many requests from this IP, please try again later."
        });
    }
});
