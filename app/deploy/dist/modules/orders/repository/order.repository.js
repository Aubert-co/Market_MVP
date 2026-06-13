"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const ErrorMessage_1 = require("../../../helpers/ErrorMessage");
const applyDiscount_1 = require("../../../helpers/applyDiscount");
class OrderRepository {
    constructor(prisma, coupon) {
        this.prisma = prisma;
        this.coupon = coupon;
    }
    async getCouponById(couponId, userId) {
        if (!couponId)
            return { discount: undefined, discountType: undefined };
        const coupon = await this.coupon.getCouponById(couponId);
        if (!coupon) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Coupon not found or is invalid.",
                status: 404,
                action: "getCouponById",
                service: "OrderRepository",
                context: {
                    userId
                }
            });
        }
        const checkCouponUsage = await this.coupon.isUserUsedCoupon(userId, couponId);
        if (!checkCouponUsage) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Coupon has already been used",
                status: 409,
                action: "getCouponById",
                service: "OrderRepository",
                context: {
                    userId
                }
            });
        }
        return {
            discount: coupon.discount, discountType: coupon.discountType
        };
    }
    async getOrder(userId) {
        return await this.prisma.order.findMany({
            where: { userId },
            select: {
                id: true,
                total: true,
                quantity: true,
                status: true,
                price: true,
                createdAt: true,
                coupon: {
                    select: {
                        discount: true,
                        discountType: true
                    }
                },
                product: {
                    select: {
                        name: true,
                        imageUrl: true
                    }
                }
            },
            take: 5
        });
    }
    async getOrderItems(id) {
        return await this.prisma.order.findMany({
            where: { id },
            take: 5,
            include: { 'product': true }
        });
    }
    async storeGetOrderItems(storeId) {
        return await this.prisma.order.findMany({
            where: { product: {
                    storeId
                } },
            take: 5
        });
    }
    async getOrderItemByIdAndUserId(userId, orderId, status) {
        return await this.prisma.order.findUnique({
            where: { id: orderId, userId, status },
        });
    }
    async createOrder({ userId, items }) {
        try {
            await this.prisma.$transaction(async (tx) => {
                for (const val of items) {
                    const product = await tx.product.findFirst({
                        where: { id: val.productId },
                        select: {
                            price: true, stock: true
                        }
                    });
                    if (!product) {
                        throw new ErrorMessage_1.ErrorMessage({
                            message: "No valid product found to create the order.",
                            status: 404,
                            action: "createOrder",
                            service: "OrderRepository",
                            context: {
                                userId
                            }
                        });
                    }
                    if (product.stock < val.quantity) {
                        throw new ErrorMessage_1.ErrorMessage({
                            message: "Insufficient product stock for the requested quantity.",
                            status: 400,
                            action: "createOrder",
                            service: "OrderRepository",
                            context: {
                                userId
                            }
                        });
                    }
                    const { discount, discountType } = await this.getCouponById(val.couponId, userId);
                    const total = (0, applyDiscount_1.applyDiscount)({
                        total: product.price * val.quantity,
                        discount,
                        discountType
                    });
                    await tx.order.create({
                        data: {
                            price: product.price,
                            productId: val.productId,
                            userId,
                            couponId: val.couponId,
                            quantity: val.quantity,
                            total
                        }
                    });
                    await tx.product.update({
                        where: { id: val.productId },
                        data: { stock: product.stock - val.quantity }
                    });
                    if (val.couponId) {
                        await tx.couponUsage.update({
                            where: {
                                userId_couponId: {
                                    userId,
                                    couponId: val.couponId
                                },
                            },
                            data: {
                                usedAt: new Date()
                            }
                        });
                    }
                }
            });
        }
        catch (err) {
            if (err instanceof ErrorMessage_1.ErrorMessage) {
                throw new ErrorMessage_1.ErrorMessage({
                    message: err.message,
                    status: err.status,
                    action: "createOrder",
                    service: "OrderRepository",
                    context: err.context
                });
            }
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Internal error while creating the order.",
                status: 500,
                action: "createOrder",
                service: "OrderRepository",
                prismaError
            });
        }
    }
}
exports.OrderRepository = OrderRepository;
