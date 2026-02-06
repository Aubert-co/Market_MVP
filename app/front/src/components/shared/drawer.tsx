import type { OpenSideBarOuDrawer } from "@/types/storeDashboard.types"
import styled from "styled-components"




const StyleDrawer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;

  width: 380px;
  max-width: 100%;
  height: 100vh;

  background-color: #ffffff;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: -12px 0 24px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;

  z-index: 1000;

  transform: ${({ $open }) =>
    $open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;

  overflow-y: auto;

  .drawer-close {
    align-self: flex-end;
    margin: 12px;
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
  }
`;


type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: (option:OpenSideBarOuDrawer) => void
}

export const Drawer = ({ children, isOpen, onClose }: Props) => {
  return (
    <StyleDrawer $open={isOpen}>
      <button className="drawer-close" onClick={()=>onClose(null)}>
        x
      </button>

      {children}
    </StyleDrawer>
  )
}
