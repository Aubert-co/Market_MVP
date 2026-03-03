import { PanelHeader,CloseButton } from "@/styles/shared.style";
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

`;


type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: (option:OpenSideBarOuDrawer) => void
  title:string
}

export const Drawer = ({ children, isOpen, onClose, title }: Props) => {
  const titleId = `drawer-title-${title?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <StyleDrawer
      $open={isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      hidden={!isOpen}
    >
      <PanelHeader>
        <h3 id={titleId}>{title}</h3>

        <CloseButton
          onClick={() => onClose(null)}
          aria-label={`Fechar ${title}`}
        >
          &times;
        </CloseButton>
      </PanelHeader>

      {children}
    </StyleDrawer>
  );
};