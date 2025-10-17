import { serviceCreateOrder, type CreateOrder } from "@/services/checkout.services"
import { getItemsCheckout } from "@/storage/checkout.storage"
import { StyleBtn } from "@/styles/forms.style"
import type { Message } from "../boxMessages"
import type { SetStateAction } from "react"

type Props = {
    couponId?:number,
    setMessage: React.Dispatch<SetStateAction<Message>>,
}
export const FinishCheckout = ({couponId,setMessage}:Props)=>{
     const onClick = async()=>{
        const items = getItemsCheckout()
        if(!items ||  items.length === 0 ){
            return
        }
        const order = items.map((val)=>{
            return {productId:val.id,quantity:val.quantity,couponId}
        }) as CreateOrder[]
        const {status} = await serviceCreateOrder(order)
        if(status === 201){
            setMessage({type:'success',content:'Compra realizada com sucesso!'})
            return;
        }
        if(status === 401){
            setMessage({type:'info',content:'Faça login para finalizar a compra!'})
            return 
        }
        setMessage({type:'error',content:'Algo deu errado ao tentar finalizar a compra!'})
    }
    return <StyleBtn onClick={onClick}>Finalizar</StyleBtn>
}