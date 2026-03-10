import styled from "styled-components";

export const PanelHeader = styled.div`
  padding: 18px 24px;
  font-weight: 700;
  font-size: 1.2rem;
  color: #222;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;
type BtnProps = {
  $bg?: string;
  $hoverBg?: string;
  $color?: string;
};
export const PrimaryButton = styled.button<BtnProps>`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $bg }) => $bg || '#007BFF'};
  color: ${({ $color }) => $color || 'white'};
  transition: background 0.3s;
  &:hover {
    background: ${({ $hoverBg }) => $hoverBg || '#0056b3'};
  }
`;

export const CompactButton = styled.button`
   display: inline-block;
  padding: 0.4rem 1rem;
  font-size: 0.875rem; 
  font-weight: 500;
  color: #ffffff;
  background-color: #0070f3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #005bb5;
    transform: translateY(-1px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`
export const SmallImage  =styled.img`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`
export const ButtonsDiv = styled.div`
  display: flex;         
  justify-content:center;
  gap: 10px;            
  margin-top: 20px;        
  flex-wrap: wrap;          
`;