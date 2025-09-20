import type {UpdateCartState} from "@/context/cart.context"
import { getItemsFromCart } from "@/storage/cart.storage"
import { SmallButton } from "@/styles/forms.style"
import { useEffect ,useState, type SetStateAction} from "react"
import styled from "styled-components"
import type { Message } from "../boxMessages"
import { useRemoveFromCart } from "./useRemoveFromCart"

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
      if(!tr.isDeleted)return val + tr.price * tr.quantity
      return val
    },0)
   
    setCartTotal(Number(values))
  },[updateCart,setUpdateCart])

  const clenAllCart = ()=>{
    const items = getItemsFromCart()
    onClick( items.cart.map((val)=>val.id))
  }
  return(
    <div className="list-item">
          <ListInfo>
            <h4>Total: R${ cartTotal.toFixed(2) }</h4>
              {cartTotal > 0 ? (
                <>
                  <SmallButton>Finalizar compra</SmallButton>
                  <SmallButton onClick={clenAllCart}>Limpar carrinho</SmallButton>
                </>
              ) : (
                <p>Seu carrinho está vazio 🛒</p>
              )}
        </ListInfo>
    </div>
  )
}