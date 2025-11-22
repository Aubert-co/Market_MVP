import { Toggle } from "./toggle"
import { SiderStyle } from "@/styles/dashboardStore.style"
import type { SideBarItem } from "@/types/storeDashboard.types"
import { Link } from "react-router-dom"




type SidebarProps = {
  items: SideBarItem[],
  storeName:string,
  isOpen:boolean,
  setOpen:(param:boolean)=>void
}


const Sidebar = ({ items,storeName ,setOpen,isOpen}:SidebarProps) => {
  return (
    <>
      <Toggle isOpen={isOpen} setOpen={setOpen} />

        <SiderStyle $open={isOpen}>
        <div className="store-logo">
          <h3>{storeName}</h3>
        </div>
        <ul className="menu">
          {items.map((item, index) => (
            <Link data-testid="sidebar-link" key={index} to={item.linkTo} style={{ outline: "none", textDecoration: "none" }}>
              <li  className={`menu-item ${item.isActive ? "active" : ""}`} onClick={item.onClick}>
                <span className="icon-wraper">{item.icon}</span>
                <span className="item-label">{item.label}</span>
              </li>
            </Link>
          ))}
         
        </ul>
      </SiderStyle>
   
    </>
  )
}

export default Sidebar
