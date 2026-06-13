"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyStoreOwnership = void 0;
const checkIsValid_1 = require("@/helpers/checkIsValid");
class VerifyStoreOwnership {
    constructor(store, redis) {
        this.store = store;
        this.redis = redis;
    }
    getStoreId(req) {
        const bodyStoreId = req.body?.storeId;
        const paramsStoreId = req.params?.storeId;
        const queryStoreId = req.query?.storeId;
        if (bodyStoreId && (0, checkIsValid_1.checkIsAValidInteger)(bodyStoreId)) {
            return Number(bodyStoreId);
        }
        if (paramsStoreId && (0, checkIsValid_1.checkIsAValidInteger)(paramsStoreId)) {
            return Number(paramsStoreId);
        }
        if (queryStoreId && (0, checkIsValid_1.checkIsAValidInteger)(queryStoreId)) {
            return Number(queryStoreId);
        }
        return null;
    }
    async handler(req, res, next) {
        const userId = req.user;
        const storeId = this.getStoreId(req);
        if (!storeId) {
            return res.status(400).send({ message: 'Invalid store ID.' });
        }
        try {
            const getCachedItems = await this.redis.getCachedStoreId(userId, storeId);
            if (getCachedItems)
                return next();
            const check = await this.store.checkOwnerShip(storeId, Number(userId));
            if (!check) {
                return res.status(403).send({ message: "You do not have permission to access this store." });
            }
            await this.redis.saveCacheStoreId(storeId, userId);
            next();
        }
        catch (err) {
            return res.status(500).send({ message: "An unexpected error occurred." });
        }
    }
}
exports.VerifyStoreOwnership = VerifyStoreOwnership;
