import type {UpdateCartState} from "@/context/cart.context"
import { getItemsFromCart } from "@/storage/cart.storage"
import { SmallButton, StyleBtn } from "@/styles/forms"
import { useEffect ,useState} from "react"
import styled from "styled-components"

const ListInfo = styled.div`
    display:flex;
    flex-direction:column;
    gap:3px;
    justify-content:center;
    text-align:center;
    align-items:center;
    width:100%;
`
export const CartTotally  =({updateCart,setUpdateCart}:UpdateCartState)=>{
  const [cart,setCart] = useState<number>(0)
  useEffect(()=>{
    const values = getItemsFromCart()
    .cart.reduce((val,tr)=>{
      if(!tr.isDeleted)return val + tr.price * tr.quantity
      return val
    },0)

    setCart(Number(values))
  },[updateCart,setUpdateCart])
  return(
    <div className="list-item">
        <ListInfo>
            <h4>Total:R${cart}</h4>
            <SmallButton>Finalizar compra</SmallButton>
            <SmallButton>Limpar carrinho</SmallButton>
        </ListInfo>
    </div>
  )
}