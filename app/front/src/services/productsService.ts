import type { Product } from "@/types/products.types";
import type { ResponseDatas, ResponseWithPages} from "@/types/services.types"

export type GetProductsIndex = {
    nextPage:string | number
}
export const serviceGetProducts = async({nextPage}:GetProductsIndex):Promise<ResponseWithPages<Product[]>>=>{
    try{
        const response = await fetch(`/product/page/${nextPage}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const {datas,currentPage,totalPages} = await response.json()
        return {datas,currentPage,totalPages,status:response.status,message:'sucesso'}
    }catch(err:unknown){
        return {datas:[] , currentPage:1,totalPages:1,status:500,message:'Algo deu errado!'}
    }
}
export type BodySearch ={
    name?:string,
    category?:string,
    minPrice?:string | number,
    maxPrice?:string | number
}
export const searchProduct = async({name,category,minPrice,maxPrice}:BodySearch):Promise<ResponseDatas<Product[]> >=>{
    try{
     
        const response = await fetch('/product/filter',{
            method:'POST',
            body:JSON.stringify({name,category,minPrice,maxPrice}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const {datas,message} = await response.json()
        return {datas,message,status:response.status}
    }catch(err:any){
        return {datas:[],status:500,message:'Algo deu errado!'}
    }
}