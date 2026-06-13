"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidator = void 0;
const checkIsValid_1 = require("../../../helpers/checkIsValid");
const ErrorMessage_1 = require("../../../helpers/ErrorMessage");
const orderValidator = (req) => {
    const order = req.body?.order;
    if (!Array.isArray(order) || order.length === 0) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid order payload: expected a non-empty array of items.",
            status: 400,
            action: "userCreateOrder",
            service: "OrdersController",
        });
    }
    const items = order.map((val) => {
        if (!(0, checkIsValid_1.checkIsAValidInteger)(val.productId) || !(0, checkIsValid_1.checkIsAValidInteger)(val.quantity)) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Invalid product ID or quantity. Both must be valid numbers.",
                status: 400,
                action: "userCreateOrder",
                service: "OrdersController",
            });
        }
        if (val.couponId && !(0, checkIsValid_1.checkIsAValidInteger)(val.couponId)) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Invalid coupon ID. It must be a valid number.",
                status: 400,
                action: "userCreateOrder",
                service: "OrdersController",
            });
        }
        if (!val.couponId) {
            return { productId: Number(val.productId), quantity: Number(val.quantity) };
        }
        return { productId: Number(val.productId), quantity: Number(val.quantity),
            ...(val.couponId && { couponId: Number(val.couponId) })
        };
    });
    return {
        ordersInput: items
    };
};
exports.orderValidator = orderValidator;
