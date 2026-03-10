import { CloseButton, PanelHeader } from "@/styles/shared.style";
import { useCallback, useEffect, useState, type ReactNode } from "react";;
import styled from "styled-components";


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);  
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  backdrop-filter: blur(4px);       
`;

const Container = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideDown 0.25s ease-out;
  
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const Content = styled.div`
  padding: 24px;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
`;




type ModalProps = {
  title: string;
  children: ReactNode;
};


export function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);
    const openModal = useCallback(()=>{
        setIsOpen(true);
    },[])
    const Modal = ({  title, children }: ModalProps) =>{
    useEffect(() => {
        function handleEsc(event: KeyboardEvent) {
        if (event.key === "Escape") onClose();
        }

        if (isOpen) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        }

        return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
       <Overlay
          onClick={onClose}
          role="presentation"
        >
          <Container
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <PanelHeader>
              <h2 id="modal-title">{title}</h2>

              <CloseButton
                onClick={onClose}
                aria-label="Fechar modal"
              >
                &times;
              </CloseButton>
            </PanelHeader>

            <Content>{children}</Content>
          </Container>
        </Overlay>
    );
    }
  return {
  
    Modal,
    onClose,
    openModal
  };
}