import type { Product } from "@/types/products.types"
import type { PageInfo } from "@/types/pagination.types"


export const products: Product[] = [
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
  },
  {
    id: 5,
    name: "Gaming Mouse RGB Pro",
    price: 149.90,
    imageUrl: "https://example.com/images/gaming-mouse.jpg",
    category: "Accessories",
    stock: 50,
    description: "High-precision gaming mouse with customizable RGB lighting and 8 programmable buttons."
  },
  {
    id: 6,
    name: "Mechanical Keyboard MX Blue",
    price: 329.99,
    imageUrl: "https://example.com/images/keyboard.jpg",
    category: "Accessories",
    stock: 30,
    description: "Tactile mechanical keyboard with MX Blue switches, backlight, and metal body."
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 199.00,
    imageUrl: "https://example.com/images/speaker.jpg",
    category: "Audio",
    stock: 60,
    description: "Compact and powerful speaker with 12-hour battery and water resistance."
  },
  {
    id: 8,
    name: "Stainless Steel Water Bottle",
    price: 89.90,
    imageUrl: "https://example.com/images/water-bottle.jpg",
    category: "Lifestyle",
    stock: 100,
    description: "750ml insulated water bottle that keeps your drinks cold for 24h or hot for 12h."
  },
  {
    id: 9,
    name: "Noise-Isolating In-Ear Earphones",
    price: 79.99,
    imageUrl: "https://example.com/images/earphones.jpg",
    category: "Audio",
    stock: 75,
    description: "Compact earphones with powerful sound and three sizes of silicone tips."
  },
  {
    id: 10,
    name: "Smart Home LED Light Bulb",
    price: 59.90,
    imageUrl: "https://example.com/images/smart-bulb.jpg",
    category: "Home",
    stock: 80,
    description: "App-controlled color-changing LED bulb with voice assistant support and scheduling."
  }
];
/*
const selectedProduct: SelectedProduct = {
  product: [
    {
      id: 1,
      name: "Wireless Gaming Mouse",
      price: 249.99,
      imageUrl: "https://example.com/images/mouse.jpg",
      category: "Peripherals",
      stock: 35,
      description: "Ergonomic wireless gaming mouse with RGB lighting and 16000 DPI sensor."
    }
  ],
  ratings: {
    _avg: {
      rating: 4.6
    },
    _count: {
      rating: 28
    }
  },
  comments: [
    {
      content: "Excellent product, very responsive and fits perfectly in hand.",
      name: "Alice"
    },
    {
      content: "Battery lasts long and the DPI control is a game changer!",
      name: "Lucas"
    },
    {
      content: "Good value for the price. Works great with my setup.",
      name: "Maya"
    },
    {
      content: "Shipping was fast, and the product is exactly as described.",
      name: "Daniel"
    }
  ],
  reviews:[{
    rating:3
  },
  {rating:4},
  {rating:5},
  {rating:4.5},
  {rating:3.3}
  ]
}
*/

type FetchProducts = {
  setProducts:(params:{datas:Product[],status:number})=>void;
  setPages:(params:PageInfo)=>void;
  service:(pages:number)=>Promise<{datas:Product[],status:number,currentPage:number,totalPages:number}>,
  pages:number,
}
export const fetchProducts = async({setPages,setProducts,service,pages}:FetchProducts)=>{
  try{
    const {datas,status,currentPage,totalPages} = await service(pages)
    setProducts({datas,status})
    setPages({currentPage,totalPages})
  }catch(err){
    setProducts({datas:[] as Product[],status:500})
    setPages({currentPage:0,totalPages:0})
  }
}
/*
type FetchProduct = {
  setProducts:(params:{datas:SelectedProduct,status:number})=>void,
  //service:(productId:number)=>Promise<{datas:SelectedProduct,status:number}>
}
export const fetchProduct = async({setProducts}:FetchProduct)=>{
  try{
      setProducts({datas:selectedProduct,status:200})
  }catch(err){
      //setProducts({datas:[] ,status:500})
  }
}*/