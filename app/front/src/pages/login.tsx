import { useNavigate } from "react-router-dom"
import type { Message } from "../context/messageContext";
import { useRef } from "react"
import { serviceLoginOrRegister } from "../services/loginOrRegister"
import { FormLoginOrRegister } from "../components/forms/formLoginOrRegister";

export type TypeSubmitLogin = {
        email:string,
        password:string,
        setMessageParams:(msg:Message,duration?:number)=>void,
        name:string
}

export const Login = ()=>{
    const formRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const submitForm = async(submitUserDatas:TypeSubmitLogin):Promise<void>=>{
        const {status} = await serviceLoginOrRegister({
            password:submitUserDatas.password,
            email:submitUserDatas.email,
            typeForm:'login'
        } )
        if(status !== 201){
            return submitUserDatas.setMessageParams({content:'Falha ao realizar login',type:'error'})
        }
        submitUserDatas.setMessageParams({content:"Você fez login com sucesso, você será redirecionado",type:'success'})
        setTimeout(()=>{
            navigate('/');
        },3000)
    }
    return <FormLoginOrRegister type={"Login"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
}