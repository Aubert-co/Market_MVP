"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreProductValidator = exports.createProductValidator = void 0;
const helpers_1 = require("@/helpers");
const checkIsValid_1 = require("@/helpers/checkIsValid");
const checkIsValidImage_1 = require("@/helpers/checkIsValidImage");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const createProductValidator = (req) => {
    const name = req.body?.name;
    const description = req.body?.description;
    const stock = req.body?.stock;
    const price = req.body?.price;
    const category = req.body?.category;
    const storeId = req.body?.storeId;
    if (!req.file ||
        !(0, checkIsValidImage_1.checkIsValidImage)({
            fileBuffer: req.file.buffer,
            mimeType: req.file.mimetype,
            originalFileName: req.file.originalname,
        })) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid or missing image file.",
            status: 422,
            action: "createProduct",
            service: "controller"
        });
    }
    if (!(0, checkIsValid_1.checkisAValidString)(name, 50)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid name. Please check and try again.",
            service: "ProductAdminController",
            action: "createProduct",
            status: 422
        });
    }
    if (!(0, checkIsValid_1.checkisAValidString)(description, 1000)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid description. Please check and try again.",
            status: 422,
            service: "ProductAdminController",
            action: "createProduct"
        });
    }
    if (!(0, checkIsValid_1.checkIsAValidInteger)(stock)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid or missing stock value. Must be a non-negative number.",
            service: "ProductAdminController",
            status: 422,
            action: "createProduct"
        });
    }
    if (!(0, checkIsValid_1.checkIsAValidNumber)(price)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid or missing price value. Must be a non-negative number.",
            service: "ProductAdminController",
            status: 422,
            action: "createProduct"
        });
    }
    if (!(0, checkIsValid_1.checkIsAValidCategory)(category)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid category. Please check and try again.",
            status: 422,
            action: "createProduct",
            service: "ProductAdminController",
        });
    }
    if (!(0, checkIsValid_1.checkIsAValidInteger)(storeId)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid request.",
            service: "ProductAdminController",
            action: "createProduct",
            status: 422
        });
    }
    return {
        name, description, stock, price, category, storeId,
        buffer: req.file.buffer, originalname: req.file.originalname, mimetype: req.file.mimetype
    };
};
exports.createProductValidator = createProductValidator;
const getStoreProductValidator = (req) => {
    let { page, search, category, priceOrder, limit, stockOrder } = req.query;
    const { storeId } = req.params;
    const pageNumber = (0, checkIsValid_1.checkIsAValidInteger)(page) ? Number(page) : 1;
    const priceOrderStr = (0, checkIsValid_1.checkOrderBy)(priceOrder) ? priceOrder : "desc";
    const stockOrderBy = (0, checkIsValid_1.checkOrderBy)(stockOrder) ? stockOrder : "asc";
    const limitNumber = (0, checkIsValid_1.checkIsAValidInteger)(limit) ? Number(limit) : 5;
    const searchString = (0, helpers_1.getString)(search);
    const categoryString = (0, helpers_1.getString)(category);
    if (searchString && !(0, checkIsValid_1.checkisAValidString)(searchString)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid search. Please check and try again.",
            status: 422,
            service: "controller",
            action: "getStoreProduct"
        });
    }
    if (categoryString && !(0, checkIsValid_1.checkIsAValidCategory)(categoryString)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid category. Please check and try again.",
            status: 422,
            service: "controller",
            action: "getStoreProduct"
        });
    }
    return {
        storeId: Number(storeId),
        page: pageNumber,
        priceOrder: priceOrderStr,
        search: searchString,
        limit: limitNumber,
        stockOrder: stockOrderBy,
        category: categoryString
    };
};
exports.getStoreProductValidator = getStoreProductValidator;
