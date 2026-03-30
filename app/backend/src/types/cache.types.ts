export type CacheStoreId = {
    userId:number,
    storeId:number
}

export type SaveItemsCacheDTO<T> ={
    key:string,
    data:T,
    expirationTime:number
}