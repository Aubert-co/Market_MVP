import type { SetStateAction } from "react"
import type { Message } from "../../hooks/useBoxMessages"
import { userAddCoupon } from "@/services/coupons.services"

type Props = {
    id:number,
    setMessage: React.Dispatch<SetStateAction<Message>>
}
export const AddCoupon = ({id,setMessage}:Props)=>{
    const onClick = async()=>{
        const { message,status } = await userAddCoupon(id)
        
        if(status === 201){
            setMessage({content:'Sucesso ao adicionar o cupom',type:'success'})
            return;
        }
        if(status ===401){
            setMessage({content:'Faça login para adicionar o cupom',type:'info'})
            return;
        }
        if(message === "This user already possesses the coupon."){
            setMessage({content:'Você já possui este cupom',type:'info'})
            return
        }
        if(message ==="Limit of active coupons reached."){
            setMessage({content:'Você já possui muitos cupons',type:'info'})
            return
        }
        setMessage({content:'Algo deu errado!',type:'error'})
        
    }
  return <button onClick={onClick} className="btn-get-coupon">Pegar</button>
}