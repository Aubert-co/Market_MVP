"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrderService = void 0;
const pagination_1 = require("@/helpers/pagination");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class AdminOrderService {
    constructor(orderRep) {
        this.orderRep = orderRep;
    }
    async searchOrders({ storeId, status, limit, orderBy = "desc", page, searchByOrderId }) {
        try {
            const skip = (0, pagination_1.calcSkipPages)(page, limit);
            const { datas, pageInfo } = await this.orderRep.search({
                searchByOrderId, status, storeId, orderBy, pagination: { skip, limit }
            });
            const { skip: skipPage, currentPage, totalPages } = (0, pagination_1.pagination)({
                totalItems: pageInfo.totalItems,
                page, limit
            });
            return {
                datas, pagination: {
                    currentPage, skip: skipPage, totalPages
                }
            };
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to search orders.",
                status: 500,
                prismaError,
                service: "OrdersServices",
                action: "searchOrders"
            });
        }
    }
    async getLastOrders(storeId) {
        try {
            const datas = await this.orderRep.getLastOrders(storeId);
            return datas;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get store last orders.",
                status: 500,
                service: "OrdersServices",
                action: "getLastOrders",
                prismaError
            });
        }
    }
}
exports.AdminOrderService = AdminOrderService;
