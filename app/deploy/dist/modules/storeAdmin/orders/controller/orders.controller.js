"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrdersControl = void 0;
const orders_validators_1 = require("../validators/orders.validators");
class AdminOrdersControl {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async searchOrders(req, res, next) {
        const { storeId } = req.params;
        try {
            const inputs = (0, orders_validators_1.validateSearchOrders)(req);
            const { datas, pagination } = await this.ordersService.searchOrders({ ...inputs, storeId: Number(storeId) });
            res.status(200).send({ datas, message: 'Success', pagination });
        }
        catch (err) {
            next(err);
        }
    }
    async getLastOrders(req, res, next) {
        try {
            const { storeId } = req.params;
            const datas = await this.ordersService.getLastOrders(Number(storeId));
            res.status(200).send({
                datas, message: "Success"
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AdminOrdersControl = AdminOrdersControl;
