"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeVerifyStoreMiddle_1 = require("@/factory/makeVerifyStoreMiddle");
const auth_1 = require("@/middleware/auth");
const express_1 = require("express");
const storeDash_controller_1 = require("../controller/storeDash.controller");
const storeDashboard_services_1 = require("../services/storeDashboard.services");
const storeDashboard_repository_1 = require("../repository/storeDashboard.repository");
const prisma_1 = require("@/database/prisma");
const orders_repository_1 = require("../../orders/repository/orders.repository");
const store_repository_1 = require("../repository/store.repository");
const coupon_repository_1 = require("../../coupon/coupon.repository");
const route = (0, express_1.Router)();
const orderAdminRep = new orders_repository_1.AdminOrderRep(prisma_1.prisma);
const storeDashboardRep = new storeDashboard_repository_1.StoreDashboardRep(prisma_1.prisma);
const storeAdminRep = new store_repository_1.StoreRepository(prisma_1.prisma);
const couponsAdmin = new coupon_repository_1.StoreCouponRep(prisma_1.prisma);
const storeService = new storeDashboard_services_1.StoreDashboardService(orderAdminRep, storeDashboardRep, storeAdminRep, couponsAdmin);
const storeDashboard = new storeDash_controller_1.StoreDashboardController(storeService);
route.use(auth_1.Auth);
route.get('/store/dashboard/:storeId', [(req, res, next) => (0, makeVerifyStoreMiddle_1.makeVerifyStoreMiddle)().handler(req, res, next)], [
    (req, res, next) => storeDashboard.dashboard(req, res, next)
]);
exports.default = route;
