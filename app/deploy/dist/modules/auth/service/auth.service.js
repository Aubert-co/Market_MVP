"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const AuthTokens_1 = require("@/helpers/AuthTokens");
const ErrorMessage_1 = require("@/helpers/ErrorMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("@/config/logger/logger");
class UserService {
    constructor(user) {
        this.user = user;
        this.logger = (0, logger_1.startLogger)();
    }
    async loginUser(email, password) {
        const user = await this.user.findByEmail(email);
        if (!user) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Invalid email or password",
                status: 400,
                service: "UserService",
                action: "loginUser",
            });
        }
        const hashedPassword = user.password;
        const compare = await bcrypt_1.default.compare(password, hashedPassword);
        if (!compare) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "Invalid email or password",
                status: 400,
                service: "UserService",
                action: "loginUser"
            });
        }
        const accessToken = (0, AuthTokens_1.generateAccessToken)(user.id);
        const refreshToken = (0, AuthTokens_1.generateRefreshToken)(user.id);
        this.logger.info({
            event: "user_login_success",
            message: "User logged in successfully.",
            status: 200,
            action: "loginUser",
            service: "UserService",
            userId: user.id,
        });
        return {
            userId: user.id,
            accessToken,
            refreshToken
        };
    }
    async createUserAccount({ email, password, name }) {
        const findUser = await this.user.findByEmail(email);
        if (findUser) {
            throw new ErrorMessage_1.ErrorMessage({
                message: "User already exists",
                status: 409,
                service: "UserService",
                action: "createUserAccount",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await this.user.createUserAccount({ email, password: hashedPassword, name });
        this.logger.info({
            event: "user_account_created",
            message: "User account created successfully.",
            status: 201,
            action: "createUserAccount",
            service: "UserService",
        });
    }
}
exports.UserService = UserService;
