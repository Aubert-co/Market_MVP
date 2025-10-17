import type {UpdateCartState} from "@/context/cart.context"
import { getItemsFromCart } from "@/storage/cart.storage"
import { SmallButton } from "@/styles/forms.style"
import { useEffect ,useState, type SetStateAction} from "react"
import styled from "styled-components"
import type { Message } from "../boxMessages"
import { useRemoveFromCart } from "./useRemoveFromCart"
import { setItemsCheckout } from "@/storage/checkout.storage"
import type { ItemsCheckout } from "@/types/checkout.types"

const ListInfo = styled.div`
    display:flex;
    flex-direction:column;
    gap:3px;
    justify-content:center;
    text-align:center;
    align-items:center;
    width:100%;
    
`
type Props = UpdateCartState &{
  setMessage: React.Dispatch<SetStateAction<Message>>
}
export const CartOverview  =({updateCart,setUpdateCart,setMessage}:Props)=>{
  const [cartTotal,setCartTotal] = useState<number>(0)
  const {onClick} = useRemoveFromCart({
    setMessage,
    setUpdateCart
  })
  useEffect(()=>{
    const values = getItemsFromCart()
    .cart.reduce((val,tr)=>{
      if(!tr.isDeleted)return val + tr.product.price * tr.quantity
      return val
    },0)
   
    setCartTotal(Number(values))
  },[updateCart,setUpdateCart])

  const clenAllCart = ()=>{
    const items = getItemsFromCart()
    onClick( items.cart.map((val)=>val.id))
  }
  const redirectCheckout = ()=>{
    const { cart } = getItemsFromCart()
    const items = cart.map((val)=>{
      return {...val.product,quantity:val.quantity}
      
    }) as ItemsCheckout[]
    setItemsCheckout( items  )
  }
  return(
    <div className="list-item">
          <ListInfo>
            <h4>Total: R${ cartTotal.toFixed(2) }</h4>
              {cartTotal > 0 ? (
                <>
                  <SmallButton onClick={redirectCheckout}>Finalizar compra</SmallButton>
                  <SmallButton onClick={clenAllCart}>Limpar carrinho</SmallButton>
                </>
              ) : (
                <p>Seu carrinho está vazio 🛒</p>
              )}
        </ListInfo>
    </div>
  )
}