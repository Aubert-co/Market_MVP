import { syncCart } from "@/services/cart.services"
import { getItemsFromCart } from "@/storage/cart.storage"
import { useEffect } from "react"



export const useSyncCart = ()=>{
    
    useEffect(()=>{
        const { cart, isSaved, updatedAt } = getItemsFromCart()
        const FIVE_MIN = 1000 * 60 * 5

        const isExpired = !updatedAt || Date.now() - updatedAt > FIVE_MIN

        if ((!isSaved || isExpired) && cart.length > 0) {
           syncCart({cart})
        }
    },[])
}
