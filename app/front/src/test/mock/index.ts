import type { BaseCoupon } from "@/types/coupons.types";

export const mockCoupons: BaseCoupon<number>[] = [
  {
    id:1,
    code: "DESCONTO10",
    discount: 10,
    discountType: "percent",
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 dias a partir de agora
    quantity: 100
  },
  {
    id:54,
    code: "FRETEGRATIS",
    discount: 15,
    discountType: "fixed",
    expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 dias a partir de agora
    quantity: 50
  },
  {
    id:3,
    code: "BLACK50",
    discount: 50,
    discountType: "percent",
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 dias
    quantity: 200
  },
  {
    id:5,
    code: "WELCOME20",
    discount: 20,
    discountType: "fixed",
    expiresAt: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 dias
    quantity: 80
  },
  {
    id:77,
    code: "FLASH5",
    discount: 5,
    discountType: "percent",
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 dia
    quantity: 30
  }
]