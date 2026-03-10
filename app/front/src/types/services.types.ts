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
  service:(body:B)=>Promise<ResponseDatas<T>>,
  body:B

}
export type SetPages = (params:{totalPages:number,currentPage:number})=>void
export type useFetchWithPages<T,B> = {
  setPages: SetPages;
  setDatas: (args: { datas: T; status: number; message: string }) => void;
  service: (body:B) => Promise<ResponseWithPages<T>>;
  body: B;
};