import { useCallback, useEffect, useState, type ReactNode } from "react";;
import styled from "styled-components";
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Container = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  padding: 16px 20px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
`;

const Content = styled.div`
  padding: 20px;
`;

type ModalProps = {
  title?: string;
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
        <Overlay onClick={onClose}>
        <Container onClick={(e) => e.stopPropagation()}>
            {title && <Header>{title}</Header>}
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