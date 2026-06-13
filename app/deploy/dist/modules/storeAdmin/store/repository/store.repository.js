"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRepository = void 0;
const ErrorMessage_1 = require("../../../../helpers/ErrorMessage");
class StoreRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createStore(data) {
        try {
            const store = await this.prisma.store.create({ data: {
                    name: data.storeName,
                    userId: data.userId,
                    description: data.description,
                    photo: data.photo
                } });
            return store.id;
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to create a store",
                status: 409,
                prismaError,
                context: {
                    data
                },
                service: "StoreRepository",
                action: "createStore"
            });
        }
    }
    async deleteStore(storeId) {
        await this.prisma.store.delete({
            where: {
                id: storeId
            }
        });
    }
    async checkStoreOwnerShip(storeId) {
        const datas = await this.prisma.store.findUnique({
            where: { id: storeId }
        });
        return datas;
    }
    async findByName(storeName) {
        const datas = await this.prisma.store.findUnique({
            where: { name: storeName }
        });
        return datas;
    }
    async selectUserStores(userId) {
        const datas = await this.prisma.store.findMany({
            where: { userId }
        });
        return datas;
    }
    async getProductsByStoreId(storeId, skip = 0, limit = 10) {
        try {
            return await this.prisma.product.findMany({
                where: { storeId },
                skip,
                take: limit,
                include: {
                    _count: {
                        select: { views: true, comments: true, reviews: true },
                    },
                }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to get products",
                status: 500,
                prismaError,
                context: {
                    storeId, skip, limit
                },
                service: "StoreRepository",
                action: "getProductByStoreId"
            });
        }
    }
    async countProductStore(storeId, isActive) {
        try {
            return await this.prisma.product.count({
                where: {
                    storeId,
                    ...(isActive && { isActive })
                },
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)("err");
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to count store products",
                status: 500,
                prismaError,
                action: "countProductStore",
                service: "StoreRepository",
                context: {
                    storeId
                }
            });
        }
    }
}
exports.StoreRepository = StoreRepository;
