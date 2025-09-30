import type { SideBarItem } from "@/types/storeDashboard.types"
import { FaBox, FaClipboardList, FaTags, FaUsers } from "react-icons/fa"

export const sideBarMenuItems:SideBarItem[] = [
  { label: "Dashboard", icon: <FaBox />, isActive: false, linkTo: "/loja" },
  { label: "Produtos", icon: <FaClipboardList />, isActive: true, linkTo: "/loja/produtos" },
  { label: "Cupons", icon: <FaTags />, isActive: false, linkTo: "/loja/cupons" },
  { label: "Pedidos", icon: <FaUsers />, isActive: false, linkTo: "/loja/pedidos" },
]

type Label = "Dashboard" | "Produtos" | "Cupons" | "Pedidos" | "Configurações"
export const selectMenuItem = (label:Label)=>{
    return sideBarMenuItems.map((val)=>{
        val.isActive = false
        if(val.label === label){
            val.isActive = true
        }
        return val
    })
}