import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { DashboardStats } from "@/components/store/DashboardStats"
import {LastPendingOrders} from '@/components/store/lastPendingOrders'
import { selectMenuItem } from "@/constants/menuItems"
import { usableFetch } from "@/services/fetchs"
import { storeDashboardService } from "@/services/storeDashboard.service"
import { Box, Controls } from "@/styles/dashboardStore.style"
import type { GetStoreDashboard, ProductOrder } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"

export const productOrdersMock:ProductOrder[] = [
  {
    product: {
      name: "Camiseta Básica",
      price: 59.9,
      imageUrl: "https://example.com/camiseta.jpg",
    },
    total: 119.8,
    quantity: 2,
    user: {
      name: 'true',
    },
  },
  {
    product: {
      name: "Tênis Esportivo",
      price: 249.9,
      imageUrl: "https://example.com/tenis.jpg",
    },
    total: 249.9,
    quantity: 1,
    user: {
      name: 'jose',
    },
  },
  {
    product: {
      name: "Notebook Gamer",
      price: 4999.99,
      imageUrl: "https://example.com/notebook.jpg",
    },
    total: 4999.99,
    quantity: 1,
    user: {
      name: 'maria',
    },
  },
  {
    product: {
      name: "Fone de Ouvido Bluetooth",
      price: 199.9,
      imageUrl: "https://example.com/fone.jpg",
    },
    total: 399.8,
    quantity: 2,
    user: {
      name: 'estevao',
    },
  },
  {
    product: {
      name: "Smartwatch",
      price: 899.9,
      imageUrl: "https://example.com/smartwatch.jpg",
    },
    total: 899.9,
    quantity: 1,
    user: {
      name: 'suellen',
    },
  },
];

type Datas = {
  datas:GetStoreDashboard[],
  status:number
}
export const AdminStore= () => {
  const [dashboard,setDashboard] = useState<Datas>({datas:[],status:0})
  useEffect(()=>{
    usableFetch<GetStoreDashboard[],{}>({
      setDatas:setDashboard,
      service:storeDashboardService,
      body:{},
      
    })
  },[])
  return (
    <ContainerDashboard sidebarMenuItems={selectMenuItem("Dashboard")} storeName="SuperStore">
      <Box>
          <Controls>
              <DashboardStats orders={{cancelled:500,completed:500,pending:500}} views={{total:500}}/>
          </Controls>
          {dashboard.datas[0]?.orders.lastPending.length > 0 && (
            <>
              <h3>Ordens pendentes</h3>
              <LastPendingOrders products={productOrdersMock} />
            </>
          )}

      </Box>
    </ContainerDashboard>
  )
}

export default AdminStore
