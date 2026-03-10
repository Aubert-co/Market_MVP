import { mapStats } from "@/constants/dashboardStats";
import { usableFetch } from "@/services/fetchs";
import { dashboardStats } from "@/services/store/storeDashboard.service";
import type { BackendStats, Stat } from "@/types/storeDashboard.types";
import { useEffect, useState } from "react";



type StatsState ={
  datas:BackendStats,
  status:number
}
type ReturnUseStats = {
  stats:Stat[]
}
export const useDashboardStats = ():ReturnUseStats=>{
  const [stats,setStats] = useState<StatsState>({datas:{
    revenue:0,views:0,products:0,conversion:0,coupons:0,orders:0
  },status:0})
  const mappedStats = mapStats(stats.datas)
  useEffect(()=>{
    usableFetch<BackendStats,{}>({
      service:dashboardStats,
      setDatas:setStats,
      body:{}
    })
  },[])
  return {stats:mappedStats}
}