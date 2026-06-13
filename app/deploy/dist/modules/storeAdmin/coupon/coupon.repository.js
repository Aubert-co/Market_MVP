"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCouponRep = void 0;
const dates_1 = require("@/helpers/dates");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class StoreCouponRep {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async storeCreateCoupon({ storeId, quantity, expiresAt, code, discount, discountType }) {
        try {
            await this.prisma.coupon.create({
                data: {
                    storeId,
                    quantity,
                    expiresAt,
                    discount,
                    discountType,
                    code
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to create a coupon.",
                status: 500,
                prismaError,
                service: "CouponRepository",
                action: "storeCreateCoupon",
                context: {
                    storeId
                }
            });
        }
    }
    async countStoreCoupons(storeId) {
        try {
            return await this.prisma.coupon.count({
                where: {
                    storeId,
                    expiresAt: {
                        gt: dates_1.now
                    }
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to count store coupon.",
                status: 500,
                action: "countStoreCoupons",
                service: "CouponRepository",
                prismaError
            });
        }
    }
    async checkCouponByCode(code) {
        try {
            const coupon = await this.prisma.coupon.findFirst({
                where: { code }
            });
            if (coupon)
                return true;
            return false;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to verify the coupon",
                status: 500,
                service: "CouponRepository",
                action: "checkCouponByCode",
                prismaError
            });
        }
    }
    async storeGetCoupons(storeId, limit = 5, skip) {
        try {
            return await this.prisma.coupon.findMany({
                where: {
                    storeId,
                    expiresAt: {
                        gt: dates_1.now
                    }
                },
                take: limit,
                skip
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get coupons",
                status: 500,
                service: "CouponRepository",
                prismaError,
                action: "storeGetCoupons"
            });
        }
    }
}
exports.StoreCouponRep = StoreCouponRep;
