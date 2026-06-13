"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDiscount = void 0;
const index_1 = require("@/helpers/index");
const applyDiscount = ({ total, discountType, discount }) => {
    if (!discountType || !discount)
        return total;
    let result = discountType === "fixed"
        ? total - discount
        : total - (total * discount) / 100;
    result = (0, index_1.roundTottaly)(result);
    return result >= 0 ? result : 0;
};
exports.applyDiscount = applyDiscount;
