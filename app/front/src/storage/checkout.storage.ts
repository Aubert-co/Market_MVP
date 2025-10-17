import { CHECKOUT_KEY } from "@/constants";
import type { ItemsCheckout } from "@/types/checkout.types";


export const setItemsCheckout = (values:ItemsCheckout[]):void=>{
    const items = JSON.stringify( values )
    localStorage.setItem(CHECKOUT_KEY,items)
}

export const getItemsCheckout = ():ItemsCheckout[]=>{
    const getValues = localStorage.getItem(CHECKOUT_KEY)
    if(!getValues)return []
    const items = JSON.parse( getValues )

    return items
}

export const removeItemCheckout = (id:number):void =>{
    const getValues = getItemsCheckout()
    if(getValues.length === 0)return
    
    const newItems = getValues.map((val)=>{
        if(val.id === id)return;
        return val
    }).filter((val)=>val!==undefined)

    setItemsCheckout( newItems )
}
export const updateItemCheckout = (id:number,quantity:number)=>{
    const getValues = getItemsCheckout()
    if(getValues.length ===0)return 0 

    const updateQuantity = getValues.map((val)=>{
        if(val.id === id){
            return {...val,quantity}
        }
        return val
    })
    setItemsCheckout( updateQuantity )
}