"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartService = void 0;
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class UserCartService {
    constructor(cart, product) {
        this.cart = cart;
        this.product = product;
    }
    async create(userId, productId, quantity) {
        if (quantity <= 0) {
            quantity = 1;
        }
        const countCartItems = await this.cart.countUserCart(userId);
        if (countCartItems > 5) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Cart limit reached. You can only have up to 5 items in your cart.",
                status: 400,
                action: "create",
                service: "UserCartService",
                context: {
                    userId, quantity
                }
            });
        }
        const { product } = await this.product.getProductById(productId);
        if (!product) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Product not found.",
                status: 404,
                action: "create",
                service: "UserCartService",
                context: {
                    userId, quantity
                }
            });
        }
        await this.cart.create(userId, productId, quantity);
    }
    async removeItem(datas) {
        await this.cart.removeItem(datas);
    }
    async getAllCartItems(userId) {
        return await this.cart.getAllCartItems(userId);
    }
    async updateCart(userId, datas) {
        for (const { quantity, cartId } of datas) {
            await this.cart.updateCart(cartId, userId, quantity);
        }
    }
}
exports.UserCartService = UserCartService;
