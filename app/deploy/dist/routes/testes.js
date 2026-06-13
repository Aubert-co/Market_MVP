"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("@/database/prisma");
const _seed_1 = require("@/tests/_seed_");
const express_1 = require("express");
const route = (0, express_1.Router)();
const isTestE2E = process.env.NODE_ENV === "test-e2e";
route.post("/test/reset", async (req, res, next) => {
    if (!isTestE2E)
        return res.status(403);
    try {
        await prisma_1.prisma.$executeRawUnsafe(`
           TRUNCATE TABLE 
            "CouponUsage",
            "Cartitem",
            "Comment",
            "Review",
            "Order",
            "Product",
            "Coupon",
            stores,
            "User",
            "View"
            RESTART IDENTITY CASCADE;
        `);
        await (0, _seed_1.seedDatabase)();
        res.status(200).send({ message: "reset" });
    }
    catch (err) {
        next(err);
    }
});
exports.default = route;
