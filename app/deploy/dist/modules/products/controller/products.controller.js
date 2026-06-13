"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const checkIsValid_1 = require("../../../helpers/checkIsValid");
const helpers_1 = require("@/helpers");
const products_validators_1 = require("../validators/products.validators");
class ProductsController {
    constructor(products) {
        this.products = products;
    }
    async GetProducts(req, res, next) {
        let page = (0, helpers_1.getPage)(req.query.page);
        try {
            const { datas, currentPage, fromCache, totalPages } = await this.products.getProducts(page);
            res.status(200).send({ message: 'Sucess', datas, totalPages, currentPage, fromCache });
        }
        catch (err) {
            next(err);
        }
    }
    async GetOneProduct(req, res, next) {
        const id = req.params?.id;
        if (!(0, checkIsValid_1.checkIsAValidInteger)(id)) {
            return res.status(500).send({ message: "Failed to retrieve products. Please try again later." });
        }
        try {
            const values = await this.products.getProductById(Number(id));
            const datas = {
                product: values.product ? [values.product] : [],
                ratings: values.ratings,
                comments: values.product?.comments ?? [],
                reviews: values.product?.reviews ?? []
            };
            res.status(200).send({ message: 'Success', datas });
        }
        catch (err) {
            next(err);
        }
    }
    async filterProducts(req, res, next) {
        try {
            const { name, category, maxPrice, minPrice, orderBy } = (0, products_validators_1.validateFilterProducts)(req);
            const datas = await this.products.filterProduct({
                name, category, maxPrice, minPrice, take: 10,
                skip: 0, orderBy
            });
            res.status(200).send({ message: 'Sucess', datas });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ProductsController = ProductsController;
