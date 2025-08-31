import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

type Props = {
  title: string;
  children: React.ReactNode;
};


const CollpaseContainer = styled.div`

  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
  background: #fff;
  overflow: hidden;
  width:90%;
  max-width:700px;

.collapse-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  cursor: pointer;
}

.collapse-body {
  padding: 12px;
  background: #fafafa;
}

`
export const Collapse = ({ title, children }:Props) => {
  const [open, setOpen] = useState(false);

  return (
    <CollpaseContainer>
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
    </CollpaseContainer>
  );
};
