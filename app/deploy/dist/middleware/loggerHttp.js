"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const logger_1 = require("@/config/logger/logger");
const pino_http_1 = require("pino-http");
const logger = (0, logger_1.startLogger)();
exports.httpLogger = (0, pino_http_1.pinoHttp)({
    logger,
    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
            };
        },
        res(res) {
            return {
                statusCode: res.statusCode,
            };
        },
    },
});
