"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSessionMiddleware = void 0;
const crypto_1 = require("crypto");
const userSessionMiddleware = (req, res, next) => {
    let sessionId = req.cookies?.sessionId;
    if (!sessionId) {
        sessionId = (0, crypto_1.randomUUID)();
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 365 * 24 * 60 * 60 * 1000,
            path: "/",
        });
    }
    req.sessionId = sessionId;
    next();
};
exports.userSessionMiddleware = userSessionMiddleware;
