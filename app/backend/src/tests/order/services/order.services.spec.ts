import { ErrorMessage } from "@/helpers/ErrorMessage";
import { IOrderRepository } from "@/modules/orders/repository/order.repository";
import { OrderService } from "@/modules/orders/services/order.services";

import { orderInfo } from "@/tests/__fixtures__/orderInfo";
import { orders } from "@/tests/__fixtures__/orders";

describe("OrderService method createOrder", () => {
    let mockRepository: IOrderRepository;
    let orderService: OrderService;

    beforeEach(() => {
        mockRepository = {
            createOrder: jest.fn(),
            getOrder: jest.fn(),
            getOrderItems: jest.fn(),
            storeGetOrderItems: jest.fn(),
            getOrderItemByIdAndUserId: jest.fn(),
            getOrderInfo: jest.fn(),
        };
        orderService = new OrderService(mockRepository);
    });

    it("should create an order using the repository", async () => {
        const orderInput = {
            userId: 3,
            items: [{ productId: 10, quantity: 2, couponId: 4 }],
        };
        mockRepository.createOrder = jest.fn().mockResolvedValue(undefined);

        await expect(orderService.createOrder(orderInput)).resolves.toBeUndefined();

        expect(mockRepository.createOrder).toHaveBeenCalledTimes(1);
        expect(mockRepository.createOrder).toHaveBeenCalledWith(orderInput);
    });

    it("should propagate repository errors", async () => {
        const orderInput = {
            userId: 3,
            items: [{ productId: 10, quantity: 2 }],
        };
        const error = new Error("Order creation failed");
        mockRepository.createOrder = jest.fn().mockRejectedValue(error);

        await expect(orderService.createOrder(orderInput)).rejects.toBe(error);
    });
});

describe("OrderService method getOrderDetails", () => {
    let mockRepository: IOrderRepository;
    let orderService: OrderService;

    beforeEach(() => {
        mockRepository = {
            createOrder: jest.fn(),
            getOrder: jest.fn(),
            getOrderItems: jest.fn(),
            storeGetOrderItems: jest.fn(),
            getOrderItemByIdAndUserId: jest.fn(),
            getOrderInfo: jest.fn(),
        };
        orderService = new OrderService(mockRepository);
    });

    it("should return order details for the requested order and user", async () => {
        const orderId = orderInfo.id;
        const userId = orders[0].userId;
        mockRepository.getOrderInfo = jest.fn().mockResolvedValue(orderInfo);

        const result = await orderService.getOrderDetails(orderId, userId);

        expect(result).toEqual(orderInfo);
        expect(result?.product).toEqual(orderInfo.product);
        expect(result?.coupon).toEqual(orderInfo.coupon);
        expect(mockRepository.getOrderInfo).toHaveBeenCalledTimes(1);
        expect(mockRepository.getOrderInfo).toHaveBeenCalledWith(orderId, userId);
    });

    it("should return null when the requested order is not found", async () => {
        const orderId = 999;
        const userId = orders[0].userId;
        mockRepository.getOrderInfo = jest.fn().mockResolvedValue(null);

        const result = await orderService.getOrderDetails(orderId, userId);

        expect(result).toBeNull();
        expect(mockRepository.getOrderInfo).toHaveBeenCalledWith(orderId, userId);
    });

    it("should wrap repository errors in an ErrorMessage", async () => {
        const orderId = orders[0].id;
        const userId = orders[0].userId;
        mockRepository.getOrderInfo = jest.fn().mockRejectedValue(new Error("Database unavailable"));
        const result = orderService.getOrderDetails(orderId, userId);

        await expect(result).rejects.toBeInstanceOf(ErrorMessage);
        await expect(result).rejects.toMatchObject({
            name: "ErrorMessage",
            message: "Database error while fetching order details.",
            status: 500,
            service: "OrderRepository",
            action: "getOrderDetails",
            context: { orderId, userId },
        });
    });
});

describe("OrderService method getUserOrder", () => {
    let mockRepository: IOrderRepository;
    let orderService: OrderService;

    beforeEach(() => {
        mockRepository = {
            createOrder: jest.fn(),
            getOrder: jest.fn(),
            getOrderItems: jest.fn(),
            storeGetOrderItems: jest.fn(),
            getOrderItemByIdAndUserId: jest.fn(),
            getOrderInfo: jest.fn(),
        };
        orderService = new OrderService(mockRepository);
    });

    it("should return the user's orders from the repository", async () => {
        const userId = orders[0].userId;
        const userOrders = [orderInfo];
        mockRepository.getOrder = jest.fn().mockResolvedValue(userOrders);

        const result = await orderService.getUserOrder(userId);

        expect(result).toEqual(userOrders);
        expect(mockRepository.getOrder).toHaveBeenCalledTimes(1);
        expect(mockRepository.getOrder).toHaveBeenCalledWith(userId);
    });

    it("should wrap repository errors in an ErrorMessage", async () => {
        const userId = orders[0].userId;
        mockRepository.getOrder = jest.fn().mockRejectedValue(new Error("Database unavailable"));
        const result = orderService.getUserOrder(userId);

        await expect(result).rejects.toBeInstanceOf(ErrorMessage);
        await expect(result).rejects.toMatchObject({
            name: "ErrorMessage",
            message: "Database error while fetching user orders.",
            status: 500,
            service: "OrderRepository",
            action: "getUserOrder",
            context: { userId },
        });
    });
});
