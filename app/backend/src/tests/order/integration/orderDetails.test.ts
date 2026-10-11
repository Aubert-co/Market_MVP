import { generateAccessToken } from "../../../helpers/AuthTokens";
import app from "../../../serve";
import { orders } from "../../__fixtures__/orders";
import { manyUsers } from "../../__fixtures__/users";
import { couponsDatas } from "../../__fixtures__/coupons";
import { cleanAllDb, cleanCoupons, cleanOrders, createCoupons, createManyOrders, creatManyUsersStoresAndProducts, oneStore } from "../../__mocks__";
import { products } from "../../__fixtures__/products";
import request from "supertest";
import { prisma } from "@/database/prisma";

const endpoint = "/api/orders";
const user = manyUsers[2];
const userCookies = generateAccessToken(user.id);
const anotherUserCookies = generateAccessToken(manyUsers[1].id);
const { validCoupons } = couponsDatas(oneStore.id);
const detailedOrders = orders.map((order, index) => (
    index === 0 ? { ...order, couponId: validCoupons[0].id } : order
));

describe("Api GET /orders/:id/details", () => {
    beforeAll(async () => {
        await cleanCoupons();
        await cleanOrders();
        await cleanAllDb();
        await creatManyUsersStoresAndProducts();
        await createCoupons(validCoupons);
        await createManyOrders(detailedOrders);
    });

    afterAll(async () => {
        await cleanCoupons();
        await cleanOrders();
        await cleanAllDb();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return the order details for the authenticated user", async () => {
        const order = detailedOrders[0];

        const response = await request(app)
            .get(`${endpoint}/${order.id}/details`)
            .set("Cookie", [`token=${userCookies}`]);

        const [product] = products;
        const [coupon] = validCoupons;

        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual("Sucess");
        expect(response.body.datas).toEqual({
            id: order.id,
            total: order.total,
            quantity: order.quantity,
            status: order.status,
            price: order.price,
            createdAt: order.createdAt.toISOString(),
            coupon: {
                discount: coupon.discount,
                discountType: coupon.discountType,
            },
            product: {
                name: product.name,
                imageUrl: product.imageUrl,
            },
        });
    });

    it("should return 404 when the order does not exist", async () => {
        const response = await request(app)
            .get(`${endpoint}/99999/details`)
            .set("Cookie", [`token=${userCookies}`]);

        expect(response.statusCode).toEqual(404);
        expect(response.body.message).toEqual("Order not found.");
    });

    it("should return 404 when the order belongs to another user", async () => {
        const response = await request(app)
            .get(`${endpoint}/${detailedOrders[0].id}/details`)
            .set("Cookie", [`token=${anotherUserCookies}`]);

        expect(response.statusCode).toEqual(404);
        expect(response.body.message).toEqual("Order not found.");
    });

    it("should return 400 when the order ID is invalid", async () => {
        const response = await request(app)
            .get(`${endpoint}/invalid/details`)
            .set("Cookie", [`token=${userCookies}`]);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Invalid order ID.");
    });

    it("should return 500 when the database fails to retrieve the order", async () => {
        jest.spyOn(prisma.order, "findUnique").mockRejectedValue(new Error("Database unavailable"));

        const response = await request(app)
            .get(`${endpoint}/${detailedOrders[0].id}/details`)
            .set("Cookie", [`token=${userCookies}`]);

        expect(response.statusCode).toEqual(500);
        expect(response.body.message).toEqual("Database error while fetching order details.");
    });
});
