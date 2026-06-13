"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const order_validators_1 = require("../validators/order.validators");
class OrdersController {
    constructor(order) {
        this.order = order;
    }
    async userCreateOrder(req, res, next) {
        const userId = req.user;
        try {
            const { ordersInput } = (0, order_validators_1.orderValidator)(req);
            await this.order.createOrder({ userId, items: ordersInput });
            res.status(201).send({ message: 'Sucess' });
        }
        catch (err) {
            next(err);
        }
    }
    async getUserOrders(req, res, next) {
        const userId = req.user;
        try {
            const datas = await this.order.getUserOrder(userId);
            res.status(200).send({ message: 'Sucess', datas });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.OrdersController = OrdersController;
