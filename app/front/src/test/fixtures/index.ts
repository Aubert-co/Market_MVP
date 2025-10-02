import type { BaseCoupon } from "@/types/coupons.types";
import type { UserCart } from "@/types/cart.types";
import type { ProductOrder } from "@/types/storeDashboard.types";
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
    product:{
      imageUrl: "https://via.placeholder.com/150",
      stock: 10,
      name: "Fone Bluetooth",
      price: 49.99,
    },
    quantity: 2,
  },
  {
    id:2,
    productId: 2,
    product:{
      imageUrl: "https://via.placeholder.com/150",
      name: "Mouse Gamer RGB",
      price: 89.9,
      stock: 5,
    },
    quantity: 1,
  },
  {
   id:3,
    productId: 3,
    product:{
      imageUrl: "https://via.placeholder.com/150",
      name: "Teclado Mecânico",
      stock: 8,
      price: 199.99,
    },
    quantity: 3,
  
  },
  {
    id:4,
    productId: 4,
    quantity: 1,
    product:{
      imageUrl: "https://via.placeholder.com/150",
      price: 599.0,
      stock: 2,
      name: "Monitor 24'' Full HD"
    }
  
  },
  {
    id:5,
    productId: 5,
    product:{
      imageUrl: "https://via.placeholder.com/150",
      price: 29.5,
      stock: 20,
      name: "Cabo HDMI 2m"
    },
    quantity: 4,
   
  
  }
];

export const productOrdersMock:ProductOrder[] = [
  {
    product: {
      name: "Camiseta Básica",
      price: 59.9,
      imageUrl: "https://example.com/camiseta.jpg",
    },
    total: 119.8,
    quantity: 2,
    user: {
      name: 'true',
    },
  },
  {
    product: {
      name: "Tênis Esportivo",
      price: 249.9,
      imageUrl: "https://example.com/tenis.jpg",
    },
    total: 249.9,
    quantity: 1,
    user: {
      name: 'jose',
    },
  },
  {
    product: {
      name: "Notebook Gamer",
      price: 4999.99,
      imageUrl: "https://example.com/notebook.jpg",
    },
    total: 4999.99,
    quantity: 1,
    user: {
      name: 'maria',
    },
  },
  {
    product: {
      name: "Fone de Ouvido Bluetooth",
      price: 199.9,
      imageUrl: "https://example.com/fone.jpg",
    },
    total: 399.8,
    quantity: 2,
    user: {
      name: 'estevao',
    },
  },
  {
    product: {
      name: "Smartwatch",
      price: 899.9,
      imageUrl: "https://example.com/smartwatch.jpg",
    },
    total: 899.9,
    quantity: 1,
    user: {
      name: 'suellen',
    },
  },
];
