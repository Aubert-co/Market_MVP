import type { UserCart } from "@/types/cart.types"
import orderhistory from '@/assets/orderhistory.png'

import { CartActions } from "./cartActions"
import { useEffect, useState } from "react"
import { ProductSkeleton } from "../product/boxProductSkeleton"

type PropsCartList = {
  cart:UserCart[]
}
type Props = {
  cart:UserCart[],
  status:number
}
export const CartList = ({ cart }: PropsCartList) => {
  return (
    <>
      {cart.map((val:any) => {
        if (val?.isDeleted) return null; 

        return (
          <div className="list-item" key={val.productId}>
            <div className="list-image">
              <img src={orderhistory} alt="Ícone de histórico de compras" />
            </div>

            <div className="list-info">
              <h3>Preço:R${val.price}</h3>
              <p>Produto: {val.name}</p>
              <p>Estoque: {val.stock}</p>
              <CartActions id={val.productId} quantity={val.quantity} />
            </div>
          </div>
        );
      })}
    </>
  );
};
type State = "error" | "empty" |"loading" | "sucess"
export const RenderConditions = ({cart,status}:Props)=>{
 
  const [stateCart,setStateCart]  =useState<State>("loading")
  useEffect(()=>{
    if(status ===0){  
      setStateCart("loading")
      return
    }
    if(status < 201 && cart.length ===0){
      setStateCart('empty')
      return 
    }
    if(status > 201){
      setStateCart('error')
      return
    }
    setStateCart("sucess")
  },[cart,status])
  if( stateCart === "error" ){
    return (
      <div className="text">
        <h1>Algo deu errado ao carregar o seu carrinho</h1>
      </div>
    )
  }
  if( stateCart ==="empty" ){
    return (
      <div className="text">
        <h1>Seu carrinho está vazio. Adicione itens para continuar.</h1>
      </div>
    )
  }
  if(stateCart === "loading")
    return <ProductSkeleton length={5} className="list-item" classNameImg="list-image"/>;
     
    
  
  return <CartList cart={cart}/>
   
  
}

