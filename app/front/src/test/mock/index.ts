import type { BaseCoupon } from "@/types/coupons.types";
import type { UserCart } from "@/types/cart.types";
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

export const userCartMocks: UserCart[] = [
  {
    id:1,
    productId: 1,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 2,
    storeId: 101,
    price: 49.99,
    stock: 10,
    name: "Fone Bluetooth"
  },
  {
    id:2,
    productId: 2,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 1,
    storeId: 102,
    price: 89.9,
    stock: 5,
    name: "Mouse Gamer RGB"
  },
  {
   id:3,
    productId: 3,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 3,
    storeId: 103,
    price: 199.99,
    stock: 8,
    name: "Teclado Mecânico"
  },
  {
    id:4,
    productId: 4,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 1,
    storeId: 104,
    price: 599.0,
    stock: 2,
    name: "Monitor 24'' Full HD"
  },
  {
    id:5,
    productId: 5,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 4,
    storeId: 105,
    price: 29.5,
    stock: 20,
    name: "Cabo HDMI 2m"
  }
];