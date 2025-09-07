import { FaBars } from "react-icons/fa"
import styled from "styled-components"

type Props = {
  isOpen:boolean,
  setOpen:(params:boolean)=>void
}

const ToggleButton = styled.button<{$open:boolean}>`
  position: fixed;
  top: 16px;
  left: ${({ $open }) => ($open ? "200px" : "16px")};
  transition: left 0.3s ease-in-out;
  background: ${({ $open }) => ($open ? "#dc2626" : "#1e293b")};
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1100;
`
export const Toggle = ({isOpen,setOpen}:Props)=>{
  if(isOpen)return(
    <ToggleButton $open={isOpen} onClick={()=>setOpen(false)}>
      X
    </ToggleButton>

  );
  return (
       <ToggleButton $open={isOpen} onClick={()=>setOpen(true)}>
        <FaBars/>
    </ToggleButton>
  
  )
  
}