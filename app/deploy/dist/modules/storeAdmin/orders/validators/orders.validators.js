"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSearchOrders = void 0;
const helpers_1 = require("@/helpers");
const checkIsValid_1 = require("@/helpers/checkIsValid");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const validateSearchOrders = (req) => {
    let { currentPage, orderId, status, orderBy, limit } = req.query;
    const limitStr = (0, helpers_1.getInteger)(limit);
    const statusStr = (0, helpers_1.getValidString)(status);
    const orderStr = (0, helpers_1.getValidString)(orderBy);
    const limitNumber = limitStr ? limitStr : 5;
    const orderByStr = (0, checkIsValid_1.checkOrderBy)(orderStr) ? orderStr : "desc";
    const statusValue = (0, checkIsValid_1.checkIsValidStatus)(statusStr) ? statusStr : undefined;
    if (orderId && !(0, checkIsValid_1.checkIsAValidInteger)(orderId)) {
        throw new ErrorMessage_1.ErrorMessage({
            message: "Invalid orderId. It must be a valid integer.",
            status: 400,
            service: "Validate",
            action: "validateSearchOrders"
        });
    }
    return {
        page: (0, helpers_1.getPage)(currentPage),
        searchByOrderId: Number(orderId),
        limit: limitNumber,
        status: statusValue,
        orderBy: orderByStr,
    };
};
exports.validateSearchOrders = validateSearchOrders;
