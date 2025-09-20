import type { BaseCoupon } from "@/types/coupons.types"
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
        if(!response.ok)throw new Error();
        const {datas} = await response.json()

        return {datas,message:'Success',status:response.status}
        
    }catch(err:unknown){
        return {status:500,message:'Algo deu errado',datas:[] as BaseCoupon<number>[]}
    }


}