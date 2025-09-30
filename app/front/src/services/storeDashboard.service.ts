import { getStorageStore } from "@/storage/store.storage"
import type {  ResponseDatas } from "@/types/services.types"
import type { GetStoreDashboard } from "@/types/storeDashboard.types"

export const storeDashboardService = async():Promise<ResponseDatas<GetStoreDashboard[]>>=>{
    const [store] = getStorageStore()
    const response = await fetch(`/store/dashboard/${store.id}`,{
        credentials:'include'
    })
    const {message,datas} = await response.json()
    
    if(!response.ok){
        return {message,
            datas:[{
            orders:{cancelled:0,completed:0,pending:0,lastPending:[]},
            views:{total:0}
        }] ,
        status:response.status}
    }
    return {message,datas,status:response.status}

    
}