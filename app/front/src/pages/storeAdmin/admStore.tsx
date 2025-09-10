import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { DashboardStats } from "@/components/store/boxMostViewd"
import { ProductsMovstViewd } from "@/components/store/productsMostViewd"
import { selectMenuItem } from "@/constants/menuItems"
import { Box, Controls } from "@/styles/dashboardStore.style"


export const mockProductViews = [
  {
    id: 1,
    name: "Tênis Nike Air",
    price: 499.9,
    imageUrl: "https://via.placeholder.com/100",
    category: "Calçados",
    stock: 12,
    views: 1200,
  },
  {
    id: 2,
    name: "Camiseta Adidas",
    price: 149.9,
    imageUrl: "https://via.placeholder.com/100",
    category: "Roupas",
    stock: 25,
    views: 950,
  },
  {
    id: 3,
    name: "Boné Puma",
    price: 79.9,
    imageUrl: "https://via.placeholder.com/100",
    category: "Acessórios",
    stock: 30,
    views: 870,
  },
  {
    id: 4,
    name: "Calça Jeans Levis",
    price: 299.9,
    imageUrl: "https://via.placeholder.com/100",
    category: "Roupas",
    stock: 18,
    views: 650,
  },
  {
    id: 5,
    name: "Mochila Herschel",
    price: 399.9,
    imageUrl: "https://via.placeholder.com/100",
    category: "Acessórios",
    stock: 20,
    views: 500,
  },
];
export const AdminStore= () => {

  return (
    <ContainerDashboard sidebarMenuItems={selectMenuItem("Dashboard")} storeName="SuperStore">
        <Box>
            <Controls>
              <DashboardStats/>
            </Controls>
            <h3>Produtos mais vistos</h3>
             <ProductsMovstViewd products={mockProductViews}/>
        </Box>
     
    </ContainerDashboard>
  )
}

export default AdminStore
