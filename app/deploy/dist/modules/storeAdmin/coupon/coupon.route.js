"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_repository_1 = require("./coupon.repository");
const coupon_services_1 = require("./coupon.services");
const express_1 = require("express");
const prisma_1 = require("@/database/prisma");
const coupon_controller_1 = require("./coupon.controller");
const auth_1 = require("@/middleware/auth");
const makeVerifyStoreMiddle_1 = require("@/factory/makeVerifyStoreMiddle");
const route = (0, express_1.Router)();
const couponRepository = new coupon_repository_1.StoreCouponRep(prisma_1.prisma);
const couponService = new coupon_services_1.CouponStoreService(couponRepository);
const verifyStoreOwnershipMiddle = (0, makeVerifyStoreMiddle_1.makeVerifyStoreMiddle)();
const couponController = new coupon_controller_1.CouponStoreController(couponService);
route.get('/stores/coupons/:storeId', [
    auth_1.Auth,
    (req, res, next) => verifyStoreOwnershipMiddle.handler(req, res, next)
], (req, res, next) => couponController.storeGetCoupons(req, res, next));
route.post('/stores/coupons', [
    auth_1.Auth,
    (req, res, next) => verifyStoreOwnershipMiddle.handler(req, res, next)
], (req, res, next) => couponController.storeCreateCoupon(req, res, next));
exports.default = route;
