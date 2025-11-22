import type { CategoryMapped ,DatasSelect} from "@/types/filters";

export const categories = [
  "Roupas",
  "Eletrônicos",
  "Livros",
  "Brinquedos",
  "Beleza",
  "Esporte",
  "Automotivo",
  "Cozinha",
  "Celulares",
  "Informática",
  "Jardim",
  "Petshop",
  "Mercearia",
  "Moda",
  "Acessórios"
];


export const mappedCateogires = ['Todas',...categories].map((val)=>{
  return { text:val,value:val}
}) as DatasSelect<CategoryMapped>[]

export const CART_KEY = "cart-item"
export const FIVE_MINUTES = 5 * 60 * 1000;
export const KEY_STORE = "store-key"
export const CHECKOUT_KEY = "checkout-key"