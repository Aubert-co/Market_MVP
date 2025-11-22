import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

type Props = {
  title: string;
  children: React.ReactNode;
};


const CollapseContainer = styled.div`

  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
  background: #fff;
  overflow: hidden;
  width:90%;
  max-width:700px;

.collapse-container {
  width: 85%;
  background: #ffffff; 
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  transition: all 0.3s ease;
}


.collapse-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  cursor: pointer;
  background: #fafafa;
  transition: background 0.3s ease;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.collapse-header:hover {
  background: #fff3e6; 
}

.collapse-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333; 
  letter-spacing: 0.2px;
}

.collapse-header span {
  display: flex;
  align-items: center;
  color: #ff7a00;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}


.collapse-body {
  padding: 16px 18px;
  background: #ffffff;
  color: #444;
  font-size: 0.95rem;
  animation: fadeIn 0.3s ease;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

`
export const Collapse = ({ title, children }:Props) => {
  const [open, setOpen] = useState(false);

  return (
    <CollapseContainer className="collapse-container">
      <div
        className="collapse-header"
        onClick={() => setOpen(!open)}
      >
        <h3>{title}</h3>
        
      <span>
        {open ? <FaChevronUp data-testid="up"/> : <FaChevronDown data-testid="down"/>}
      </span>
      
      </div>

      {open && (
        <div className="collapse-body">
          {children}
        </div>
      )}
    </CollapseContainer>
  );
};
