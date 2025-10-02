import { StyleBtn, UserFormStyles } from "@/styles/forms.style"
import { InputWithLabel } from "./inputWithLabel"
import { useRef, useState } from "react"
import { useBoxMessage } from "../boxMessages"
import { getMultiInputValues } from "@/utils"
import { checkIsAValidNumber, isAValidString } from "@/utils/checkIsValid"
import { createCouponService } from "@/services/admStore.services"
import type { DiscountType } from "@/types/coupons.types"

type ValidateInputs={
    selectDiscount:any,
    discount:any,
    cupomCode:any,
    quantity:any
}
function validateInputs({ selectDiscount, discount, cupomCode, quantity }:ValidateInputs) {
  if (selectDiscount !== "fixed" && selectDiscount !== "percent")
    return "Selecione um tipo de desconto";

  if (Number(discount) >= 60) 
    return "Desconto não pode ser maior que 60";

  if (!checkIsAValidNumber(discount))
    return "Desconto não pode ser igual ou menor que zero";

  if (!isAValidString(cupomCode, 13))
    return "Digite um nome válido";

  if (Number(quantity) >= 50)
    return "Quantidade não pode ser maior ou igual a 50";

  if (!checkIsAValidNumber(quantity) || Number(quantity) <= 0)
    return "Quantidade inválida";

  return null; 
}
export const FormCreateCoupon = ()=>{
    
    const [selectDiscount,setDiscount] = useState("fixed")
    const [expiresAt,setExpires] = useState("fivedays")
    const discountRef = useRef(null)
    const cupomCodeRef = useRef(null)
    const quantityRef = useRef(null)
    const {BoxMessage,setMessage}= useBoxMessage({styledType:''})

    const onSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        const [discount , cupomCode,quantity]=getMultiInputValues(discountRef,cupomCodeRef,quantityRef)
             
        const errorMessages = validateInputs({discount,selectDiscount,cupomCode,quantity})
        if(errorMessages){
            setMessage({content:errorMessages,type:'info'})
            return 
        }
        const {status,message} = await createCouponService({
            code:cupomCode,quantity:Number(quantity),discount:Number(discount),
            discountType:selectDiscount as DiscountType ,expiresAt
        })
        
        if(status === 201){
            setMessage({content:"Cupom criado com sucesso",type:"success"})
            return
        }
        if(status === 409){
            setMessage({content:"Já existe um cupom com esse nome",type:'info'})
            return
        }
        if(message === "Limit of active coupons reached for this store."){
            setMessage({content:'Sua loja já possui mais de 5 cupons ativos',type:'info'})
            return
        }
        setMessage({content:"Algo deu errado , tente novamente",type:"error"})
    }
    return (
       <UserFormStyles>
            <form onSubmit={onSubmit}>
               
                <h1>Criar cupom de desconto</h1>
                 <BoxMessage/>
                <InputWithLabel textLabel="Tipo de desconto" inputName="select">
                    <select data-testid="select" name="select" id="" onChange={(e)=>setDiscount(e.currentTarget.value)}>
                        <option value="fixed">Fixo</option>
                        <option value="percent">Em porcentagem</option>
                    </select>
                </InputWithLabel>

                <InputWithLabel textLabel="Valor do desconto" inputName="cupom-value">
                    <input type="number" name="cupom-value"   ref={discountRef} placeholder="Ex: 15"/>
                </InputWithLabel>
                <InputWithLabel textLabel="Escolha um nome para o cupom" inputName="cupom-name">
                    <input type="text" name="cupom-name" ref={cupomCodeRef} placeholder="Ex: DESCONTO15"/>
                </InputWithLabel>
                <InputWithLabel textLabel="Escolha uma data pra expiração" inputName="cupom-expires">
                    <select data-testid="select" name="cupom-expires" onChange={(e)=>setExpires(e.currentTarget.value)}>
                        <option value="fivedays">5 dias</option>
                        <option value="oneweek">1 semana</option>
                        <option value="onemonth">1 mês</option>
                    </select>
                </InputWithLabel>
                <InputWithLabel textLabel="Quantidades de cupons" inputName="cupom-quantity">
                    <input ref={quantityRef} placeholder="Ex: 25"  type="number" name="cupom-quantity" />
                </InputWithLabel>
                <StyleBtn>Criar</StyleBtn>
            </form>
       </UserFormStyles>
    )
}