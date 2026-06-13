"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const ErrorMessage_1 = require("../../../helpers/ErrorMessage");
class ReviewsService {
    constructor(reviews, order) {
        this.reviews = reviews;
        this.order = order;
    }
    async checkOrder(userId, OrderId) {
        const order = await this.order.getOrderItemByIdAndUserId(userId, OrderId, "completed");
        if (!order) {
            throw new ErrorMessage_1.ErrorMessage({ message: "Order item not found or does not belong to the user.",
                status: 404,
                service: "ReviewsService",
                action: "checkOrder"
            });
        }
        return order;
    }
    async addReview({ rating, content, orderId, userId }) {
        const order = await this.checkOrder(userId, orderId);
        if (rating > 5)
            rating = 5;
        if (rating <= 0)
            rating = 1;
        await this.reviews.addReview({
            userId, rating, orderId: order.id, productId: order.productId,
            content
        });
    }
}
exports.ReviewsService = ReviewsService;
