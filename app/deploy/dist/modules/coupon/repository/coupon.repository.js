"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRepository = void 0;
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const dates_1 = require("@/helpers/dates");
class CouponRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async isUserUsedCoupon(userId, couponId) {
        try {
            const hasCoupon = await this.prisma.couponUsage.findFirst({
                where: { userId, couponId, usedAt: null }
            });
            if (hasCoupon)
                return true;
            return false;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get user coupon usage",
                status: 500,
                service: "CouponRepository",
                action: "isUserUsedCoupon",
                prismaError,
                context: {
                    userId
                }
            });
        }
    }
    async userAddCoupon(userId, couponId) {
        try {
            await this.prisma.couponUsage.create({
                data: {
                    userId,
                    couponId,
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get coupon",
                status: 500,
                service: "CouponRepository",
                action: "userAddCoupon",
                prismaError
            });
        }
    }
    async userListCoupons(userId) {
        try {
            return await this.prisma.couponUsage.findMany({
                where: { userId, usedAt: null, coupon: {
                        expiresAt: {
                            gt: dates_1.now
                        },
                    } },
                include: { coupon: {
                        select: { expiresAt: true, discount: true, discountType: true, code: true }
                    } }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to select coupons",
                status: 500,
                service: "CouponRepository",
                action: "userListCoupons",
                prismaError
            });
        }
    }
    async countCouponUsage(userId) {
        try {
            return await this.prisma.couponUsage.count({
                where: { userId,
                    coupon: {
                        expiresAt: {
                            gt: dates_1.now
                        },
                    },
                    usedAt: undefined
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to count coupon usage",
                status: 500,
                action: "countCouponUsage",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async doesUserHaveCoupon(userId, couponId) {
        try {
            const coupon = await this.prisma.couponUsage.findFirst({
                where: { userId, couponId }
            });
            if (coupon)
                return true;
            return false;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to check if the user has the coupon",
                status: 500,
                action: "doesUserHaveCoupon",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async getCouponById(couponId) {
        try {
            return await this.prisma.coupon.findUnique({
                where: { id: couponId, expiresAt: {
                        gt: dates_1.now
                    } }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to verify coupon is not expired",
                status: 500,
                action: "getCouponById",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async userHaveCoupon(userId, couponId) {
        try {
            return await this.prisma.couponUsage.findFirst({
                where: {
                    couponId,
                    userId,
                    usedAt: null,
                    coupon: {
                        expiresAt: {
                            gt: dates_1.now
                        }
                    }
                },
                include: {
                    coupon: {
                        select: {
                            discount: true,
                            discountType: true
                        }
                    }
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to verify if the user has a coupon",
                status: 500,
                action: "userHaveCoupon",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async availableCoupons(limit, skip) {
        try {
            return await this.prisma.coupon.findMany({
                take: limit,
                skip,
                where: {
                    expiresAt: {
                        gt: dates_1.now
                    }
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get available coupons",
                status: 500,
                action: "availableCoupons",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async countAvailableCoupons() {
        try {
            return await this.prisma.coupon.count({
                where: {
                    expiresAt: {
                        gt: dates_1.now
                    }
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get available coupons",
                status: 500,
                action: "countAvailableCoupons",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async decreaseCouponQuantity(couponId, value) {
        try {
            await this.prisma.coupon.update({
                where: { id: couponId },
                data: { quantity: value }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to change the coupon quantity",
                status: 500,
                action: "decreaseCouponQuantity",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async userAddCouponUsage({ userId, couponId, quantity }) {
        await this.prisma.$transaction(async (tx) => {
            await tx.couponUsage.create({
                data: {
                    userId,
                    couponId,
                }
            });
            await tx.coupon.update({
                where: { id: couponId },
                data: { quantity }
            });
        });
    }
}
exports.CouponRepository = CouponRepository;
