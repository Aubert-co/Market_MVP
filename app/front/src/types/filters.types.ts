import type { categories } from "@/constants"
import type { OrderStatus } from "./storeDashboard.types"

export type OrderBy = 'asc' | 'desc' 

export type Category = typeof categories[number]
export type CategoryOption = Category | "Todas"

export type Filter = {
    orderBy:OrderBy,
    minPrice:number,
    maxPrice:number,
    category:CategoryOption
}

export type DatasSelect<T extends string | number> = {
    value: T;
    text: string;
};

export type ProductSortOption =
  | "price_asc"
  | "price_desc"
  | "stock_asc"
  | "stock_desc";

export type SelectOrderStatus = {
  text:string,
  value:OrderStatus
}

export type FilterCoupons =
  | "active"
  | "expired"
  | "all";