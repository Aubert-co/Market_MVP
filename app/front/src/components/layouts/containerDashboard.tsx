import type React from "react"
import { useState } from "react"
import Sidebar from "../sidebar"
import { StoreDashboard } from "@/styles/dashboardStore.style"
import type { MenuItem } from "@/types/admStore.types"
type Props={
    children:React.ReactNode,
    sidebarMenuItems:MenuItem[],
    storeName:string
}
export const ContainerDashboard = ({children,sidebarMenuItems,storeName}:Props)=>{
    const [ isOpenSideBar,setIsOpenSidebar] = useState(false)
    return(
        <StoreDashboard $open={isOpenSideBar}>
            <Sidebar storeName={storeName} isOpen={isOpenSideBar} setOpen={setIsOpenSidebar} items={sidebarMenuItems}/>
            <main>
                {children}
            </main>
        </StoreDashboard>
    )
}