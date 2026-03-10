import type { BaseCoupon } from "@/types/coupons.types";
import type { Order, TopVisitedProduct } from "@/types/storeDashboard.types";

export const FixtureVisitedProducs:TopVisitedProduct[] = [{
    id: 1,
    name: "Camiseta Oversized Preta",
    imageUrl: "https://via.placeholder.com/150",
    growth: 12.5,
    currentMonthViews: 1250,
    lastMonthViews: 1111,
  },
  {
    id: 2,
    name: "Tênis Esportivo Branco",
    imageUrl: "https://via.placeholder.com/150",
    growth: -5.2,
    currentMonthViews: 980,
    lastMonthViews: 1034,
  },
  {
    id: 3,
    name: "Relógio Digital Premium",
    imageUrl: "https://via.placeholder.com/150",
    growth: 28.9,
    currentMonthViews: 2140,
    lastMonthViews: 1660,
  }
]
export const FixtureOrders: Order[] = [
  {
    id: 101,
    user: "João Silva",
    productId: 1,
    product: {
      id: 1,
      name: "Camiseta Oversized Preta",
      imageUrl: "https://via.placeholder.com/120",
    },
    quantity: 2,
    price: 89.9,
    total: 179.8,
    status: "completed",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    coupon: {
      code: "DESCONTO10",
      discount: 10,
      discountType: "percent",
    },
  },
  {
    id: 102,
    user: "Maria Oliveira",
    productId: 2,
    product: {
      id: 2,
      name: "Tênis Esportivo Branco",
      imageUrl: "https://via.placeholder.com/120",
    },
    quantity: 1,
    price: 299.9,
    total: 299.9,
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 60 * 5
  },
  {
    id: 103,
    user: "Carlos Souza",
    productId: 3,
    product: {
      id: 3,
      name: "Relógio Digital Premium",
      imageUrl: "https://via.placeholder.com/120",
    },
    quantity: 3,
    price: 199.9,
    total: 599.7,
    status: "cancelled",
    createdAt: Date.now() - 1000 * 60 * 30,
    coupon: {
      code: "FRETEGRATIS",
      discount: 0,
      discountType: "percent",
    },
  },
]


export const FixtureStoreProducts  = [
  {
    id: 1,
    name: "Camiseta Oversized Preta",
    price: 129.9,
    imageUrl: "/images/camiseta-preta.jpg",
    category: "Roupas",
    stock: 25,
    description: "Camiseta oversized em algodão premium, confortável e estilosa."
  },
  {
    id: 2,
    name: "Tênis Casual Branco",
    price: 299.9,
    imageUrl: "/images/tenis-branco.jpg",
    category: "Calçados",
    stock: 12,
    description: "Tênis casual versátil, ideal para o dia a dia."
  },
  {
    id: 3,
    name: "Relógio Minimalista",
    price: 459.0,
    imageUrl: "/images/relogio.jpg",
    category: "Acessórios",
    stock: 8,
    description: "Relógio com design minimalista e pulseira em couro."
  }
]

export const couponsFixture: BaseCoupon<number>[] = [
  {
    id: 1,
    expiresAt: 1735689600000,
    code: "WELCOME10",
    quantity: 100,
    discount: 10,
    discountType: "percent",
  },
  {
    id: 2,
    expiresAt: 1738291200000,
    code: "SAVE20",
    quantity: 50,
    discount: 20,
    discountType: "percent",
  },
  {
    id: 3,
    expiresAt: 1733011200000,
    code: "FRETE5",
    quantity: 200,
    discount: 5,
    discountType: "fixed",
  },
];