import type { CategoryOption ,DatasSelect, ProductSortOption, SelectOrderStatus} from "@/types/filters.types";


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

export const allCategoriesOption = ['Todas',...categories] satisfies CategoryOption[]

export const categorySelectOptions = allCategoriesOption.map((val)=>{
  return { text:val,value:val}
}) as DatasSelect<CategoryOption>[]

export const CART_KEY = "cart-item"
export const FIVE_MINUTES = 5 * 60 * 1000;
export const KEY_STORE = "store-key"
export const CHECKOUT_KEY = "checkout-key"

export const PRODUCT_SORT_ARRAY = [
  "price_asc","price_desc","stock_asc","stock_desc"
] satisfies ProductSortOption[];

export const PRODUCT_SORT_OPTIONS: DatasSelect<ProductSortOption>[] = [
  { value: "price_asc", text: "Menor preço" },
  { value: "price_desc", text: "Maior preço" },
  { value: "stock_asc", text: "Menor estoque" },
  { value: "stock_desc", text: "Maior estoque" },
];

export const ORDER_STATUS_OPTIONS:SelectOrderStatus[] = [
  {text:'completo',value:'completed'},
  {text:'pendente',value:'pending'},
  {text:'cancelado',value:'cancelled'}
] 