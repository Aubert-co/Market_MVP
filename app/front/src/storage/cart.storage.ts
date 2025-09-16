import { CART_KEY } from "@/constants"
import type { UserCart } from "@/types/cart.types"



type StorageCart = {
    cart:UserCart[],
    updatedAt:number,
    isSaved?:boolean
}


export const getItemsFromCart = ():StorageCart =>{
    const values =  localStorage.getItem(CART_KEY)
    if(values){
        const parsed = JSON.parse( values) as StorageCart
        return {...parsed}
    }
    return {cart:[],updatedAt:0,isSaved:false}
}

export const saveCart =({cart,updatedAt,isSaved}:StorageCart)=>{
    const items = {cart,updatedAt,isSaved}
    localStorage.setItem(CART_KEY,JSON.stringify( items ))
}

export const updateItemCart = (id:number,quantity:number)=>{
    const items = getItemsFromCart()
    if(items.cart.length === 0)return 

    const cart = items.cart.map((val)=>{
        if(val.id === id){
            return {...val,quantity}
        }
        return val
    })
    saveCart({cart,updatedAt:Date.now(),isSaved:false})
}
export const removeItemFromCart = (values:Array<number>)=>{
    const items = getItemsFromCart()
    if(items.cart.length ===0)return;
    
    if(items.cart.length === values.length){
        saveCart({cart:[],updatedAt:Date.now(),isSaved:false})
        return
    }
    const cart = items.cart.map((val)=>{
        if(values.includes(val.id)){
            return ;
        }
        return val
    }).filter((val)=>val!=undefined) as UserCart[]
        
    saveCart({cart,updatedAt:Date.now(),isSaved:false})
}