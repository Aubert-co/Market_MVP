export type UserCart = {
    id:number,
    productId:number,
    imageUrl:string,
    quantity:number,
    storeId:number,
    price:number,
    stock:number,
    name:string,
    isDeleted?:boolean,
    updatedAt?:Date
}