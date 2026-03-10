import type React from "react"
import { StoreDashboard } from "@/styles/dashboardStore.style"


type Props={
    children:React.ReactNode,
    isSidebarOpen:boolean,
}

export const ContainerDashboard = ({children,isSidebarOpen
}:Props)=>{
    
    return(
        <StoreDashboard $open={isSidebarOpen}>
            {children}
        </StoreDashboard>
    )
}