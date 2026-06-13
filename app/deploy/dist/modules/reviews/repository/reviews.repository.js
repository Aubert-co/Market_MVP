"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRepository = void 0;
class ReviewsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addReview({ userId, rating, productId, orderId, content }) {
        await this.prisma.$transaction(async (tx) => {
            await tx.review.create({
                data: {
                    orderId, userId, rating, productId
                }
            });
            await tx.comment.create({
                data: {
                    userId, content, productId, orderId
                }
            });
        });
    }
    async userGetReviews(userId, orderId) {
        return await this.prisma.user.findMany({
            select: {
                reviews: {
                    where: { orderId }
                },
                comments: {
                    where: { orderId }
                }
            },
            where: { id: userId },
        });
    }
}
exports.ReviewsRepository = ReviewsRepository;
