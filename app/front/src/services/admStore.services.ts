import type { Response, ResponseWithPages } from "@/types/services.types";
import type { Product } from "@/types/products.types";

import type { BaseCoupon } from "@/types/coupons.types";
import { getStorageStore } from "@/storage/store.storage";
import type { GetStoreCoupons, GetStoreOrders, GetStoreProducts, Order } from "@/types/storeDashboard.types";


 const mockProducts: Product[] = [
  {
    id: 1,
    name: "Teclado Mecânico RGB",
    price: 299.9,
    imageUrl: "https://via.placeholder.com/80",
    category: "Periféricos",
    stock: 15,
    description: "Teclado mecânico com iluminação RGB e switches azuis.",
  },
  {
    id: 2,
    name: "Mouse Gamer",
    price: 159.9,
    imageUrl: "https://via.placeholder.com/80",
    category: "Periféricos",
    stock: 30,
    description: "Mouse gamer com 6 botões programáveis.",
  },
  {
    id: 3,
    name: "Monitor Full HD 24''",
    price: 899.0,
    imageUrl: "https://via.placeholder.com/80",
    category: "Monitores",
    stock: 8,
    description: "Monitor 24 polegadas Full HD com 75Hz.",
  },
  {
    id: 4,
    name: "Headset Gamer",
    price: 249.5,
    imageUrl: "https://via.placeholder.com/80",
    category: "Áudio",
    stock: 20,
    description: "Headset com som surround 7.1 e microfone removível.",
  },
  {
    id: 5,
    name: "Placa de Vídeo GTX 1660",
    price: 1499.9,
    imageUrl: "https://via.placeholder.com/80",
    category: "Hardware",
    stock: 5,
    description: "Placa de vídeo NVIDIA GTX 1660 6GB GDDR5.",
  },
];

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
    //formData.append('storeId',storeId)
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
        if(!response.ok)throw new Error()
        const datas = await response.json()
        return {message:datas.message,status:response.status}
    }catch(err:unknown){
        return {message:'Algo deu errado',status:500}
    }
}


export const getStoreProducts = async({name,category,nextPage}:
    GetStoreProducts):Promise<ResponseWithPages<Product[]>>=>{
       try{     
            const [store] = getStorageStore()
            const response = await fetch(`/admin/store/products/${store.id}/${nextPage}`,{
                method:'GET',
                body:JSON.stringify({name,category,currentPage:nextPage}),
                headers: {
                'Content-Type': 'application/json'
                },
                credentials:'include'
            })  
            if(!response.ok)throw new Error()

            const responseValues = await response.json()
            return {datas:responseValues.datas
                ,currentPage:responseValues.currentPage
                ,totalPages:responseValues.totalPages,
                status:response.status,message:''
            }
          
        }catch(err:unknown){
            return {datas:[],currentPage:1,totalPages:1,status:500,message:''}
        }

}


export const createCouponService = async({code,expiresAt,
    discount,discountType,quantity}:Omit<BaseCoupon<string>,'id'>):Promise<Response>=>{
        try{
            const response = await fetch('/store/create/coupon',{
                method:'POST',
                credentials:'include',
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({code,expiresAt,discount,discountType,quantity})
            })
            if(!response.ok)throw new Error()
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
        const response = await fetch('/store/coupons',{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({currentPage:nextPage,storeId:store.id}),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        if(!response.ok)throw new Error()
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
        if(!response.ok)throw new Error()

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