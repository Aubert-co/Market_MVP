"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieConfig = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN = process.env?.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env?.REFRESH_TOKEN;
const isProduction = process.env.NODE_ENV === "production";
if (!ACCESS_TOKEN || !REFRESH_TOKEN) {
    throw new Error("Falha no .env");
}
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, ACCESS_TOKEN, { expiresIn: '2h' });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, REFRESH_TOKEN, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
const cookieConfig = () => {
    const baseConfig = {
        httpOnly: true,
        secure: isProduction,
        maxAge: 15 * 60 * 1000,
        path: '/',
        sameSite: isProduction ? 'none' : 'lax'
    };
    if (isProduction) {
        return {
            ...baseConfig,
            domain: '.aubertbarbosa.com'
        };
    }
    return baseConfig;
};
exports.cookieConfig = cookieConfig;
