import type { Product } from "@/types/products.types";


type GetProducts = {
    datas:Product[],
    status:number,
    currentPage:number,
    totalPages:number
}
export const serviceGetProducts = async(pageNumber:number):Promise<GetProducts>=>{
    try{
        const response = await fetch(`/product/page/${pageNumber}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok)throw new Error();
        const {datas,currentPage,totalPages} = await response.json()
        return {datas,currentPage,totalPages,status:response.status}
    }catch(err:unknown){
        throw new Error();
    }
}