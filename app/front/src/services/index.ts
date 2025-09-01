import { api } from "@/constants/urls"

export const  headers ={'Content-Type':'application/json'}


export const loadImage = (imageName:string)=>api+`/images/${imageName}`
export type Response ={
    message:string,
    status:number
}

type UsableFetch<T> = {
    setDatas:(args:{datas:T,status:number})=>void,
    service:()=>Promise<{datas:T,status:number}>,
}
export const usableFetch =async <T> ({setDatas,service}:UsableFetch<T>)=>{
    try{
        const {datas,status} = await service()
        setDatas({datas,status})
    }catch(err:any){
        setDatas({datas:[] as any,status:0})
    }
}