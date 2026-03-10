import { Toggle } from "./toggle"
import { SiderStyle } from "@/styles/dashboardStore.style"
import type { SideBarItem } from "@/types/storeDashboard.types"
import { Link } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa";



type SidebarProps = {
  items: SideBarItem[],
  storeName:string,
  isOpen:boolean,
  setOpen:(param:"sidebar" | null)=>void
}


const Sidebar = ({ items, storeName, setOpen, isOpen }: SidebarProps) => {
  return (
    <>
      <Toggle isOpen={isOpen} setOpen={setOpen} />

      <SiderStyle
        $open={isOpen}
        role="navigation"
        aria-label="Menu da loja"
      >
        <div className="store-logo">
          <h3>{storeName}</h3>
        </div>

        <div className="items-sidebar">
          <ul className="menu">
            {items.map((item, index) => (
              <Link
                data-testid="sidebar-link"
                key={index}
                to={item.linkTo}
                style={{ outline: "none", textDecoration: "none" }}
                aria-current={item.isActive ? "page" : undefined}
              >
                <li
                  className={`menu-item ${item.isActive ? "active" : ""}`}
                  onClick={item.onClick}
                >
                  <span className="icon-wraper" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="item-label">{item.label}</span>
                </li>
              </Link>
            ))}
          </ul>

          <div className="end-menu">
            <div
              className="menu-item"
              role="button"
              tabIndex={0}
              aria-label="Sair"
            >
              <span className="icon-wraper" aria-hidden="true">
                <FaSignOutAlt />
              </span>
              <span className="item-label">Sair</span>
            </div>
          </div>
        </div>
      </SiderStyle>
    </>
  );
};

export default Sidebar
