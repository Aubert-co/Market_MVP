import type { OpenSideBarOuDrawer } from "@/types/storeDashboard.types"
import { useState } from "react"

export const useSideBarOrDrawer = ()=>{
    const [isOpen,setIsOpen] = useState<OpenSideBarOuDrawer>(null)
    return {
        isOpen,
        setIsOpen
    }
}