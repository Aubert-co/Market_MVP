"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartController = void 0;
const checkIsValid_1 = require("@/helpers/checkIsValid");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class UserCartController {
    constructor(userCart) {
        this.userCart = userCart;
    }
    async addItemToCart(req, res, next) {
        const quantity = Number(req.body.quantity);
        const productId = Number(req.body.productId);
        if (!(0, checkIsValid_1.checkIsAValidNumber)(quantity) || !Number.isInteger(quantity)) {
            return res.status(400).send({
                message: "Invalid quantity. Please provide a valid number."
            });
        }
        if (!(0, checkIsValid_1.checkIsAValidNumber)(productId)) {
            return res.status(400).send({
                message: "Invalid product ID. Please provide a valid number."
            });
        }
        if (quantity > 5) {
            return res.status(400).send({
                message: "You can only add up to 5 items of this product to the cart."
            });
        }
        try {
            const userId = req.user;
            await this.userCart.create(userId, productId, quantity);
            res.status(201).send({ message: 'Sucess' });
        }
        catch (err) {
            next(err);
        }
    }
    async getCartItems(req, res, next) {
        try {
            const userId = req.user;
            const datas = await this.userCart.getAllCartItems(userId);
            res.status(200).send({ message: 'Sucess', datas });
        }
        catch (err) {
            next(err);
        }
    }
    async removeItemFromCart(req, res, next) {
        try {
            const cart = req.body?.cart;
            if (!Array.isArray(cart) || cart.length > 5) {
                return res.status(400).send({
                    message: "Invalid cart. Please provide a valid cart."
                });
            }
            const userId = req.user;
            const mapedDatas = cart.map((val) => {
                if (!(0, checkIsValid_1.checkIsAValidNumber)(val)) {
                    throw new ErrorMessage_1.ErrorMessage({
                        message: "Invalid cart id. Please provide a valid cart id",
                        status: 400,
                        service: "UserCartController",
                        action: "removeItemFromCart"
                    });
                }
                return {
                    id: Number(val), userId
                };
            });
            await this.userCart.removeItem(mapedDatas);
            res.status(200).send({ message: 'Sucess' });
        }
        catch (err) {
            next(err);
        }
    }
    async updateCart(req, res, next) {
        try {
            const cart = req.body?.cart;
            if (!Array.isArray(cart) || cart.length > 5) {
                return res.status(400).send({ message: 'Invalid cart. Please provide a valid cart.' });
            }
            const userId = req.user;
            const mapCart = cart.map((val) => {
                if (!(0, checkIsValid_1.checkIsAValidNumber)(val.id) || !(0, checkIsValid_1.checkIsAValidNumber)(val.quantity) || !Number.isInteger(val.quantity)) {
                    throw new ErrorMessage_1.ErrorMessage({
                        message: "Invalid cart id. Please provide a valid cart id",
                        status: 400,
                        service: "UserCartController",
                        action: "updateCart"
                    });
                }
                if (val.quantity > 5) {
                    throw new ErrorMessage_1.ErrorMessage({
                        message: "You can only add up to 5 items of this product to the cart.",
                        status: 400,
                        service: "UserCartController",
                        action: "updateCart"
                    });
                }
                return {
                    cartId: val.id,
                    quantity: val.quantity,
                };
            });
            await this.userCart.updateCart(userId, mapCart);
            res.status(201).send({ message: 'Sucess' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserCartController = UserCartController;
