import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/hooks/usePagination"
import { OrdersTable } from "@/components/store/ordersTable"
import { selectMenuItem } from "@/constants/menuItems"
import {  Controls } from "@/styles/dashboardStore.style"
import Sidebar from "@/components/shared/sidebar"
import { useSideBarOrDrawer } from "@/hooks/useSidebarOrDrawer"
import { DashboardHeader } from "@/components/store/dashboardHeader"
import  { useStoreOrders } from "@/hooks/store/useOrders"
import { SearchBar } from "@/components/header/seachBar"
import { useSelect } from "@/hooks/useSelect"
import type { Order, OrderStatus } from "@/types/storeDashboard.types"
import { useModal } from "@/hooks/useModal"
import { ListOrderDetail } from "@/components/store/listOrderDetail"
import { useState } from "react"
import { useSearch } from "@/hooks/useSearch"
import { getStorageStore } from "@/storage/store.storage"
import { useUrlParams } from "@/hooks/store/storeProduct/useUrlParams"
import { ORDER_STATUS_OPTIONS } from "@/constants/filters"


type State ={
  datas:Order[]
}
  
export const StoreOrders = ()=>{
    const {changePage,changeUrlOrderStatus} = useUrlParams()
    const [ordersModal,setOrdersModal ] = useState<State>({
      datas:[]
    })
    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage)
    const {Select,selected} = useSelect<OrderStatus>({
      datas:ORDER_STATUS_OPTIONS,
      text: "Selecione o status do pedido",
      className:"select-status",
      name:"input-select",
      cbSelected:changeUrlOrderStatus
    })
    const {searchEvent,searchProduct:searchOrder} = useSearch({mode:'update'})
    const {orders,status} = useStoreOrders({setPagesInfos,orderStatus:selected,nextPage:pageInfos.currentPage,search:searchOrder})
    const {setIsOpen,isOpen} = useSideBarOrDrawer()
    const {Modal:ModalShowOrder,openModal} = useModal()
    
    const showOrdersModal = (datas:Order[])=>{
      openModal()
      setOrdersModal({datas})
    }
    const openStates = {
      sidebar: isOpen === "sidebar",
      drawer: isOpen === "drawer",
    } 
    const store = getStorageStore()
    return (
        <ContainerDashboard isSidebarOpen={openStates.sidebar}>
          <Sidebar storeName={store.name}
            isOpen={openStates.sidebar}
            items={selectMenuItem("Pedidos")}
            setOpen={setIsOpen}
            />
          
          <main>
           <DashboardHeader
              title="Pedidos"
              subTitle="Gerencie e acompanhe todos os pedidos da sua loja"
            />
              <Controls>
                <SearchBar searchEvent={searchEvent}/>
                <Select />
              </Controls>
              
              <OrdersTable openModal={showOrdersModal} status={status} typeTable="table" orders={orders}/>
              <Pagination />

            <ModalShowOrder title="Detalhes da ordem">
                <ListOrderDetail order={ordersModal.datas}/>
            </ModalShowOrder>
          </main>
        </ContainerDashboard>
    )
}