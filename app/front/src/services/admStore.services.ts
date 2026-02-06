import type { Response, ResponseDatas, ResponseWithPages } from "@/types/services.types";
import type { Product } from "@/types/products.types";

import type { BaseCoupon } from "@/types/coupons.types";
import { getStorageStore } from "@/storage/store.storage";
import type {  GetStoreOrders, GetStoreProducts, Order } from "@/types/storeDashboard.types";



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

export const productsMock: Product[] = [
  {
    id: 1,
    name: "Mouse Gamer RGB",
    price: 129.90,
    imageUrl: "https://example.com/images/mouse-gamer.jpg",
    category: "Roupas",
    stock: 42,
    description: "Mouse gamer com 7200 DPI, 6 botões programáveis e iluminação RGB ajustável."
  },
  {
    id: 2,
    name: "Teclado Mecânico Redragon",
    price: 249.90,
    imageUrl: "https://example.com/images/teclado-redragon.jpg",
    category: "Periféricos",
    stock: 17,
    description: "Teclado mecânico com switches Redragon, iluminação LED e construção em alumínio."
  },
  {
    id: 3,
    name: "Headset Wireless Sony",
    price: 399.00,
    imageUrl: "https://example.com/images/headset-sony.jpg",
    category: "Áudio",
    stock: 8,
    description: "Headset sem fio com microfone removível, bateria de longa duração e som 3D."
  },
  {
    id: 4,
    name: "Monitor 27' 144Hz",
    price: 1299.00,
    imageUrl: "https://example.com/images/monitor-27.jpg",
    category: "Monitores",
    stock: 12,
    description: "Monitor gamer de 27 polegadas, 144Hz, 1ms de resposta e painel IPS."
  },
  {
    id: 5,
    name: "Cadeira Gamer Ergonômica",
    price: 899.99,
    imageUrl: "https://example.com/images/cadeira-gamer.jpg",
    category: "Móveis",
    stock: 5,
    description: "Cadeira gamer ergonômica com ajuste de altura, inclinação e apoio lombar."
  }
];

export const getStoreProducts = async({nextPage}:
    GetStoreProducts):Promise<ResponseWithPages<Product[]>>=>{
       try{     
            const [store] = getStorageStore()
           /* const response = await fetch(`/admin/store/products/${store.id}/${nextPage}`,{
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
            return {
                datas:responseValues.datas
                ,currentPage:responseValues.currentPage
                ,totalPages:responseValues.totalPages,
                status:response.status,
                message:''
            }*/
           return {
            datas:productsMock,
            currentPage:1,
            totalPages:1,
            status:201,
            message:''
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

type StoreCoupon = BaseCoupon<number>[]
export const storeGetAvailableCoupons = async():Promise<ResponseDatas<StoreCoupon>>=>{
   try{
        const [store] =getStorageStore()
        const response = await fetch(`/store/coupons/${store.id}`,{
            credentials:'include',
            method:'POST'
        })
        const {datas,message} = await response.json()
        if(!response.ok){
            return {datas:[],status:response.status,message}
        }
        return {datas,status:response.status,message}
   }catch(err:any){
        return {datas:[],status:500,message:'Algo deu errado!'}
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