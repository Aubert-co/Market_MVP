"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const checkIsValid_1 = require("@/helpers/checkIsValid");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class CouponController {
    constructor(coupon) {
        this.coupon = coupon;
    }
    async userAddCoupon(req, res, next) {
        try {
            const couponId = req.body?.couponId;
            if (!(0, checkIsValid_1.checkIsAValidNumber)(couponId)) {
                throw new ErrorMessage_1.ErrorMessage({
                    message: "Invalid coupon ID. It must be a valid number.",
                    status: 400,
                    action: "userAddCoupon",
                    service: "CouponController"
                });
            }
            const userId = req.user;
            await this.coupon.userAddCoupon(couponId, userId);
            res.status(201).send({ message: 'Success' });
        }
        catch (err) {
            next(err);
        }
    }
    async getAvailableCoupons(req, res, next) {
        try {
            let page = req.query?.page;
            let pageNumber = (0, checkIsValid_1.checkIsAValidNumber)(page) ? Number(page) : 1;
            const { datas, currentPage, totalPages } = await this.coupon.availableCoupons(pageNumber);
            res.status(200).send({ message: 'Success', datas, currentPage, totalPages });
        }
        catch (err) {
            next(err);
        }
    }
    async userListCoupons(req, res, next) {
        try {
            const userId = req.user;
            let datas = await this.coupon.userListCoupons(userId);
            datas = datas.map(val => ({
                ...val,
                ...val.coupon
            }));
            res.status(200).send({ message: 'Success', datas });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CouponController = CouponController;
