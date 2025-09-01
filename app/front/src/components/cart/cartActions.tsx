import { UpdateCartQuantity } from "./updateCartQuantity"
import { RemoveFromCart } from "./removeFromCart"
import {  useState } from "react"
import styled from "styled-components"


type Props = {
    id:number,
    quantity:number
}
const CartStyle = styled.div`
 .cart-update {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 6px 12px;
  width: fit-content;
  font-family: Arial, sans-serif;
}

.cart-update button {
  background: #0e1420; /* sua cor base */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.cart-update button:hover {
  background: #1f2937;
  transform: scale(1.05);
}

.cart-update button:active {
  transform: scale(0.95);
}

.cart-update span,
.cart-update p {
  font-size: 16px;
  font-weight: bold;
  color: #111827;
}
 svg {
  font-size: 1.2rem;
  cursor: pointer;
  color: #dc2626; /* vermelho para destacar a lixeira */
  transition: color 0.2s ease, transform 0.2s ease;
}

 svg:hover {
  color: #b91c1c; /* vermelho mais escuro no hover */
  transform: scale(1.1);
}
`
export const CartActions = ({id,quantity}:Props)=>{
    const [updatedQuantity,setQuantity] = useState( quantity )
  
    return (
        <CartStyle>
               <RemoveFromCart id={id}/>
            <UpdateCartQuantity id={id} quantity={updatedQuantity} setQuantity={setQuantity}/>
         
        </CartStyle>
    )
}