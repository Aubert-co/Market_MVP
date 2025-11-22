import type React from "react"
import { useState } from "react"
import Sidebar from "../shared/sidebar"
import { StoreDashboard } from "@/styles/dashboardStore.style"
import type { SideBarItem } from "@/types/storeDashboard.types"

type Props={
    children:React.ReactNode,
    sidebarMenuItems:SideBarItem[],
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