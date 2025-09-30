import type { BaseCoupon } from "./coupons.types"
import type { Product } from "./products.types"

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
    coupon?:Omit < BaseCoupon<number>,"quantity" | "id">,
    price:number
}


export type GetStoreProducts = {
  name?:string,
  category?:string,
  nextPage?:number
}

export type GetStoreOrders ={
  status:OrderStatus,
  nextPage?:number | string,

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