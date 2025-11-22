import { useEffect, useState, type SetStateAction } from "react"
import type { UserCart } from "@/types/cart.types"
import {  CartList } from "@/components/cart/cartList"
import { getUserCart } from "@/services/cart.services"
import { UpdateCartContext } from "@/context/cart.context"
import { ListContainer } from "@/styles/profile.style"
import { CartOverview } from "../cart/cartOverview"
import { RenderDataState } from "@/components/shared/renderDataState"
import type { Message } from "@/hooks/useBoxMessages"
import { Link } from "react-router-dom"
import { usableFetch } from "@/services/fetchs"


type CartState = {
  datas:UserCart[],
  status:number
}
type Props = {
  formRef:React.RefObject<HTMLInputElement | null>,
  setMessage: React.Dispatch<SetStateAction<Message>>

}


export const Cart = ({formRef,setMessage}:Props)=>{
    const [userCart,setUserCart] = useState<CartState>({
        datas:[],
        status:0
    })
    const [updateCart,setUpdateCart] = useState<boolean>(true)

    useEffect(() => {
        if (updateCart) {
          usableFetch<UserCart[],{}>({
            service:getUserCart,
            setDatas:setUserCart,
            body:{}
          });
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
            <RenderDataState<UserCart>
                datas={userCart.datas}
                status={userCart.status}
                emptyMessage={
                      <>
                        Seu carrinho está vazio. <Link to="/">Adicionar produtos</Link>
                      </>

                }
                errorMessage="Algo deu errado ao carregar o seu carrinho"
                skeletonLoading={{classLoading:'list-item',classImg:'list-image',length:3}}
              >
              <CartOverview setMessage={setMessage} setUpdateCart={setUpdateCart} updateCart={updateCart}/>
              <CartList setMessage={setMessage} cart={userCart.datas}/>
            </RenderDataState>
             
             
          </div>
          <div ref={formRef} className="end"></div>
        </ListContainer>
        </UpdateCartContext.Provider>
        
    )
}