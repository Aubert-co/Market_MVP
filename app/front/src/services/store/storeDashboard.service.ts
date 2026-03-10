import { getStorageStore } from "@/storage/store.storage"
import type {  ResponseDatas } from "@/types/services.types"
import type { BackendStats, GetStoreDashboard, TopVisitedProduct } from "@/types/storeDashboard.types"

export const storeDashboardService = async():Promise<ResponseDatas<GetStoreDashboard[]>>=>{
    try{
        const store = getStorageStore()
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
    }catch(err:any){
        return {message:'Algo deu errado!',
            datas:[{
            orders:{cancelled:0,completed:0,pending:0,lastPending:[]},
            views:{total:0}
        }] ,
        status:500}
    }

}

export const topVisitedProducts = async():Promise<ResponseDatas<TopVisitedProduct[]>>=>{
     try{
        const response = await fetch('',{
            method:'POST',
            credentials:'include'
        })
       
        if(!response.ok){
            return {
                message:"Algo deu errado",
                status:500,
                datas:[]
            }
        }
        const {message,datas} = await response.json()

        return {datas,message,status:response.status}
    }catch(err:any){
        return {
            message:"Algo deu errado",
            status:500,
            datas:[]
        }
    }
}



export const dashboardStats = async():Promise<ResponseDatas<BackendStats>>=>{
  try{
    const response = await fetch('',{
      credentials:'include'
    })
    if(!response.ok){
      return {message:'Algo deu errado',status:500,
        datas:{revenue:0,views:0,orders:0,conversion:0,coupons:0,products:0}
      }
    }
    const {datas,message} =await response.json()

    return { datas, message , status:response.status}

  }catch(err:any){
    return {message:'Algo deu errado',status:500,datas:{
      revenue:0,views:0,orders:0,conversion:0,coupons:0,products:0
    }}
  }
}