"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdminController = void 0;
const products_validators_1 = require("../validators/products.validators");
class ProductAdminController {
    constructor(products) {
        this.products = products;
    }
    async productMostViewed(req, res, next) {
        const { storeId } = req.params;
        try {
            const datas = await this.products.productMostViewed(Number(storeId));
            res.status(200).send({ message: 'Success', datas });
        }
        catch (err) {
            next(err);
        }
    }
    async getStoreProducts(req, res, next) {
        try {
            const { storeId, search, category, priceOrder, stockOrder, limit, page } = (0, products_validators_1.getStoreProductValidator)(req);
            const { datas, pagination } = await this.products.getStoreProducts({
                storeId, search, category, priceOrder,
                take: limit, page, stockOrderBy: stockOrder
            });
            res.status(200).send({ message: "Success", datas, pagination });
        }
        catch (err) {
            next(err);
        }
    }
    async createProduct(req, res, next) {
        try {
            const { stock, storeId, name, description, category, price, buffer, originalname, mimetype } = (0, products_validators_1.createProductValidator)(req);
            await this.products.createProduct({ category,
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                storeId: Number(storeId),
                fileBuffer: buffer,
                mimeType: mimetype,
            });
            res.status(201).send({ message: "Product sucessfully created." });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ProductAdminController = ProductAdminController;
