"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreAdminController = void 0;
const checkIsValid_1 = require("../../../../helpers/checkIsValid");
const checkIsValidImage_1 = require("@/helpers/checkIsValidImage");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class StoreAdminController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async GetUserStores(req, res, next) {
        try {
            const userId = req.user;
            const stores = await this.storeService.selectUserStores(userId);
            res.status(200).send({ message: 'Sucess', datas: stores });
        }
        catch (err) {
            next(err);
        }
    }
    async GetProductFromStore(req, res, next) {
        try {
            let page = req.query.page;
            let storeId = Number(req.params.storeId);
            let pageNumber = (0, checkIsValid_1.checkIsAValidInteger)(page) ? Number(page) : 1;
            const { datas, totalPages, currentPage } = await this.storeService.getProductsByStoreId(storeId, pageNumber);
            res.status(200).send({ message: 'Sucess', datas, totalPages, currentPage });
        }
        catch (error) {
            next(error);
        }
    }
    async CreateStore(req, res, next) {
        try {
            if (!req.file ||
                !(0, checkIsValidImage_1.checkIsValidImage)({
                    fileBuffer: req.file.buffer,
                    mimeType: req.file.mimetype,
                    originalFileName: req.file.originalname,
                })) {
                throw new ErrorMessage_1.ErrorMessage({
                    message: "Invalid or missing image file.",
                    status: 422,
                    action: "CreateStore",
                    service: "StoreAdminController"
                });
            }
            const { name, description } = req.body;
            const userId = req.user;
            const { buffer, mimetype } = req.file;
            await this.storeService.createStore({ name, description,
                userId, fileBuffer: buffer, mimeType: mimetype
            });
            res.status(201).send({ message: "Store sucessfully created" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StoreAdminController = StoreAdminController;
