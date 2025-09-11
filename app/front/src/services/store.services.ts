import { getStorageStore, saveStorageStore } from "@/storage/store.storage";
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

    if (!response.ok) throw new Error();

    const {message} = await response.json();
    
    return { message, status: response.status };
  } catch (err: unknown) {
  
    return { message: 'Algo deu errado', status: 500};
  }
};
export const mockStore: Store[] = [{
  id: 1,
  name: "Super Loja Gamer",
  description: "A melhor loja de periféricos e jogos para PC e consoles.",
  photo: "https://via.placeholder.com/300x200?text=Super+Loja+Gamer"
}];

export const serviceGetStores = async():Promise<ResponseDatas<Store[]>>=>{
    try{
        const getFromLocal = getStorageStore();
        
        if(getFromLocal.length !== 0){
          return {
            datas:getFromLocal as Store[],
            status:200,
            message:'sucess'
          }
        }
        const response = await fetch('/store/mystores',{
          method:'GET',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(!response.ok)throw new Error();
        //const {datas} = await response.json()
          const datas = mockStore
      
        if(Array.isArray(datas) && datas.length >0){
          saveStorageStore( datas as Store[] )
        }

        return {status:200 , datas,message:'sucess'}
    }catch(err:any){
      return {status:500,datas:[],message:'Algo deu errado!'}
    }
}
