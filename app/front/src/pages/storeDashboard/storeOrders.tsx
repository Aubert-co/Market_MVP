import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/hooks/usePagination"
import { OrdersTable } from "@/components/store/ordensTable"
import { selectMenuItem } from "@/constants/menuItems"
import { getStoreOrders } from "@/services/admStore.services"
import { usableFetchWithPages } from "@/services/fetchs"
import { Box } from "@/styles/dashboardStore.style"
import type { GetStoreOrders, Order } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"



type State = {
  datas:Order[],
  status:number,
  message:string
}
export const StoreOrders = ()=>{
    const event = ()=>{}
    const {Pagination,setPagesInfos} = usePagination(event)
    const [orders, setOrders] = useState<State>({
      datas:[], status:0,message:''
    })
    useEffect(()=>{
      usableFetchWithPages<Order[],GetStoreOrders>({
        body:{status:'completed',nextPage:1},
        setDatas:setOrders,
        service:getStoreOrders,
        setPages:setPagesInfos,
        
      })
    },[])
    return (
        <ContainerDashboard sidebarMenuItems={selectMenuItem("Pedidos")} storeName="store">
            <Box>
                <OrdersTable orders={orders.datas}/>
                <Pagination />
            </Box>
        </ContainerDashboard>
    )
}