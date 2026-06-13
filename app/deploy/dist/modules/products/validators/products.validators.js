"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilterProducts = void 0;
const helpers_1 = require("@/helpers");
const checkIsValid_1 = require("@/helpers/checkIsValid");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const validateFilterProducts = (req) => {
    const { name, orderBy, category, minPrice, maxPrice, } = req.query;
    let nameStr = (0, helpers_1.getString)(name);
    let categoryStr = (0, helpers_1.getString)(category);
    const orderByStr = orderBy === "asc" || orderBy === "desc"
        ? orderBy
        : "desc";
    if (categoryStr && !(0, checkIsValid_1.checkIsAValidCategory)(categoryStr)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid category provided",
            status: 400,
            service: "ValidatorFilterProducts",
            action: "filterProducts"
        });
    }
    if (nameStr && !(0, checkIsValid_1.checkisAValidString)(nameStr)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid name format",
            status: 400,
            service: "ValidatorfilterProducts",
            action: "filterProducts"
        });
    }
    if (maxPrice && !(0, checkIsValid_1.checkIsAValidNumber)(maxPrice)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid maximum price value",
            status: 400,
            service: "ValidatorfilterProducts",
            action: "filterProducts"
        });
    }
    if (minPrice && !(0, checkIsValid_1.checkIsAValidNumber)(minPrice)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid minimum price value",
            status: 400,
            service: "ValidatorfilterProducts",
            action: "filterProducts"
        });
    }
    if (minPrice &&
        maxPrice &&
        Number(minPrice) > Number(maxPrice)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Minimum price cannot be greater than maximum price",
            status: 400,
            service: "ValidatorfilterProducts",
            action: "filterProducts"
        });
    }
    return {
        orderBy: orderByStr,
        category: categoryStr,
        name: nameStr, maxPrice: Number(maxPrice),
        minPrice: Number(minPrice), take: 10, skip: 0
    };
};
exports.validateFilterProducts = validateFilterProducts;
