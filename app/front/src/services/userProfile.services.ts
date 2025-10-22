import type { BaseCoupon } from "@/types/coupons.types"
import type { UserOrders } from "@/types/orders.types"
import type { ResponseDatas } from "@/types/services.types"





export const userCoupons = async():Promise<ResponseDatas<BaseCoupon<number>[]>>=>{
  
    try{
      const response = await fetch('/user/list/coupons',{
        method:'GET',
        credentials:'include',
        headers: {
        'Content-Type': 'application/json'
        }
      })
      
      const {datas} = await response.json()
      
      return {datas,message:'Success',status:response.status}
        
    }catch(err:unknown){
        return {status:500,message:'Algo deu errado',datas:[] as BaseCoupon<number>[]}
    }
}

export const userOrders = async():Promise<ResponseDatas<UserOrders[]>>=>{
  try{
    const response = await fetch('/orders/me',{
      method:'GET',
      credentials:'include',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const {datas} = await response.json()
    
    return {datas,message:'Success',status:200}
    
  }catch(err:unknown){
      return {status:500,message:'Algo deu errado',datas:[]}
  }
}