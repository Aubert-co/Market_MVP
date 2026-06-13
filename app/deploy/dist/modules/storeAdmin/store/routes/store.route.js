"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storeAdmin_controller_1 = require("../controller/storeAdmin.controller");
const validateImgAndFiles_1 = require("../../../../middleware/validateImgAndFiles");
const auth_1 = require("../../../../middleware/auth");
const store_services_1 = require("../services/store.services");
const prisma_1 = require("../../../../database/prisma");
const store_repository_1 = require("../repository/store.repository");
const fileUpload_1 = require("../../../../config/imageUpload/fileUpload");
const makeVerifyStoreMiddle_1 = require("../../../../factory/makeVerifyStoreMiddle");
const validateImageAndFields = new validateImgAndFiles_1.ValidateImageAndFields;
const storeRepository = new store_repository_1.StoreRepository(prisma_1.prisma);
const storeService = new store_services_1.StoreService(storeRepository);
const storeAdminController = new storeAdmin_controller_1.StoreAdminController(storeService);
const verifyStoreOwnershipMiddle = (0, makeVerifyStoreMiddle_1.makeVerifyStoreMiddle)();
const route = (0, express_1.Router)();
route.get('/stores', [auth_1.Auth], (req, res, next) => storeAdminController.GetUserStores(req, res, next));
/*route.get('/stores/:storeId/products',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetProductFromStore(req,res,next)
);*/
route.post('/stores', [fileUpload_1.fileUpload.single('image'), auth_1.Auth,
    validateImageAndFields.handler
], (req, res, next) => storeAdminController.CreateStore(req, res, next));
exports.default = route;
