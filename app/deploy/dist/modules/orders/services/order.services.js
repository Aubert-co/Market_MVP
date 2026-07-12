"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const logger_1 = require("@/config/logger/logger");
const ErrorMessage_1 = require("../../../helpers/ErrorMessage");
class OrderService {
    constructor(order) {
        this.order = order;
        this.logger = (0, logger_1.startLogger)();
    }
    async createOrder({ userId, items }) {
        await this.order.createOrder({ userId, items });
        this.logger.info({
            event: "order_created",
            message: "Order created successfully.",
            status: 201,
            action: "createOrder",
            userId,
            itemsCount: items.length,
        });
    }
    async getUserOrder(userId) {
        try {
            const datas = await this.order.getOrder(userId);
            return datas;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Database error while fetching user orders.",
                status: 500,
                action: "getCouponById",
                service: "OrderRepository",
                context: {
                    userId
                },
                prismaError
            });
        }
    }
}
exports.OrderService = OrderService;
