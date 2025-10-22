import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { serviceLoginOrRegister } from "@/services/loginOrRegister"
import { FormLoginOrRegister } from "@/components/forms/formLoginOrRegister";
import type { Message } from "@/components/boxMessages";
export type TypeSubmitLogin = {
    email:string,
    password:string,
    setMessageParams:(msg:Message)=>void,
    name:string
}

export const Login = ()=>{
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate()

    const submitForm = async(submitUserDatas:TypeSubmitLogin):Promise<void>=>{
        const {status} = await serviceLoginOrRegister({
            password:submitUserDatas.password,
            email:submitUserDatas.email,
            typeForm:'login'
        } )
        if( status === 201){
            submitUserDatas.setMessageParams({content:"Você fez login com sucesso, você será redirecionado",type:'success'})
            setTimeout(()=>{
                navigate('/');
            },3000)
            return;
        }
        
        if(status>=400 && status <=410){
            return submitUserDatas.setMessageParams({content:'Usuário ou senha inválidos',type:'info'})
        }
        submitUserDatas.setMessageParams({content:'Erro interno, tente novamente',type:'error'})
        
    }
    return <FormLoginOrRegister type={"Login"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
}