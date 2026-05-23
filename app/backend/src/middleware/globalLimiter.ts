import rateLimit from "express-rate-limit";

const isTestE2E = process.env.NODE_ENV ==="test-e2e"
let max = 100

if(isTestE2E){
  max = 10000000
}
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  }
});