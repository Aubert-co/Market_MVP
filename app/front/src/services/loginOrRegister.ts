import { loginApi, registerApi } from "../constants/urls";
import type { Response } from "../types/services";

type LoginOrRegister ={
    name?:string,
    email:string,
    password:string,
    typeForm: 'login' | 'register'
}
export const serviceLoginOrRegister = async({name,email,password,typeForm}:LoginOrRegister):Promise<Response>=>{
    try{
        const url = typeForm === 'login' ? loginApi : registerApi
        const response = await fetch(url,{
            method:'POST',
            body:JSON.stringify({name,email,password})
        })
        if(!response.ok)throw new Error();

        const res = await response.json()
        
        return {status:response.status,message:res.message}
    }catch(err:any){
        return {status:501,message:'Algo deu errado'}
    }

}