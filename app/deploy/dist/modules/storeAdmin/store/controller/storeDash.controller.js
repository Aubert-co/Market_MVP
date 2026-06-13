"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreDashboardController = void 0;
class StoreDashboardController {
    constructor(store) {
        this.store = store;
    }
    async dashboard(req, res, next) {
        try {
            const storeId = Number(req.params.storeId);
            const datas = await this.store.dashboard(storeId);
            res.status(200).send({
                message: "Success",
                datas
            });
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
}
exports.StoreDashboardController = StoreDashboardController;
