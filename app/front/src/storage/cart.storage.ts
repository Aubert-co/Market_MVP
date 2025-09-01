import { CART_KEY ,FIVE_MINUTES} from "@/constants"
import type { UserCart } from "@/types/cart.types"




type StorageCart = {
    cart:UserCart[],
    updatedAt:number,
    isSaved?:boolean
}
type GetItems = {
    needsUpdate:boolean
}

export const getItemsFromCart = ():StorageCart&GetItems =>{
    const values =  localStorage.getItem(CART_KEY) 
    if(values){
        const parsed = JSON.parse( values) as StorageCart
        const updatedAt = new Date(parsed.updatedAt).getTime();
        const now = Date.now();
        const isOutDated =  now - updatedAt > FIVE_MINUTES
        
        if (isOutDated) {
            return {...parsed,needsUpdate:true}
        }
        return {...parsed,needsUpdate:false}
    }
    return {cart:[],updatedAt:0,needsUpdate:true,isSaved:false}
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
export const removeItemFromCart = (id:number)=>{
    const items = getItemsFromCart()
    if(items.cart.length ===0)return;
  
        const cart = items.cart.map((val)=>{
            if(val.id === id){
                return {...val,isDeleted:true}
            }
            return val
        })
        
    saveCart({cart,updatedAt:Date.now(),isSaved:false})
}