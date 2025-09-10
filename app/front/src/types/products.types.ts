export type Product ={
    name:string,
    price:number,
    id:number,
    imageUrl:string,
    category:string,
    stock:number,
    description:string
}

export type ProductView = Omit<Product,|"description">& {
    views:number
}