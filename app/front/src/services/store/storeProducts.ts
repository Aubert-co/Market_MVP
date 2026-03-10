import type {  ResponseWithPages } from "@/types/services.types";
import type { Product } from "@/types/products.types";
import { getStorageStore } from "@/storage/store.storage";
import type {   GetStoreProducts } from "@/types/storeDashboard.types";


export const getStoreProducts = async({nextPage,category,orderby,name}:
    GetStoreProducts):Promise<ResponseWithPages<Product[]>>=>{
         try{     
            const store = getStorageStore()
            const response = await fetch(`/admin/store/products/${store.id}/${nextPage}`,{
                method:'GET',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({category,name,orderby}),
                credentials:'include'
            })  
            const responseValues = await response.json()
          
             if(!response.ok){
                return {datas:[],message:responseValues.message,currentPage:1,totalPages:1,status:response.status}
             }
            return {
                datas:responseValues.datas
                ,currentPage:responseValues.currentPage
                ,totalPages:responseValues.totalPages,
                status:response.status,
                message:''
            }
        
          
        }catch(err:unknown){
            return {datas:[],currentPage:1,totalPages:1,status:500,message:'Deu erro'}
        }

}


