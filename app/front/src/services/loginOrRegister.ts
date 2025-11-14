import type { Response } from "@/types/services.types";

type LoginOrRegister ={
    name?:string,
    email:string,
    password:string,
    typeForm: 'login' | 'register'
}
export const serviceLoginOrRegister = async({name,email,password,typeForm}:LoginOrRegister):Promise<Response>=>{
    try{
        const url = typeForm === 'login' ? '/login' : '/register'
        const response = await fetch(`https://auth.aubertdev.com.br${url}`,{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers: {
            'Content-Type': 'application/json'
            },
            credentials:'include'
        })
        if(!response.ok){
            return {status:response.status,message:''}
        }

        const res = await response.json()
        
        return {status:response.status,message:res.message}
    }catch(err:any){
        return {status:501,message:'Algo deu errado'}
    }

}