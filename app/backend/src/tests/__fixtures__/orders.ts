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

export const orders:Orders[] = [
  {
    id: 1,
    userId: 4,
    productId: 1, 
    total: 299.90,
    quantity: 1,
    price: 299.90,
    status: "completed",
    createdAt: new Date("2025-09-01T10:30:00Z"),
    couponId: null
  },
  {
    id: 2,
    userId: 4,
    productId: 2,
    total: 698.00,
    quantity: 2,
    price: 349.00,
    status: "pending",
    createdAt: new Date("2025-09-05T14:15:00Z"),
    couponId: null
  },
  {
    id: 3,
    userId: 4,
    productId: 4, 
    total: 1899.00,
    quantity: 1,
    price: 1899.00,
    status: "completed",
    createdAt: new Date("2025-09-10T09:45:00Z"),
    couponId: null
  },
  {
    id: 4,
    userId: 4,
    productId: 5, 
    total: 979.80,
    quantity: 2,
    price: 489.90,
    status: "cancelled",
    createdAt: new Date("2025-09-12T16:00:00Z"),
    couponId: null
  },
  {
    id: 5,
    userId: 4,
    productId: 10, 
    total: 1798.00,
    quantity: 2,
    price: 899.00,
    status: "pending",
    createdAt: new Date("2025-09-20T11:20:00Z"),
    couponId: null
  },
  {
  id: 6,
  userId: 4,
  productId: 3, 
  total: 449.99,
  quantity: 1,
  price: 449.99,
  status: "pending",
  createdAt: new Date("2025-09-22T13:40:00Z"),
  couponId: null
},
{
  id: 7,
  userId: 4,
  productId: 7, 
  total: 259.80,
  quantity: 2,
  price: 129.90,
  status: "pending",
  createdAt: new Date("2025-09-23T09:10:00Z"),
  couponId: null
},
{
  id: 8,
  userId: 4,
  productId: 9, 
  total: 379.99,
  quantity: 1,
  price: 379.99,
  status: "pending",
  createdAt: new Date("2025-09-24T17:25:00Z"),
  couponId: null
},
{
  id: 9,
  userId: 4,
  productId: 14, 
  total: 1199.90,
  quantity: 1,
  price: 1199.90,
  status: "pending",
  createdAt: new Date("2025-09-25T12:50:00Z"),
  couponId: null
},
{
  id: 10,
  userId: 4,
  productId: 15, 
  total: 598.00,
  quantity: 2,
  price: 299.00,
  status: "pending",
  createdAt: new Date("2025-09-26T19:05:00Z"),
  couponId: null
},
{
    id: 11,
    userId: 4,
    productId: 8,
    total: 6598.00,
    quantity: 2,
    price: 3299.00,
    status: "completed",
    createdAt: new Date("2025-09-27T10:10:00Z"),
    couponId: null
  },
  {
    id: 12,
    userId: 4,
    productId: 6,
    total: 2399.00,
    quantity: 1,
    price: 2399.00,
    status: "pending",
    createdAt: new Date("2025-09-28T15:45:00Z"),
    couponId: null
  },
  {
    id: 13,
    userId: 4,
    productId: 11,
    total: 499.80,
    quantity: 2,
    price: 249.90,
    status: "completed",
    createdAt: new Date("2025-09-29T11:30:00Z"),
    couponId: null
  },
  {
    id: 14,
    userId: 4,
    productId: 12,
    total: 499.00,
    quantity: 1,
    price: 499.00,
    status: "cancelled",
    createdAt: new Date("2025-09-30T18:20:00Z"),
    couponId: null
  },
  {
    id: 15,
    userId: 4,
    productId: 13,
    total: 7598.00,
    quantity: 2,
    price: 3799.00,
    status: "pending",
    createdAt: new Date("2025-10-01T09:00:00Z"),
    couponId: null
  },
  {
    id: 16,
    userId: 4,
    productId: 16,
    total: 2099.00,
    quantity: 1,
    price: 2099.00,
    status: "completed",
    createdAt: new Date("2025-10-02T14:10:00Z"),
    couponId: null
  },
  {
    id: 17,
    userId: 4,
    productId: 17,
    total: 2998.00,
    quantity: 2,
    price: 1499.00,
    status: "pending",
    createdAt: new Date("2025-10-03T16:35:00Z"),
    couponId: null
  },
  {
    id: 18,
    userId: 4,
    productId: 18,
    total: 998.00,
    quantity: 2,
    price: 499.00,
    status: "completed",
    createdAt: new Date("2025-10-04T12:25:00Z"),
    couponId: null
  },
  {
    id: 19,
    userId: 4,
    productId: 19,
    total: 859.80,
    quantity: 2,
    price: 429.90,
    status: "pending",
    createdAt: new Date("2025-10-05T17:50:00Z"),
    couponId: null
  },
  {
    id: 20,
    userId: 4,
    productId: 20,
    total: 558.00,
    quantity: 2,
    price: 279.00,
    status: "completed",
    createdAt: new Date("2025-10-06T13:15:00Z"),
    couponId: null
  }
];
