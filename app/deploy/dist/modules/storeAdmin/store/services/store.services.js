"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const checkIsValidImage_1 = require("../../../../helpers/checkIsValidImage");
const ErrorMessage_1 = require("../../../../helpers/ErrorMessage");
const uploadFIles_1 = require("../../../../config/imageUpload/uploadFIles");
const logger_1 = require("@/config/logger/logger");
const storage = (0, uploadFIles_1.makeUploadFile)();
class StoreService {
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
        this.logger = (0, logger_1.startLogger)();
    }
    async createStore({ name, description, userId, fileBuffer, mimeType }) {
        const imagePath = (0, checkIsValidImage_1.generateImgPath)();
        const imageUrl = `tmp/market/${imagePath}`;
        const photo = `market/${imagePath}`;
        const existsStoreName = await this.storeRepository.findByName(name);
        if (existsStoreName) {
            throw new ErrorMessage_1.ErrorMessage({ message: "A store with this name already exists.",
                status: 409,
                service: "StoreService",
                action: "createStore"
            });
        }
        const userAlreadyHaveStore = await this.storeRepository.selectUserStores(userId);
        if (userAlreadyHaveStore.length > 0) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "User already has a store",
                status: 409,
                service: "StoreService",
                action: "createStore"
            });
        }
        const storeId = await this.storeRepository.createStore({
            storeName: name,
            userId,
            photo,
            description
        });
        const isFileUpload = await storage.uploadImage({
            fileBuffer,
            urlPath: imageUrl,
            mimeType
        });
        if (!isFileUpload.success) {
            await this.storeRepository.deleteStore(storeId);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to save image.",
                service: "ProductAdminService",
                action: "uploadImage",
                status: 500
            });
        }
        this.logger.info({
            event: "store_created_success",
            message: "Store created successfully.",
            status: 201,
            action: "createStore",
            storeId,
            userId,
            imageKey: imageUrl,
        });
    }
    async findByName(storeName) {
        try {
            const datas = await this.storeRepository.findByName(storeName);
            if (!datas)
                return false;
            return true;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({ message: "Failed to find a store",
                status: 409,
                service: "StoreService",
                action: "findByName",
                prismaError
            });
        }
    }
    async checkOwnerShip(storeId, userId) {
        try {
            const datas = await this.storeRepository.checkStoreOwnerShip(storeId);
            return datas?.userId === userId;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to find a store",
                status: 409,
                service: "StoreService",
                action: "checkOwnerShip",
                prismaError
            });
        }
    }
    async selectUserStores(userId) {
        try {
            const datas = await this.storeRepository.selectUserStores(userId);
            this.logger.info({
                event: "user_stores_selected",
                message: "User stores retrieved successfully.",
                status: 200,
                action: "selectUserStores",
                userId,
                totalStores: datas.length,
            });
            return datas;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to find a store",
                status: 409,
                prismaError,
                action: "selecUserStores",
                service: "StoreService"
            });
        }
    }
    async countProductStore(storeId) {
        try {
            const count = await this.storeRepository.countProductStore(storeId);
            if (!count)
                return 0;
            return count;
        }
        catch (err) {
            return 0;
        }
    }
    async getProductsByStoreId(storeId, page) {
        const limit = 10;
        const countProducts = await this.countProductStore(storeId);
        if (countProducts === 0) {
            return {
                datas: [],
                totalPages: 0,
                currentPage: 0
            };
        }
        const totalPages = Math.ceil(countProducts / limit);
        if (page > totalPages)
            page = totalPages;
        const skip = (page - 1) * limit;
        const datas = await this.storeRepository.getProductsByStoreId(storeId, skip, limit);
        this.logger.info({
            event: "store_products_listed",
            message: "Store products retrieved successfully.",
            status: 200,
            action: "getProductsByStoreId",
            storeId,
            totalProducts: countProducts,
        });
        return {
            datas,
            totalPages,
            currentPage: page
        };
    }
}
exports.StoreService = StoreService;
