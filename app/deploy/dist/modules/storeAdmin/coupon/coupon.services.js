"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponStoreService = void 0;
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const pagination_1 = require("@/helpers/pagination");
const logger_1 = require("@/config/logger/logger");
class CouponStoreService {
    constructor(coupon) {
        this.coupon = coupon;
        this.logger = (0, logger_1.startLogger)();
    }
    async storeCreateCoupon({ quantity, expiresAt, storeId, discountType, discount, code }) {
        const countStoreCoupons = await this.coupon.countStoreCoupons(storeId);
        code = code.toUpperCase();
        if (countStoreCoupons > 5) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Limit of active coupons reached for this store.",
                status: 400,
                action: "storeCreateCoupon",
                service: "CouponServices",
                context: { storeId }
            });
        }
        if (quantity > 50)
            quantity = 50;
        const checkCode = await this.coupon.checkCouponByCode(code);
        if (checkCode) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Coupon code already exists",
                status: 409,
                action: "storeCreateCoupon",
                service: "CouponServices",
                context: { storeId }
            });
        }
        await this.coupon.storeCreateCoupon({
            quantity, expiresAt, storeId, discount, discountType, code
        });
        this.logger.info({
            event: "coupon_created",
            message: "Coupon created successfully.",
            status: 201,
            action: "storeCreateCoupon",
            service: "CouponServices",
            storeId,
            code,
            quantity,
            discount,
            discountType,
            expiresAt,
        });
    }
    async storeSelectCoupon(storeId, limit = 5, page) {
        const totalItems = await this.coupon.countStoreCoupons(storeId);
        if (totalItems === 0) {
            return {
                datas: [],
                totalPages: 1,
                currentPage: 1
            };
        }
        const { skip, currentPage, totalPages } = (0, pagination_1.pagination)({
            page, limit, totalItems
        });
        const datas = await this.coupon.storeGetCoupons(storeId, limit, skip);
        return {
            datas, totalPages, currentPage
        };
    }
}
exports.CouponStoreService = CouponStoreService;
