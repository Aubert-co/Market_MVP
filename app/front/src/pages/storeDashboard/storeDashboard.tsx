import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { DashboardStats } from "@/components/store/DashboardStats"
import { usableFetch } from "@/services/fetchs"
import { storeDashboardService } from "@/services/storeDashboard.service"
import { Box } from "@/styles/dashboardStore.style"
import type { GetStoreDashboard } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"


type Datas = {
  datas:GetStoreDashboard[],
  status:number
}
const getDatas = (datas:any)=>{

  if(datas && datas.length>0){
    return {datas:datas[0]}
  }
  return {datas:{}}
}
export const StoreAdminDash= () => {
  const [dashboard,setDashboard] = useState<Datas>({datas:[] as GetStoreDashboard[],status:0})
  useEffect(()=>{
    usableFetch<GetStoreDashboard[],{}>({
      setDatas:setDashboard,
      service:storeDashboardService,
      body:{},
      
    })
  },[])
  const {datas} = getDatas(dashboard.datas)
  
  return (
    <ContainerDashboard  isSidebarOpen={false}>
      <Box >
        <DashboardStats orders={datas?.orders} views={datas?.views}/>
      </Box>

    </ContainerDashboard>
  )
}


