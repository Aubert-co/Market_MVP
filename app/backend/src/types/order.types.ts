import { Prisma } from "@prisma/client";

export type Order = Prisma.OrderGetPayload<{}>
export const StatusOrder = {
  Pending: "pending",
  Completed: "completed",
  Cancelled: "cancelled",
} as const;

export type StatusOrder = typeof StatusOrder[keyof typeof StatusOrder];


export type CreateOrderDto = {
    productId:number,
    quantity:number,
    price:number,
    userId:number,
    couponId:number | null,
    total:number  
}

export type OrderProductInput = {
  productId: number;
  quantity: number;
  couponId?: number;
};
export type DatasCreateOrderDto = {
    items:OrderProductInput[],
    userId:number,
}