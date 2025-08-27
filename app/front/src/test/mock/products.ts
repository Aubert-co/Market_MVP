import type { Product } from "../../types/products.types";

export  const mockProducts:Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 499.99,
    imageUrl: "https://example.com/images/headphones.jpg",
    category: "Electronics",
    stock: 25,
    description: "High-fidelity wireless headphones with active noise cancellation and 30-hour battery life."
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.90,
    imageUrl: "https://example.com/images/smartwatch.jpg",
    category: "Wearables",
    stock: 40,
    description: "Track your workouts, heart rate, and sleep with this sleek and water-resistant smart watch."
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 899.00,
    imageUrl: "https://example.com/images/office-chair.jpg",
    category: "Furniture",
    stock: 15,
    description: "Comfortable office chair with lumbar support, adjustable height, and breathable mesh."
  },
  {
    id: 4,
    name: "4K Ultra HD Smart TV 55\"",
    price: 2599.99,
    imageUrl: "https://example.com/images/smart-tv.jpg",
    category: "Electronics",
    stock: 10,
    description: "55-inch 4K smart TV with streaming apps, voice control, and HDR support."
  }
]
