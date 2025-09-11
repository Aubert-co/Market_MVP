export type PageInfo={
  currentPage:number,
  totalPages:number
}
export type Response = {
  status:number,
  message:string,
 
}
export type ResponseDatas<T>= Response & {
  datas:T,
}
export type ResponseWithPages<T> =  ResponseDatas<T> & PageInfo


export type UsableFetch<T,B> = {
  setDatas:(args:{datas:T,status:number,message:string})=>void,
  service:(body?:B)=>Promise<ResponseDatas<T>>,
  body?:B

}

export type useFetchWithPages<T,B> = {
  setPages: (params: { totalPages: number; currentPage: number }) => void;
  setDatas: (args: { datas: T; status: number; message: string }) => void;
  service: (body:B) => Promise<ResponseWithPages<T>>;
  body: B;
};