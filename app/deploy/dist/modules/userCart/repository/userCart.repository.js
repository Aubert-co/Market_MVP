"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartRepository = void 0;
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class UserCartRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, productId, quantity) {
        try {
            await this.prisma.cartitem.create({
                data: {
                    productId, quantity, userId
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "An internal error occurred while trying to add the item to the cart.",
                status: 500,
                action: "create",
                service: "UserCartRepository",
                prismaError,
                context: {
                    userId, productId, quantity
                }
            });
        }
    }
    async countUserCart(userId) {
        try {
            return await this.prisma.cartitem.count({
                where: { userId }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to count cart",
                status: 500,
                action: "countUserCart",
                service: "UserCartRepository",
                prismaError,
                context: {
                    userId
                }
            });
        }
    }
    async removeItem(datas) {
        try {
            await this.prisma.cartitem.deleteMany({
                where: {
                    OR: datas
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to remove a item from cart.",
                status: 500,
                action: "removeItem",
                service: "UserCartRepository",
                prismaError,
            });
        }
    }
    async getAllCartItems(userId) {
        try {
            return await this.prisma.cartitem.findMany({
                where: { userId },
                include: { product: {
                        select: {
                            stock: true,
                            price: true,
                            imageUrl: true,
                            name: true
                        }
                    }
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get items from cart.",
                status: 500,
                action: "getAllCartItems",
                service: "UserCartRepository",
                prismaError,
            });
        }
    }
    async updateCart(cartId, userId, quantity) {
        try {
            await this.prisma.cartitem.update({
                where: { id: cartId, userId },
                data: { quantity }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to update cart items.",
                status: 500,
                action: "updateCart",
                service: "UserCartRepository",
                prismaError,
            });
        }
    }
}
exports.UserCartRepository = UserCartRepository;
