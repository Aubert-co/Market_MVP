import type {  GetStoreOrders, Order } from "@/types/storeDashboard.types";
import type {  ResponseDatas, ResponseWithPages } from "@/types/services.types";


export const getStoreOrders = async({status,nextPage,search}:GetStoreOrders)
:Promise<ResponseWithPages<Order[]> >=>{
 
   try{
      const response = await fetch('',{
          method:'POST',
          body:JSON.stringify({status,currentPage:nextPage,search})
      })
      

      const json = await response.json()

      return {
          status:response.status,
          datas:json.datas,
          message:'',
          currentPage:json.currentPage,
          totalPages:json.totalPages
          
      }
    }catch(err:any){
      return {
          status:500,
          message:'Algo deu errado!',
          currentPage:1,
          totalPages:1,
          datas:[] 
      }
    }
}


export const lastOrders = async():Promise<ResponseDatas<Order[]>>=>{
    
    try{
        const response = await fetch('',{
            credentials:'include'
        })
        if(!response.ok){
            return {
                message:'Algo deu errado',
                status:500,
                datas:[]
            }
        }
        const {message,datas} = await response.json()

        return {datas,status:response.status,message} 
    }catch(err){
        return {datas:[],message:'Algo deu errado',status:500}
    }
}