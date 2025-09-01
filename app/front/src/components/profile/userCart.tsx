import { useEffect, useState } from "react"
import type { UserCart } from "@/types/cart.types"
import {  RenderConditions } from "@/components/cart/listCart"
import { getUserCart } from "@/services/cart.services"
import { UpdateCartContext } from "@/context/cart.context"
import { ListContainer } from "@/styles/profile.style"
import { CartTotally } from "../cart/cartTotally"



type CartState = {
    datas:UserCart[],
    status:number
}

export const fetchData = async(setUserCart: React.Dispatch<React.SetStateAction<CartState>>) => {
  const {datas,status}= await getUserCart()
  setUserCart({
    datas:datas as UserCart[],status
  })
};

type Props = {
  formRef:React.RefObject<HTMLInputElement | null>
}


export const Cart = ({formRef}:Props)=>{
    const [userCart,setUserCart] = useState<CartState>({
        datas:[],
        status:0
    })
    const [updateCart,setUpdateCart] = useState<boolean>(true)

    useEffect(() => {
        if (updateCart) {
          fetchData(setUserCart);
          setUpdateCart(false);
        }
    }, [updateCart]);
    
    return(
        <UpdateCartContext.Provider value={{updateCart,setUpdateCart}}>
            <ListContainer>
            <div className="text">
              <h1>Meu carrinho</h1>
            </div>
        

          <div className="list-container">
              <CartTotally setUpdateCart={setUpdateCart} updateCart={updateCart}/>
              <RenderConditions cart={userCart.datas} status={userCart.status}/>
             
          </div>
          <div ref={formRef} className="end"></div>
        </ListContainer>
        </UpdateCartContext.Provider>
        
    )
}