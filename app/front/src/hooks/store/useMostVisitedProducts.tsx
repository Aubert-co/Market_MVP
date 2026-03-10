import { usableFetch } from "@/services/fetchs"
import { topVisitedProducts } from "@/services/store/storeDashboard.service"
import type { TopVisitedProduct } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"

type VisitedState = {
  datas:TopVisitedProduct[],
  status:number
}
type ReturnedDatas = {
    mostVisited:TopVisitedProduct[]
    status:number
}
export const useMostVisitedProducts = ():ReturnedDatas=>{
  const [mostVisited,setVisited] = useState<VisitedState>({datas:[],status:0})
  useEffect(()=>{
    usableFetch<TopVisitedProduct[],{}>({
      service:topVisitedProducts,
      setDatas:setVisited,
      body:{}
    })
  },[])
  return {mostVisited:mostVisited.datas,status:mostVisited.status}
}