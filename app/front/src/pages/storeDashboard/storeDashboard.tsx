import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { RenderDataState } from "@/components/renderDataState"
import { DashboardStats } from "@/components/store/DashboardStats"
import {LastPendingOrders} from '@/components/store/lastPendingOrders'
import { selectMenuItem } from "@/constants/menuItems"
import { usableFetch } from "@/services/fetchs"
import { storeDashboardService } from "@/services/storeDashboard.service"
import { Box, Controls } from "@/styles/dashboardStore.style"
import type { GetStoreDashboard } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"


type Datas = {
  datas:GetStoreDashboard[],
  status:number
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
  const { orders, views } = dashboard.datas[0] || {};
  return (
    <ContainerDashboard sidebarMenuItems={selectMenuItem("Dashboard")} storeName="SuperStore">
      <Box>
          <Controls>
            <DashboardStats orders={orders} views={views}/>
          </Controls>
    
         <RenderDataState<GetStoreDashboard>
              datas={ dashboard.datas}
              status={ dashboard.status}
              emptyMessage={"Seu dashboard está vázio"}
              errorMessage={"Algo deu errado ao carregar seu dashboard"}
              skeletonLoading={{classLoading:"",classImg:"",length:1}}
          >
            <LastPendingOrders products={ orders?.lastPending} />
         </RenderDataState>
      </Box>
    </ContainerDashboard>
  )
}

export default StoreAdminDash
