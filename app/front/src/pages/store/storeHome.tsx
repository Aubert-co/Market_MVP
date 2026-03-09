import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import Sidebar from "@/components/shared/sidebar"
import { DashboardHeader } from "@/components/store/dashboardHeader"
import { DashboardStats } from "@/components/shared/dashboardStats"
import { OrdersTable } from "@/components/store/ordersTable"
import { selectMenuItem } from "@/constants/menuItems"
import { useSideBarOrDrawer } from "@/hooks/useSidebarOrDrawer"
import { Box } from "@/styles/dashboardStore.style"
import { SectionHeader } from "@/components/shared/sectionHeader"
import { Card, Grid } from "@/styles/shared.style"
import { TopVisitedProducts } from "@/components/store/topVisitedProducts"  
import { Link } from "react-router-dom"
import { useStoreLastOrders } from "@/hooks/store/useStoreHome"
import { useMostVisitedProducts } from "@/hooks/store/useMostVisitedProducts"
import { useDashboardStats } from "@/hooks/store/useDashboardStas"


export const StoreHome= () => {

  const {setIsOpen,isOpen} = useSideBarOrDrawer()
  const {mostVisited,status:statusMostVisited} = useMostVisitedProducts()
  const {orders,status} = useStoreLastOrders()
  const {stats} = useDashboardStats()

  return (
    <ContainerDashboard  isSidebarOpen={isOpen==="sidebar"}>
      <Sidebar storeName="test"
        isOpen={isOpen === "sidebar"}
        items={selectMenuItem("Dashboard")}
        setOpen={setIsOpen}
        />
      <main>
        <DashboardHeader 
          title="Dashboard"
          subTitle="Acompanhe o desempenho da sua loja e 
          visualize os principais indicadores em tempo real."
          />

          <Box>
              <DashboardStats stats={stats}/>
          </Box>

        
         <Box>
          <Grid>
            <Card>
              <SectionHeader title="Últimas Ordens" 
                action={<Link to={"/loja/pedidos"}>ver mais</Link>}/>
                
              <OrdersTable status={status} typeTable="mini_table" orders={orders} />
            </Card>

            <Card>
              <SectionHeader title="Produtos mais visitados no mês" 
                action={<Link to={"/loja/produtos"}>ver mais</Link>}
              />
              <TopVisitedProducts products={mostVisited} status={statusMostVisited}/>
            </Card>
          </Grid>
        </Box>

      </main>

    </ContainerDashboard>
  )
}


