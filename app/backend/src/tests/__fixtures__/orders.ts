import { StatusOrder } from "@/modules/orders/types/order.types";

type Orders = {
  id:number,
  userId:number,
  productId:number
  total:number,
  quantity:number,
  price:number,
  status:StatusOrder,
  createdAt:Date,
  couponId:number | null
}
const now = new Date()

const getDate = (day:number)=> new Date(
  now.getFullYear(),
  now.getMonth(),
  day
)
export const orders: Orders[] = [
  {
    id: 1,
    userId: 3,
    productId: 1,
    total: 299.90,
    quantity: 1,
    price: 299.90,
    status: "completed",
    createdAt: new Date("2026-03-01T10:30:00Z"),
    couponId: null
  },
  {
    id: 2,
    userId: 3,
    productId: 2,
    total: 698.00,
    quantity: 2,
    price: 349.00,
    status: "pending",
    createdAt: new Date("2026-03-02T14:15:00Z"),
    couponId: null
  },
  {
    id: 3,
    userId: 3,
    productId: 4,
    total: 1899.00,
    quantity: 1,
    price: 1899.00,
    status: "completed",
    createdAt: getDate(10),
    couponId: null
  },
  {
    id: 4,
    userId: 3,
    productId: 5,
    total: 979.80,
    quantity: 2,
    price: 489.90,
    status: "cancelled",
    createdAt: new Date("2026-02-04T16:00:00Z"),
    couponId: null
  },
  {
    id: 5,
    userId: 3,
    productId: 10,
    total: 1798.00,
    quantity: 2,
    price: 899.00,
    status: "pending",
    createdAt: new Date("2026-01-05T11:20:00Z"),
    couponId: null
  },
  {
    id: 6,
    userId: 3,
    productId: 3,
    total: 449.99,
    quantity: 1,
    price: 449.99,
    status: "pending",
    createdAt: new Date("2026-01-06T13:40:00Z"),
    couponId: null
  },
  {
    id: 7,
    userId: 3,
    productId: 7,
    total: 259.80,
    quantity: 2,
    price: 129.90,
    status: "pending",
    createdAt: new Date("2026-01-07T09:10:00Z"),
    couponId: null
  },
  {
    id: 8,
    userId: 3,
    productId: 9,
    total: 379.99,
    quantity: 1,
    price: 379.99,
    status: "pending",
    createdAt: getDate(8),
    couponId: null
  },
  {
    id: 9,
    userId: 3,
    productId: 14,
    total: 1199.90,
    quantity: 1,
    price: 1199.90,
    status: "pending",
    createdAt: getDate(9),
    couponId: null
  },
  {
    id: 10,
    userId: 3,
    productId: 15,
    total: 598.00,
    quantity: 2,
    price: 299.00,
    status: "pending",
    createdAt: new Date("2026-02-10T19:05:00Z"),
    couponId: null
  },
  {
    id: 11,
    userId: 3,
    productId: 8,
    total: 6598.00,
    quantity: 2,
    price: 3299.00,
    status: "completed",
    createdAt: getDate(11),
    couponId: null
  },
  {
    id: 12,
    userId: 3,
    productId: 6,
    total: 2399.00,
    quantity: 1,
    price: 2399.00,
    status: "pending",
    createdAt: getDate(12),
    couponId: null
  },
  {
    id: 13,
    userId: 3,
    productId: 11,
    total: 499.80,
    quantity: 2,
    price: 249.90,
    status: "completed",
    createdAt: new Date("2026-03-13T11:30:00Z"),
    couponId: null
  },
  {
    id: 14,
    userId: 3,
    productId: 12,
    total: 499.00,
    quantity: 1,
    price: 499.00,
    status: "cancelled",
    createdAt: new Date("2026-04-14T18:20:00Z"),
    couponId: null
  },
  {
    id: 15,
    userId: 3,
    productId: 13,
    total: 7598.00,
    quantity: 2,
    price: 3799.00,
    status: "pending",
    createdAt: new Date("2026-03-15T09:00:00Z"),
    couponId: null
  },
  {
    id: 16,
    userId: 3,
    productId: 16,
    total: 2099.00,
    quantity: 1,
    price: 2099.00,
    status: "completed",
    createdAt: new Date("2026-02-16T14:10:00Z"),
    couponId: null
  },
  {
    id: 17,
    userId: 3,
    productId: 17,
    total: 2998.00,
    quantity: 2,
    price: 1499.00,
    status: "pending",
    createdAt:getDate(17),
    couponId: null
  },
  {
    id: 18,
    userId: 3,
    productId: 18,
    total: 998.00,
    quantity: 2,
    price: 499.00,
    status: "completed",
    createdAt:getDate(19),
    couponId: null
  },
  {
    id: 19,
    userId: 3,
    productId: 19,
    total: 859.80,
    quantity: 2,
    price: 429.90,
    status: "pending",
    createdAt: getDate(21),
    couponId: null
  },
  {
    id: 20,
    userId: 3,
    productId: 2,
    total: 558.00,
    quantity: 2,
    price: 279.00,
    status: "completed",
    createdAt: getDate(21),
    couponId: null
  }
];