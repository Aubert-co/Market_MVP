import type { ItemsCheckout } from "@/types/checkout.types"
import { CheckoutActions } from "./checkoutActions"
import type { SetStateAction } from "react";
import { CheckoutItem } from "@/styles/checkout.style";


type PropsList = {
  datas:ItemsCheckout[]
  setUpdate:React.Dispatch<SetStateAction<boolean>>
}
export const ListCheckoutItems = ({datas,setUpdate}:PropsList)=>{
    if(!datas ||datas.length === 0)return <h1>Adicione produtos</h1>
    return datas.map((item) => (
           <CheckoutItem key={item.id} >
                <div className="item-content">
                    <img src={item.imageUrl} alt={item.name} className="item-image" />

                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-name">Preço:R${item.price}</p>
                      <p className="item-name">Estoque:{item.stock}</p>
                      <p className="item-name">  Total RS:{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>

                <div className="actions">
                    <CheckoutActions stock={item.stock} setUpdate={setUpdate} id={item.id} quantity={item.quantity} />
                </div>

               
            </CheckoutItem>


    ))
    
}