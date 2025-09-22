import {  saveStorageStore } from "@/storage/store.storage";
import type { Response, ResponseDatas } from "@/types/services.types";
import type { Store } from '@/types/store.types'


type CreateStore = Omit<Store,"photo" | "id"> &{
  image:File
}
export const serviceCreateStore = 
  async ({ name, description, image }: CreateStore)
  :Promise<Response> => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    const response = await fetch('/store/create', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

  

    const {message} = await response.json();
    
    return { message, status: response.status };
  } catch (err: unknown) {
  
    return { message: 'Algo deu errado', status: 500};
  }
};


export const serviceGetStores = async():Promise<ResponseDatas<Store[]>>=>{
    try{
       
        const response = await fetch('/store/mystores',{
          method:'GET',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(!response.ok){
          return {message:'Algo deu errado',status:response.status,datas:[]}
        }
        const {datas} = await response.json()
        if(Array.isArray(datas) && datas.length >0){
          saveStorageStore( datas as Store[] )
        }

        return {status:200 , datas,message:'sucess'}
    }catch(err:any){
      return {status:500,datas:[],message:'Algo deu errado!'}
    }
}
