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
    }
  }
}>
export type ProductWithPriceAndStock = Prisma.ProductGetPayload<{
  select:{
    price:true,stock:true
  }
}>

export type GetProductById = {
  product: Prisma.ProductGetPayload<{
    include: {
        reviews:{
            select:{
                rating:true
            }
        }
      comments: {
        select:{
           
            content:true,
            user:{
                select:{
                    name:true
                }
            }
        }
      }
    }
  }> | null,
  ratings: {
  _avg: { rating: number | null },
  _count: { rating: number }
}
 
}

export type FilterProductsInput = {
    name?:string,
    category?:string
    maxPrice?:number
    minPrice?:number,
    storeId?:number,
    take:number,
    skip:number
}
export type FilteredProduct = Prisma.ProductGetPayload<{}>;
