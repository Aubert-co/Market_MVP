import type { Response } from "@/types/services.types"

export type CreateOrder = {
    productId:number,
    couponId?:number,
    quantity:number
}
export const serviceCreateOrder = async(order:CreateOrder[]):Promise<Response>=>{
    try{
        const response = await fetch('/order/create',{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({order}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const {message} = await response.json()
        return {status:response.status,message}
    }catch(err:unknown){
        return {message:'Algo deu errado!',status:500}
    }
}