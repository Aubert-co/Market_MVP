export type Comment ={
    id:number,
    userId:number,
    productId:number,
    orderId:number,
    content:string,
    createdAt:string
}

export type Review = {
    id:number,
    userId:number,
    productId:number,
    orderId:number,
    rating:number,
    createdAt:number
}