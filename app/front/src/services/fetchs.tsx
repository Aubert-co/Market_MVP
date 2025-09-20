import type {  useFetchWithPages ,UsableFetch} from "@/types/services.types";


export const usableFetch = async<T,B>({setDatas,service,body}:UsableFetch<T,B>)=>{
  try{
      const {datas,message,status} = await service(body)
      setDatas({datas,message,status})
  }catch(err:unknown){
    setDatas({datas:[] as T,message:'Algo deu errado!',status:500})
  }
}

export const usableFetchWithPages = async <T,B>(
  { setDatas, service, setPages, body }: useFetchWithPages<T,B>
) => {
  try {
    const { datas, status, message, currentPage, totalPages } =
      await service(body);

    setDatas({ datas, status, message });
    setPages({ currentPage, totalPages });
  } catch (err: any) {
    setDatas({ datas: [] as T, status: 500, message: "Algo deu errado!" });
    setPages({ currentPage: 1, totalPages: 1 });
  }
};
