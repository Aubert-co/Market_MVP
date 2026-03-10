import { getStorageStore } from "@/storage/store.storage"
import type { BaseCoupon } from "@/types/coupons.types"
import type { FilterCoupons } from "@/types/filters.types"
import type { Response, ResponseWithPages } from "@/types/services.types"


type StoreCoupon = BaseCoupon<number>[]

export type StoreCoupons = {
    couponStatus:FilterCoupons,
    nextPage:number
}
export const getStoreCoupons = async({couponStatus,nextPage}:StoreCoupons):Promise<ResponseWithPages<StoreCoupon>>=>{
    
    try{
        const status = couponStatus
        const store = getStorageStore()
        const response = await fetch(`/store/coupons/${store.id}`,{
            credentials:'include',
            method:'POST',
            body:JSON.stringify({status,nextPage})
        })
        const {datas,message,currentPage,totalPages} = await response.json()
        if(!response.ok){
            return {datas:[],status:response.status,message,currentPage:1,totalPages:1}
        }
        return {datas,status:response.status,message,currentPage,totalPages}
   }catch(err:any){
        return {datas:[],status:500,message:'Algo deu errado!',currentPage:1,totalPages:1}
   }
}

export const createCoupon = async({code,expiresAt,
    discount,discountType,quantity}:Omit<BaseCoupon<string>,'id'>):Promise<Response>=>{
    try{
        const store = getStorageStore()
        const response = await fetch('/store/create/coupon',{
            method:'POST',
            credentials:'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({code,expiresAt,discount,discountType,quantity,storeId:store.id})
        })
        
        const datas = await response.json()

        return {status:response.status,message:datas.message}

    }catch(err:unknown){
        return {status:500,message:"Algo deu errado!"}
    }
}