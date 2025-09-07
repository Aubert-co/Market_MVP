import { StyleBtn, UserFormStyles } from "@/styles/forms"
import { InputWithLabel } from "./inputWithLabel"
import { useRef, useState } from "react"
import { useBoxMessage } from "../boxMessages"
import { getMultiInputValues } from "@/utils"
import { checkIsAValidNumber, isAValidString } from "@/utils/checkIsValid"
import { createCouponService } from "@/services/admStore.services"


export const FormCreateCoupon = ()=>{
    
    const [selectDiscount,setDiscount] = useState("fixed")
    const [expiresAt,setExpires] = useState("fivedays")
    const discountRef = useRef(null)
    const cupomCodeRef = useRef(null)
    const quantityRef = useRef(null)
    const {BoxMessage,setMessage}= useBoxMessage()
    const onSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const [discount , cupomCode,quantity]=getMultiInputValues(discountRef,cupomCodeRef,quantityRef)

        if(Number(quantity) >= 50){
            setMessage({content:'Quantidade não pode ser maior ou igual a 50',type:'info'})
            return;
        }
        if(!checkIsAValidNumber(quantity) || Number(quantity) <=0){
            setMessage({content:'Quantidade inválida',type:'info'})
        }
    
        if(!isAValidString(cupomCode)){
            setMessage({content:"Digite um nome válido",type:'info'})
            return;
        }
        if( Number(discount) >=60){
            setMessage({content:"Desconto não pode ser maior que 60",type:'info'})
            return
        }
        if(Number(discount) <0){
            setMessage({content:"Desconto não pode ser igual ou menor que zero",type:"info"})
            return 
        }
        if(selectDiscount !== "fixed" && selectDiscount !=="percent"){
            setMessage({content:"",type:'info'})
            return;
        }
        const {status} = await createCouponService({
            code:cupomCode,quantity:Number(quantity),discount:Number('discount'),
            discountType:selectDiscount,expiresAt
        })
        if(status === 201){
            setMessage({content:"Cupom criado com sucesso",type:"success"})
            return
        }
        if(status > 420){
            setMessage({content:"Verifique os campos e tente novamente",type:"info"})
            return
        }
        setMessage({content:"Algo deu errado , tente novamente",type:"error"})
    }
    return (
       <UserFormStyles>
            <form onSubmit={onSubmit}>
                <BoxMessage/>
                <h1>Criar cupom de desconto</h1>
                <InputWithLabel textLabel="Tipo de desconto" inputName="select">
                    <select name="select" id="" onChange={(e)=>setDiscount(e.currentTarget.value)}>
                        <option value="fixed">Fixo</option>
                        <option value="percent">Em porcentagem</option>
                    </select>
                </InputWithLabel>

                <InputWithLabel textLabel="Valor do desconto" inputName="cupom-value">
                    <input type="number" name="cupom-value" min={1}  ref={discountRef} placeholder="Ex: 15"/>
                </InputWithLabel>
                <InputWithLabel textLabel="Escolha um nome para o cupom" inputName="cupom-name">
                    <input type="text" name="cupom-name" ref={cupomCodeRef} placeholder="Ex: DESCONTO15"/>
                </InputWithLabel>
                <InputWithLabel textLabel="Escolha uma data pra expiração" inputName="cupom-expires">
                    <select name="cupom-expires" onChange={(e)=>setExpires(e.currentTarget.value)}>
                        <option value="fivedays">5 dias</option>
                        <option value="oneweek">1 semana</option>
                        <option value="onemonth">1 mês</option>
                    </select>
                </InputWithLabel>
                <InputWithLabel textLabel="Quantidades de cupons" inputName="cupom-quantity">
                    <input ref={quantityRef} placeholder="Ex: 25" min={1} type="number" name="cupom-quantity" />
                </InputWithLabel>
                <StyleBtn>Criar</StyleBtn>
            </form>
       </UserFormStyles>
    )
}