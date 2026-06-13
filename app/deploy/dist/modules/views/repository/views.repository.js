"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsRepository = void 0;
class ViewsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async increaseProductViews({ productId, userId, sessionId, source }) {
        const FIVE_MINUTES = 5 * 60 * 1000;
        const exists = await this.prisma.view.findFirst({
            where: {
                productId,
                sessionId,
                viewedAt: {
                    gte: new Date(Date.now() - FIVE_MINUTES)
                }
            },
            select: { id: true }
        });
        if (exists)
            return;
        await this.prisma.view.create({
            data: {
                productId,
                userId,
                sessionId,
                source
            }
        });
    }
}
exports.ViewsRepository = ViewsRepository;
