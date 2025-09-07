import { api } from "@/constants/urls";
import type { PageInfo } from "@/types/pagination.types";
import type { Product } from "@/types/products.types";
import type { Response } from "@/types/services";
import { headers } from ".";
import type { BaseCoupon } from "@/types/coupons.types";


/**
 * const mockProducts: Product[] = [
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
 */
type CreateProduct = {
    name:string,
    description:string,
    price:string,
    stock:string,
    category:string,
    storeId:string,
    image:File
}
export const serviceCreateProduct = async({name,description,price,
    stock,image,storeId,category}:CreateProduct):Promise<Response>=>{
    const formData = new FormData()
    formData.append('name',name)
    formData.append('storeId',storeId)
    formData.append('category',category)
    formData.append('image',image)
    formData.append('price',price)
    formData.append('stock',stock)
    formData.append('description',description)
    try{
        const response = await fetch(api+'/product/create',{
            method:'POST',
            credentials:'include',
            body:formData
        })
        if(!response.ok)throw new Error()
        const datas = await response.json()
        return {message:datas.message,status:response.status}
    }catch(err:unknown){
        return {message:'Algo deu errado',status:500}
    }
}

type GetProducts = {
    name?:string,
    category?:string,
    currentPage?:number
}
type ResGetProducts = PageInfo & {
    datas:Product[],
    status:number
}
export const getStoreProducts = async({name,category,currentPage}:
    GetProducts):Promise<ResGetProducts>=>{
       try{     
            const response = await fetch(api+'/page',{
                method:'POST',
                body:JSON.stringify({name,category,currentPage}),
                headers,
                credentials:'include'
            })  
            if(!response.ok)throw new Error()

            const responseValues = await response.json()
            return {datas:responseValues.datas
                ,currentPage:responseValues.currentPage
                ,totalPages:responseValues.totalPages,
                status:response.status
            }
        }catch(err:unknown){
            return {datas:[],currentPage:1,totalPages:1,status:500}
        }

}

type FetchProducts = {
    setPages:(params:PageInfo)=>void,
    body:GetProducts,
    setProducts:(params:{datas:Product[],status:number})=>void
}
export const fetchStoreProducts = async({setPages,setProducts,body}:FetchProducts)=>{
   try{
        const {datas,currentPage,status,totalPages} = await getStoreProducts(body)

        setProducts({datas,status})
        setPages({currentPage,totalPages})
   }catch(err:unknown){
        setProducts({datas:[],status:500})
        setPages({currentPage:1,totalPages:1})
   }
}

export const createCouponService = async({code,expiresAt,
    discount,discountType,quantity}:BaseCoupon<string>):Promise<Response>=>{
        try{
            const response = await fetch(api+'/store/create/coupon',{
                method:'POST',
                credentials:'include',
                headers,
                body:JSON.stringify({code,expiresAt,discount,discountType,quantity})
            })
            if(!response.ok)throw new Error()
            const datas = await response.json()

            return {status:response.status,message:datas.message}

        }catch(err:unknown){
            return {status:500,message:"Algo deu errado!"}
        }
}