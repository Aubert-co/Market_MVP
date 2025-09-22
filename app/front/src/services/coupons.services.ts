import type { BaseCoupon } from "@/types/coupons.types"
import type { Response, ResponseDatas } from "@/types/services.types"

type Coupom = BaseCoupon<number>[]

export const availableCoupons = async():Promise<ResponseDatas<Coupom>>=>{
    try{
        const response = await fetch("/coupon/available/1",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            return {datas:[],message:'',status:response.status}
        }
        const {datas,message}  = await response.json()
        return {datas ,message,status:response.status}
    }catch(err:unknown){
        return {datas:[] ,message:'Algo deu errado!',status:500}
    }
}
export const userAddCoupon = async(couponId:number):Promise<Response>=>{
    try{
        const response = await fetch('/user/add/coupon',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({couponId})
        })
        if(!response.ok){
            return {status:response.status,message:''}
        }
        const {message} = await response.json()
        return {message,status:response.status}
    }catch(err:unknown){
        return {message:'Algo deu errado!',status:500}
    }
}