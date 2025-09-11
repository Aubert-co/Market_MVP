import type { Product } from "@/types/products.types";
import type { ResponseWithPages} from "@/types/services.types"

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
        if(!response.ok)throw new Error();
        const {datas,currentPage,totalPages} = await response.json()
        return {datas,currentPage,totalPages,status:response.status,message:'sucesso'}
    }catch(err:unknown){
        return {datas:[] , currentPage:1,totalPages:1,status:500,message:'Algo deu errado!'}
    }
}