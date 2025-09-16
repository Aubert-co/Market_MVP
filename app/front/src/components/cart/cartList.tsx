import type { UserCart } from "@/types/cart.types"
import orderhistory from '@/assets/orderhistory.png'

import { CartActions } from "./cartActions"
import React, { type SetStateAction } from "react"

import type { Message } from "../boxMessages"
type PropsCartList = {
  cart:UserCart[]
  setMessage: React.Dispatch<SetStateAction<Message>>
}

export const CartList = ({ cart ,setMessage}: PropsCartList) => {
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
              <CartActions setMessage={setMessage} id={val.productId} quantity={val.quantity} />
            </div>
          </div>
        );
      })}
    </>
  );
};



