import type { Product } from "./products.types"

export type Comments = {
    content:string,
    name:string,
  
}
export type Rating = {
    _avg:{
        rating?:number
    },
    _count:{
        rating:number
    }
    
}
export type Reviews = {
    rating:number
}
export type ProductDetails = {
    product:Product[],
    ratings:Rating,
    comments:Comments[],
    reviews:Reviews[]
    
}