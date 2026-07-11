"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponServices = void 0;
const ErrorMessage_1 = require("../../../helpers/ErrorMessage");
const pagination_1 = require("../../../helpers/pagination");
const logger_1 = require("@/config/logger/logger");
class CouponServices {
    constructor(coupon) {
        this.coupon = coupon;
        this.logger = (0, logger_1.startLogger)();
    }
    async userAddCoupon(couponId, userId) {
        const coupon = await this.coupon.getCouponById(couponId);
        if (!coupon) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Invalid or expired coupon.",
                status: 410,
                action: "userAddCoupon",
                service: "CouponServices",
                context: { couponId, userId }
            });
        }
        const doesUserHaveCoupon = await this.coupon.doesUserHaveCoupon(userId, couponId);
        if (doesUserHaveCoupon) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "This user already possesses the coupon.",
                status: 400,
                action: "doesUserHaveCoupon",
                service: "CouponServices",
                context: { couponId, userId }
            });
        }
        const countUserCoupons = await this.coupon.countCouponUsage(userId);
        if (countUserCoupons >= 5) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Limit of active coupons reached.",
                status: 400,
                action: "countUserCoupons",
                service: "CouponServices",
                context: { couponId, userId }
            });
        }
        const quantity = coupon.quantity - 1;
        try {
            await this.coupon.userAddCouponUsage({ quantity, userId, couponId });
            this.logger.info({
                event: "user_coupon_added",
                message: "Coupon added to user successfully.",
                status: 201,
                action: "userAddCoupon",
                service: "CouponServices",
                userId,
                couponId,
                remainingQuantity: quantity,
            });
        }
        catch (err) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to add user coupon",
                status: 500,
                action: "userAddCouponUsage",
                service: "CouponServices",
                context: { couponId, userId }
            });
        }
    }
    async userListCoupons(userId) {
        return await this.coupon.userListCoupons(userId);
    }
    async availableCoupons(page) {
        const limit = 10;
        const countCoupons = await this.coupon.countAvailableCoupons();
        if (countCoupons === 0) {
            return {
                datas: [],
                totalPages: 1,
                currentPage: 1
            };
        }
        const { skip, currentPage, totalPages } = (0, pagination_1.pagination)({
            totalItems: countCoupons, limit, page
        });
        const datas = await this.coupon.availableCoupons(limit, skip);
        return {
            datas, totalPages, currentPage
        };
    }
}
exports.CouponServices = CouponServices;
