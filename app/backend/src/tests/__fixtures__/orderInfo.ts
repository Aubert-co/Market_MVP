import { GetOrder } from "@/modules/orders/types/order.types";

export const orderInfo: GetOrder = {
    id: 1,
    total: 299.9,
    quantity: 1,
    price: 299.9,
    status: "completed",
    createdAt: new Date("2026-03-01T10:30:00Z"),
    coupon: {
        discount: 15,
        discountType: "percent",
    },
    product: {
        name: "Fone Bluetooth JBL",
        imageUrl: "https://picsum.photos/seed/1/600/400",
    },
};
