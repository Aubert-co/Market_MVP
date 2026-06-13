"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = retry;
async function retry({ retries, func, body }) {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const value = await func(body);
            if (value.success) {
                return value;
            }
            throw new Error("Operation failed");
        }
        catch (err) {
            lastError = err;
            if (attempt < retries) {
                await new Promise(res => setTimeout(res, 100 * attempt));
            }
        }
    }
    return { success: false };
}
