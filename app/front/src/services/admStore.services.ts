import type { Response, ResponseWithPages } from "@/types/services.types";
import type { Product } from "@/types/products.types";

import type { BaseCoupon } from "@/types/coupons.types";
import { getStorageStore } from "@/storage/store.storage";
import type { GetStoreCoupons, GetStoreOrders, GetStoreProducts, Order } from "@/types/storeDashboard.types";



type CreateProduct = {
    name:string,
    description:string,
    price:string,
    stock:string,
    category:string,
    storeId?:string,
    image:File
}
export const serviceCreateProduct = async({name,description,price,
    stock,image,category}:CreateProduct):Promise<Response >=>{
    const [store] = getStorageStore()
    const formData = new FormData()
    formData.append('name',name)
    formData.append('category',category)
    formData.append('image',image)
    formData.append('price',price)
    formData.append('stock',stock)
    formData.append('description',description)
    formData.append('storeId',store.id.toString())
    try{
        const response = await fetch('/product/create',{
            method:'POST',
            credentials:'include',
            body:formData,
            
        })
        if(!response.ok){
            return {status:response.status,message:''}
        }
        const datas = await response.json()
        return {message:datas.message,status:response.status}
    }catch(err:unknown){
        return {message:'Algo deu errado',status:500}
    }
}


export const getStoreProducts = async({nextPage}:
    GetStoreProducts):Promise<ResponseWithPages<Product[]>>=>{
       try{     
            const [store] = getStorageStore()
            const response = await fetch(`/admin/store/products/${store.id}/${nextPage}`,{
                method:'GET',
                headers: {
                'Content-Type': 'application/json'
                },
                credentials:'include'
            })  
            const responseValues = await response.json()
          
             if(!response.ok){
                return {datas:[],message:responseValues.message,currentPage:1,totalPages:1,status:response.status}
             }
            return {datas:responseValues.datas
                ,currentPage:responseValues.currentPage
                ,totalPages:responseValues.totalPages,
                status:response.status,message:''
            }
          
        }catch(err:unknown){
            return {datas:[],currentPage:1,totalPages:1,status:500,message:'Deu erro'}
        }

}


export const createCouponService = async({code,expiresAt,
    discount,discountType,quantity}:Omit<BaseCoupon<string>,'id'>):Promise<Response>=>{
        try{
            const [storeId] = getStorageStore()
            const response = await fetch('/store/create/coupon',{
                method:'POST',
                credentials:'include',
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({code,expiresAt,discount,discountType,quantity,storeId:storeId.id})
            })
          
            const datas = await response.json()

            return {status:response.status,message:datas.message}

        }catch(err:unknown){
            return {status:500,message:"Algo deu errado!"}
        }
}

export const getStoreCoupons = async ({nextPage}:GetStoreCoupons
): Promise<ResponseWithPages<BaseCoupon<number>[]>> => {
    const [store] = getStorageStore()
    try{
        const response = await fetch(`/store/coupons/${store.id}/${nextPage}`,{
            method:'POST',
            credentials:'include',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        
        const values = await response.json()
        
        return {
            datas:values.datas,
            message:values.message,
            status:response.status,
            currentPage:values.currentPage,
            totalPages:values.totalPages
        }
    }catch(err:any){
        return {datas:[] as BaseCoupon<number>[] ,currentPage:1,totalPages:1,message:'Algo deu errado!',status:500}
    }
}


export const getStoreOrders = async({status,nextPage}:GetStoreOrders)
:Promise<ResponseWithPages<Order[]> >=>{
    try{
        const response = await fetch('',{
            method:'POST',
            body:JSON.stringify({status,currentPage:nextPage})
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