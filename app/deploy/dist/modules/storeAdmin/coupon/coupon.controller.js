"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponStoreController = void 0;
const checkIsValid_1 = require("@/helpers/checkIsValid");
const dates_1 = require("@/helpers/dates");
class CouponStoreController {
    constructor(coupon) {
        this.coupon = coupon;
    }
    async storeGetCoupons(req, res, next) {
        try {
            const storeId = Number(req.params.storeId);
            const datas = await this.coupon.storeSelectCoupon(storeId, 5, 1);
            res.status(200).send({ message: 'Sucess', ...datas });
        }
        catch (err) {
            next(err);
        }
    }
    async storeCreateCoupon(req, res, next) {
        try {
            const discount = req.body?.discount;
            const discountType = req.body?.discountType;
            const code = req.body?.code;
            const quantity = req.body?.quantity;
            const expiresAt = req.body?.expiresAt;
            const typeOfDiscount = ["fixed", "percent"];
            if (!(0, checkIsValid_1.checkIsAValidNumber)(discount)) {
                return res.status(400).send({
                    message: "Invalid discount value. Please provide a valid number."
                });
            }
            if (!typeOfDiscount.includes(discountType)) {
                return res.status(400).send({
                    message: "Invalid discount type. Only 'fixed' or 'percent' are allowed."
                });
            }
            if (Number(discount) > 60 && discountType === 'percent') {
                return res.status(400).send({
                    message: "Percentage discount cannot exceed 60%."
                });
            }
            if (!(0, checkIsValid_1.isValidString)(code)) {
                return res.status(400).send({
                    message: "Invalid coupon code. Please provide a valid string."
                });
            }
            if (!(0, checkIsValid_1.checkIsAValidNumber)(quantity) || Number(quantity) > 50 || !Number.isInteger(quantity)) {
                return res.status(400).send({
                    message: "Invalid quantity. It must be a valid number and not exceed 50 units."
                });
            }
            if (!(0, dates_1.validDates)(expiresAt)) {
                return res.status(400).send({
                    message: "Invalid expiration date. It must be one of: oneweek, onemonth, or fivedays."
                });
            }
            const { storeId } = req.body;
            const convertToDate = (0, dates_1.convertStringToDate)(expiresAt);
            await this.coupon.storeCreateCoupon({
                storeId, discountType, code, discount,
                expiresAt: convertToDate, quantity
            });
            res.status(201).send({ message: 'Sucess' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CouponStoreController = CouponStoreController;
