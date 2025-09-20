import { FIVE_MINUTES } from "@/constants"
import { syncCart } from "@/services/cart.services"
import { getItemsFromCart } from "@/storage/cart.storage"
import { useEffect } from "react"



export const useSyncCart = ()=>{
    
    useEffect(()=>{
        const { cart, isSaved, updatedAt } = getItemsFromCart()
        
        if(cart.length ===0)return;
        const isExpired = !updatedAt || Date.now() - updatedAt > FIVE_MINUTES

        if (!isSaved && isExpired ) {
           syncCart({cart})
        }
    },[])
}
