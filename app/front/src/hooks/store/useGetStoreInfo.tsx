import { usableFetch } from "@/services/fetchs"
import { DATAS_STORE, serviceGetStores } from "@/services/store/store.services"
import type { Store } from "@/types/store.types"
import { useEffect, useState } from "react"

type State = {
    datas:Store,
    status:number,
    message:string
}

export const useGetStoreInfo = ()=>{
    const [storeInfo,setStoreInfo] = useState<State>({
        datas:DATAS_STORE,status:0,message:''
    })
    useEffect(()=>{
        usableFetch<Store,{}>({
            service:serviceGetStores,
            setDatas:setStoreInfo,
            body:{}
        })
      
    },[])

    return {storeInfo}
}