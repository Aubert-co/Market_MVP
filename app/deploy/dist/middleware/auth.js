"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.ACCESS_TOKEN;
function Auth(req, res, next) {
    if (!req.cookies || !req.cookies.token)
        return res.status(401).json({ message: "Access Denied" });
    const token = req.cookies.token;
    if (!secret)
        return res.status(500).json({ message: 'An unexpected error occurred. Please try again later. no token' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded || !decoded.id || isNaN(Number(decoded.id))) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        req.user = Number(decoded.id);
        next();
    }
    catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
}
