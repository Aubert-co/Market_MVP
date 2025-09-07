import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { MostViewedProductBox } from "@/components/store/boxMostViewd"
import { FaBox, FaClipboardList, FaTags, FaUsers } from "react-icons/fa"


export const sideBarMenuItems =  [
  { label: "Dashboard", icon: <FaBox />,isActive:true ,linkTo:"/loja"},
  { label: "Produtos", icon: <FaClipboardList />,isActive:false,linkTo:"/loja/produtos" },
  { label: "Cupons", icon: <FaTags /> ,isActive:false,linkTo:"/loja/cupons"},
  { label: "Pedidos", icon: <FaUsers />,isActive:false,linkTo:"/loja/pedidos" },
  { label: "Configurações",isActive:false ,linkTo:"/loja/configs"}
] 

export const AdminStore= () => {

  return (
      <ContainerDashboard sidebarMenuItems={sideBarMenuItems} storeName="SuperStore">
         <MostViewedProductBox/>
      </ContainerDashboard>
           
     
  )
}

export default AdminStore
