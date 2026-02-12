import { getStorageStore } from "@/storage/store.storage"
import type { Response } from "@/types/services.types"
import type { UpsertProducts } from "@/types/storeDashboard.types"

type CreateProduct = {
    name:string,
    description:string,
    price:string,
    stock:string,
    category:string,
    image:File
}
type UpdateProduct = Omit<UpsertProducts,"image"> & {
    image?:File 
}
export const serviceCreateProduct = async({name,description,price,
    stock,image,category}:CreateProduct):Promise<Response >=>{
    const {id:storeId} = getStorageStore()
    const formData = new FormData()
    formData.append('name',name)
    formData.append('category',category)
    formData.append('image',image)
    formData.append('price',price)
    formData.append('stock',stock)
    formData.append('description',description)
    formData.append('storeId',storeId.toString())
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

export const serviceUpdateProduct = async(payload:UpdateProduct):Promise<Response>=>{
    const {id:storeId} = getStorageStore()
    const formData = new FormData()
    const allowedFields: (keyof UpsertProducts)[] = [
        "name",
        "description",
        "price",
        "image",
        "category",
        "stock",
    ];

    allowedFields.forEach((field) => {
        const value = payload[field];
        if (value !== undefined && value !== null) {
            formData.append(field, value as any);
        }
    }); 
    formData.append('storeId',String( storeId ))
    formData.append('productId',String(payload.id))
    try{
        const response = await fetch('/product/update',{
            method:'PUT',
            body:formData,
            credentials:'include'
        })
        return {message:'',status:response.status}
    }catch(err){
        return {message:'Algo deu errado',status:500}
    }
}
type Props =
  | {
      type: "create";
      payload: CreateProduct;
    }
  | {
      type: "update";
      payload: UpdateProduct;
    };

export const upsertService = async({type,payload}:Props):Promise<number>=>{
    if(type === "create"){
        const {status}  = await serviceCreateProduct(payload)
        return status
    }
    const {status} = await serviceUpdateProduct(payload)
    return status
}

