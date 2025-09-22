export type UserCart = {
    id:number,
    productId:number,
    isDeleted?:boolean,
    updatedAt?:Date,
    quantity:number,
    product:{
        price:number,
        stock:number,
        imageUrl:string,
        name:string
    }
}