"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilterProducts = void 0;
const helpers_1 = require("@/helpers");
const checkIsValid_1 = require("@/helpers/checkIsValid");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const validateFilterProducts = (req) => {
    const { name, orderBy, category, minPrice, maxPrice } = req.query;
    let nameStr = (0, helpers_1.getString)(name);
    nameStr = nameStr === "" ? undefined : nameStr;
    let categoryStr = (0, helpers_1.getString)(category);
    categoryStr = categoryStr === "" ? undefined : categoryStr;
    const minPriceNum = minPrice !== undefined && minPrice !== ""
        ? Number(minPrice)
        : undefined;
    const maxPriceNum = maxPrice !== undefined && maxPrice !== ""
        ? Number(maxPrice)
        : undefined;
    const orderByStr = orderBy === "asc" || orderBy === "desc"
        ? orderBy
        : "asc";
    if (categoryStr && !(0, checkIsValid_1.checkIsAValidCategory)(categoryStr)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid category provided",
            status: 400,
            service: "ValidatorFilterProducts",
            action: "filterProducts"
        });
    }
    if (nameStr && !(0, checkIsValid_1.isValidString)(nameStr, { minLength: 1 })) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid name format",
            status: 400,
            service: "ValidatorFilterProducts",
            action: "filterProducts"
        });
    }
    if (minPriceNum !== undefined &&
        !(0, checkIsValid_1.checkIsAValidNumber)(minPriceNum)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid minimum price value",
            status: 400,
            service: "ValidatorFilterProducts",
            action: "filterProducts"
        });
    }
    if (maxPriceNum !== undefined &&
        !(0, checkIsValid_1.checkIsAValidNumber)(maxPriceNum)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid maximum price value",
            status: 400,
            service: "ValidatorFilterProducts",
            action: "filterProducts"
        });
    }
    if (minPriceNum !== undefined &&
        maxPriceNum !== undefined &&
        minPriceNum > maxPriceNum) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Minimum price cannot be greater than maximum price",
            status: 400,
            service: "ValidatorFilterProducts",
            action: "filterProducts"
        });
    }
    return {
        orderBy: orderByStr,
        category: categoryStr,
        name: nameStr,
        minPrice: minPriceNum,
        maxPrice: maxPriceNum,
        take: 10,
        skip: 0
    };
};
exports.validateFilterProducts = validateFilterProducts;
