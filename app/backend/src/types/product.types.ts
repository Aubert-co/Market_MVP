import { Prisma } from "@prisma/client";

export type Product  = Prisma.ProductGetPayload<{}>
export type Products = {
  category:string,
  name:string,
  description:string,
  storeId:number,
  price:number,
  stock:number,
}
export type SelectedProduct = Prisma.ProductGetPayload<{
  select: {
    id: true
    name: true
    imageUrl: true
    price: true
  },
   averageRating: number | null
}>

export type ProductWithCountsAndRatings = Prisma.ProductGetPayload<{
  include: {
    _count: {
      select: {
        views: true,
        comments: true,
        reviews: true,
      }
    },
    reviews: {
      select: {
        rating: true
      }
    }
  }
}>
export type ProductWithPriceAndStock = Prisma.ProductGetPayload<{
  select:{
    price:true,stock:true
  }
}>