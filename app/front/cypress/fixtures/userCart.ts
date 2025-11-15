export const userCartMocks = [
   {
    id: 1,
    productId: 10,
    quantity: 2,
    product: {
      price: 49.9,
      stock: 20,
      imageUrl: "/img/product-10.png",
      name: "Camiseta Premium"
    }
  },

  {
    id: 2,
    productId: 22,
    quantity: 1,
    product: {
      price: 199.0,
      stock: 8,
      imageUrl: "/img/product-22.png",
      name: "Headset Gamer"
    }
  },

  {
    id: 3,
    productId: 5,
    isDeleted: true,
    updatedAt: new Date(),
    quantity: 1,
    product: {
      price: 15.5,
      stock: 100,
      imageUrl: "/img/product-5.png",
      name: "Cabo USB-C"
    }
  },

  {
    id: 4,
    productId: 31,
    quantity: 3,
    updatedAt: new Date(),
    product: {
      price: 12.0,
      stock: 12,
      imageUrl: "/img/product-31.png",
      name: "Caneta FinePen"
    }
  }
];