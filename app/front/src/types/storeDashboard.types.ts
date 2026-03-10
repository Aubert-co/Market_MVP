import type { IconType } from "react-icons"
import type { BaseCoupon } from "./coupons.types"
import type { Product } from "./products.types"
import type { Category, ProductSortOption } from "./filters.types"

export type SideBarItem = {
  label: string
  icon: React.ReactNode
  onClick?: () => void,
  isActive:boolean,
  linkTo:string
}


export type OrderStatus = "cancelled" | "pending" | "completed"
export type Order = {
    id:number,
    user:string,
    product:Omit<Product , "category" |"stock"|"description"|"price">,
    productId:number,
    total:number,
    quantity:number,
    status:OrderStatus,
    createdAt:number,
    coupon?:Omit < BaseCoupon<number>,"quantity" | "id" |"expiresAt" | "quantity">,
    price:number
}


export type GetStoreProducts = {
  name?:string,
  category?:Category,
  nextPage?:number,
  orderby?:ProductSortOption
}

export type GetStoreOrders ={
  status:OrderStatus,
  nextPage?:number | string,
  search:any
}
export type GetStoreCoupons = {
  nextPage?:number | string
}

export type ProductOrder = {
  product:{
    name:string,
    price:number,
    imageUrl:string
  },
  total:number,
  quantity:number,
  user:{
    name:string
  }
}

export type GetStoreDashboard = {
  orders:{
    completed:number,
    pending:number,
    cancelled:number,
    lastPending:ProductOrder[]
  },
  views:{
    total:number
  }
}


export type UpsertProducts = {
  name:string,
  description:string,
  price:string,
  stock:string,
  category:string,
  image:string,
  id:number,

}

export type OpenSideBarOuDrawer = "sidebar" | "drawer" | null


export type TopVisitedProduct = {
    name:string,
    imageUrl:string,
    growth:number,
    currentMonthViews:number,
    lastMonthViews:number,
    id:number
}

export type LastOrders = {
  name:string,
  id:number,
  status:OrderStatus,
  imageUrl:string,
  views:string
}


export type StatKey =
  | "views"
  | "revenue"
  | "orders"
  | "products"
  | "coupons"
  | "conversion";

export type Stat = {
  id: number;
  label: string;
  value: string;
  icon:IconType
  dataKey:StatKey
};
export type BackendStats = {
  views:number,
  revenue:number,
  orders:number,
  products:number,
  coupons:number,
  conversion:number
}