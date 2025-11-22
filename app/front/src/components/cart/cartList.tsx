import type { UserCart } from "@/types/cart.types"
import { CartActions } from "./cartActions"
import React, { type SetStateAction } from "react"
import type { Message } from "../../hooks/useBoxMessages"
import { loadImage } from "@/utils"

type PropsCartList = {
  cart:UserCart[]
  setMessage: React.Dispatch<SetStateAction<Message>>
}

export const CartList = ({ cart ,setMessage}: PropsCartList) => {
  
  return (
    <>
      {cart.map((val:UserCart) => {
        
        if (val?.isDeleted) return null; 
        
        return (
          <div className="list-item" key={val.id}>
            <div className="list-image">
              <img src={loadImage(val.product.imageUrl)} alt="Imagem do produto" />
            </div>

            <div className="list-info">
              <h3>Preço:R${val.product.price}</h3>
              <p>Produto: {val.product.name}</p>
              <p>Estoque: {val.product.stock}</p>
              <CartActions stock={val.product.stock} setMessage={setMessage} id={val.id} quantity={val.quantity} />
            </div>
          </div>
        );
      })}
    </>
  );
};



