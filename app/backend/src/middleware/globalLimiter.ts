import { rateLimitBlocked } from "@/metrics";
import rateLimit from "express-rate-limit";

const isTestE2E = process.env.NODE_ENV ==="test-e2e"
let max = 100

if(isTestE2E){
  max = 10000000
}
const IGNORED = new Set(["/metrics", "/health"]);
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max,
  standardHeaders: true,
  legacyHeaders: false,

  skip: (req) => IGNORED.has(req.path),

  handler: (req, res) => {
    rateLimitBlocked.inc({
      route: req.path,
      method: req.method
    });

    return res.status(429).json({
      status: 429,
      message: "Too many requests from this IP, please try again later."
    });
  }
});