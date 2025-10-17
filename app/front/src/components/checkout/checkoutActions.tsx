import { removeItemCheckout } from "@/storage/checkout.storage";
import { StyleBtn } from "@/styles/forms.style"
import {  type SetStateAction } from "react";
import { ChangeQuantity } from "./changeItemQuantity";

type Props ={
    id:number
    quantity:number,
    setUpdate:React.Dispatch<SetStateAction<boolean>>,
    stock:number
}

export const CheckoutActions = ({id,quantity,setUpdate,stock}:Props)=>{
    const remove = ()=>{
        removeItemCheckout(id)
        setUpdate(true)
    }
   
    return(
        <div className="checkout-actions">
            
            <StyleBtn
                className="btn-delete"
                $bg="#e74c3c"
                $hoverBg="#c0392b"
                $color="#fff"
             onClick={remove} >Remover</StyleBtn>
            <ChangeQuantity stock={stock} setUpdate={setUpdate} id={id} quantity={quantity}/>
        </div>
      
    )
}