"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("@/database/prisma");
const producs_controller_1 = require("../controller/producs.controller");
const express_1 = require("express");
const fileUpload_1 = require("@/config/imageUpload/fileUpload");
const auth_1 = require("@/middleware/auth");
const products_repository_1 = require("../repository/products.repository");
const products_services_1 = require("../services/products.services");
const makeVerifyStoreMiddle_1 = require("@/factory/makeVerifyStoreMiddle");
const uploadFIles_1 = require("@/config/imageUpload/uploadFIles");
const redis_repository_1 = require("@/config/cache/redis.repository");
const redis_1 = __importDefault(require("@/config/cache/redis"));
const product_cache_1 = require("@/modules/products/cache/product.cache");
const uploadImage = (0, uploadFIles_1.makeUploadFile)();
const productAdminRepository = new products_repository_1.ProductAdminRepository(prisma_1.prisma);
const cache = new redis_repository_1.RedisRepository(redis_1.default);
const cacheProducts = new product_cache_1.CacheProducts(cache);
const productAdminService = new products_services_1.ProductAdminService(productAdminRepository, uploadImage, cacheProducts);
const verifyStoreOwnershipMiddle = (0, makeVerifyStoreMiddle_1.makeVerifyStoreMiddle)();
const productAdmin = new producs_controller_1.ProductAdminController(productAdminService);
const route = (0, express_1.Router)();
route.get('/stores/:storeId/products/most-viewed', [
    auth_1.Auth,
    (req, res, next) => verifyStoreOwnershipMiddle.handler(req, res, next)
], (req, res, next) => productAdmin.productMostViewed(req, res, next));
route.get('/stores/:storeId/products', [
    auth_1.Auth,
    (req, res, next) => verifyStoreOwnershipMiddle.handler(req, res, next)
], (req, res, next) => productAdmin.getStoreProducts(req, res, next));
route.post('/stores/products', [
    fileUpload_1.fileUpload.single('image'),
    auth_1.Auth,
    (req, res, next) => verifyStoreOwnershipMiddle.handler(req, res, next)
], (req, res, next) => productAdmin.createProduct(req, res, next));
exports.default = route;
