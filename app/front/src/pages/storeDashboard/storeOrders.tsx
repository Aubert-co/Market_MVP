import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/components/pagination"
import { OrdersTable } from "@/components/store/ordensTable"
import { selectMenuItem } from "@/constants/menuItems"
import { getStoreOrders } from "@/services/admStore.services"
import { usableFetchWithPages } from "@/services/fetchs"
import { Box } from "@/styles/dashboardStore.style"
import type { GetStoreOrders, Order } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"


// Mock de Orders
export const mockOrders: Order[] = [
  {
    id: 1,
    user: "Alice",
    productId: 101,
    product: {
      id: 101,
      name: "Mouse Gamer",
   
      imageUrl: "https://via.placeholder.com/150",
    },
    quantity: 2,
    price: 120,
    total: 240,
    status: "completed",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 dia atrás
    coupon: {

      code: "DESCONTO10",
      discount: 10,
      discountType: "percent",
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 dias
    },
  },
  {
    id: 2,
    user: "Bob",
    productId: 102,
    product: {
      id: 102,
      name: "Teclado Mecânico",
 
      imageUrl: "https://via.placeholder.com/150",
    },
    quantity: 1,
    price: 250,
    total: 250,
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 30, // 30 minutos atrás
  },
  {
    id: 3,
    user: "Carlos",
    productId: 103,
    product: {
      id: 103,
      name: "Headset",
  
      imageUrl: "https://via.placeholder.com/150",
    },
    quantity: 3,
    price: 300,
    total: 900,
    status: "cancelled",
    createdAt: Date.now() - 1000 * 60 * 60 * 48, // 2 dias atrás
  },
];
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