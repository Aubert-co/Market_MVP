import { Products } from "@/modules/products/types/product.types";
import { Prisma } from "@prisma/client";

export type GetStoreProductsDTO = {
    storeId:number,
    category?:string,
    orderBy:"asc" | "desc",
    search?:string,
    take:number,
    skip:number
}
export type StoreProductsResults ={
    datas:StoreProducts[],
    pageInfo:{
        totalItems:number
    }
}
export type StoreProducts = Prisma.ProductGetPayload<{
    select:{
        name:true,description:true,category:true,stock:true,
        price:true
    }
}>
export type productMostViewedResult = Prisma.ProductGetPayload<{
    include:{
        _count:{
            select:{
                views:true
            }
        }
    },
    omit:{
                description:true,stock:true,
                isActive:true,storeId:true,createdAt:true,
                updatedAt:true,price:true
            }
}>


export type CreateProductDTO = Products & {
    mimeType:string,
    fileBuffer:Buffer,
    originalName:string
}
export type GetStoreProductsPage = Omit<GetStoreProductsDTO,"skip"> &{
    page:number,

}
export type GetStoreProductResult = {
    datas:StoreProducts[],
    pagination:{
        totalPages:number,
        currentPage:number,
        skip:number
  }
}
