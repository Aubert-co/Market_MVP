"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        try {
            return await this.prisma.user.findUnique({
                where: { email }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to find an user",
                status: 404,
                service: "UserRepository",
                action: "findByEmail",
                prismaError
            });
        }
    }
    async createUserAccount(data) {
        try {
            await this.prisma.user.create({ data });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to create a new user",
                status: 409,
                service: "UserRepository",
                action: "createUserAccount",
                prismaError
            });
        }
    }
    async findUserById(userId) {
        try {
            return await this.prisma.user.findUnique({
                where: { id: userId }
            });
        }
        catch (err) {
            const prismaError = (0, ErrorMessage_1.getPrismaError)(err);
            throw new ErrorMessage_1.ErrorMessage({
                message: "Failed to find an user",
                status: 404,
                service: "UserRepository",
                action: "findUserById",
                prismaError
            });
        }
    }
}
exports.UserRepository = UserRepository;
