import type {  Stat } from "@/types/storeDashboard.types";
import styled from "styled-components";


type Props = {
  stats:Stat[]
}


export const DashboardStats = ({stats}:Props) => {
  return (
    <Container>
      {
      stats.map((stat) => {
        const Icon = stat.icon
        return (
        <Card key={stat.id}>
          <BoxIcon>
            <Icon/>
          </BoxIcon>
          <strong>{stat.value}</strong>
          <h3>{stat.label}</h3>
        </Card>
        )})
      }
    </Container>
  );
};

export const BoxIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;

  svg {
    font-size: 20px;
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 18px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
  transition: all 0.25s ease;
    gap:16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
    border-color: #dbe3f0;
  }

  h3 {
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin: 0 0 12px 0;
  }

  strong {
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  p {
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
  }
`;

