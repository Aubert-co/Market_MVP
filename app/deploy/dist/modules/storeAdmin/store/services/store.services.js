"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const checkIsValidImage_1 = require("../../../../helpers/checkIsValidImage");
const ErrorMessage_1 = require("../../../../helpers/ErrorMessage");
const uploadFIles_1 = require("../../../../config/imageUpload/uploadFIles");
const compressImages_1 = require("@/helpers/compressImages");
const retry_1 = require("@/helpers/retry");
const storage = (0, uploadFIles_1.makeUploadFile)();
class StoreService {
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
    }
    async createStore({ name, description, userId, fileBuffer, mimeType }) {
        const newUrlPath = (0, checkIsValidImage_1.generateImgPath)();
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
        const compressBuff = await (0, retry_1.retry)({
            func: compressImages_1.compressImage,
            body: { fileBuffer },
            retries: 2
        });
        if (!compressBuff.success || compressBuff.data === undefined) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to compress.",
                action: "compressImage",
                service: "ProductAdminService",
                status: 500
            });
        }
        const storeId = await this.storeRepository.createStore({
            storeName: name,
            userId,
            photo: newUrlPath,
            description
        });
        const isFileUpload = await storage.uploadImage({
            fileBuffer: compressBuff.data,
            urlPath: newUrlPath,
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
        return {
            datas,
            totalPages,
            currentPage: page
        };
    }
}
exports.StoreService = StoreService;
