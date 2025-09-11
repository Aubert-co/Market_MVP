import type { Product } from "@/types/products.types";
import type {  useFetchWithPages ,UsableFetch} from "@/types/services.types";


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
export const usableFetch = async<T,B>({setDatas,service,body}:UsableFetch<T,B>)=>{
  try{
      const {datas,message,status} = await service(body)

      setDatas({datas,message,status})
  }catch(err:unknown){
    setDatas({datas:[] as T,message:'Algo deu errado!',status:500})
  }
}

export const usableFetchWithPages = async <T,B>(
  { setDatas, service, setPages, body }: useFetchWithPages<T,B>
) => {
  try {
    const { datas, status, message, currentPage, totalPages } =
      await service(body);

    setDatas({ datas, status, message });
    setPages({ currentPage, totalPages });
  } catch (err: any) {
    setDatas({ datas: [] as T, status: 500, message: "Algo deu errado!" });
    setPages({ currentPage: 1, totalPages: 1 });
  }
};
