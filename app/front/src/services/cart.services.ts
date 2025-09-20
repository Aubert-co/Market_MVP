import { getItemsFromCart, saveCart } from "@/storage/cart.storage"
import type { UserCart } from "@/types/cart.types"
import type {  Response, ResponseDatas } from "@/types/services.types";


export type BodySyncCart = {
  cart:UserCart[]
}
export const syncCart = async({cart}:BodySyncCart):Promise<ResponseDatas<UserCart[]>>=>{
  try{
    const response = await fetch('/user/cart/update',{
      method:'PUT',
      credentials:'include',
      body:JSON.stringify({cart}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok)throw new Error()
      
    if(response.status === 201){
      saveCart({cart,updatedAt:Date.now(),isSaved:true})
    }
    return {datas:[],status:response.status,message:''}
  }catch(err:unknown){
    return {status:500,message:'Algo deu errado',datas:[]}
  }
}
export const  getUserCart = async():Promise<ResponseDatas<UserCart[]>>=>{
    const savedCart = getItemsFromCart()
    if( savedCart.cart.length >0){
      return {
        datas:savedCart.cart,status:200,message:'sucess'
      }
    }
    
    try{
     
      const response = await fetch('/user/cart',{
        method:'GET',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok)throw new Error();
      const {datas} = await response.json()
      
      if(Array.isArray( datas) && datas.length >0){
        saveCart( { cart: datas as UserCart[],updatedAt:Date.now()})
      }
      return {datas:datas as UserCart[],status:response.status,message:'success'}
    }catch(err:any){
      return {datas:[],status:500,message:'Algo deu errado!'}
    }
  
}

export const deleteFromCart = async(cart:Array<number> ):Promise<Response>=>{
  try{
    const response = await fetch('/user/cart/remove',{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:'include',
      body:JSON.stringify({cart})
    })
    if(!response.ok)throw new Error()
    const {message} =await response.json()
    return {message,status:response.status}
  }catch(err:unknown){
    return {status:500,message:'Algo deu errado!'}
  }
}

export const addToCart = async(id:number):Promise<Response>=>{
   try{
    const response = await fetch('/user/cart/add',{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:'include',
      body:JSON.stringify({cart:[id]})
    })
    if(!response.ok)throw new Error()
    const {message} =await response.json()
   
    return {message,status:response.status}
  }catch(err:unknown){
    return {status:500,message:'Algo deu errado!'}
  }
}