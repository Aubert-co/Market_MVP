import styled from "styled-components";

const SmallBox = styled.div`
  background: linear-gradient(
    180deg,
    #f8fafc 0%,
    #e2e8f0 100%
  );
  color: #0f172a;

  padding: 16px 18px;
  border-radius: 14px;
  width: 160px;
  text-align: left;

  border: 1px solid rgba(15, 23, 42, 0.06);

  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 16px 32px rgba(0, 0, 0, 0.08);
    border-color: rgba(37, 99, 235, 0.3);
  }

  .box-value {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
    color: #2563eb;
  }

  .box-label {
    margin-top: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #475569;
  }
`;




type Props = {
  orders:{
    completed:number,
    pending:number,
    cancelled:number
  },
  views:{
    total:number 
  }
}
export const DashboardStats = ({orders,views}:Props) => {
 
 const { completed = 0, cancelled = 0, pending = 0 } = orders || {};
  const { total = 0 } = views || {};

  const dashboardStats = [
    { value: completed, label: "Pedidos completados" },
    { value: cancelled, label: "Pedidos cancelados" },
    { value: pending, label: "Pedidos pendentes" },
    { value: total, label: "Total de visualizações" }
  ];

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap",justifyContent:"center" }}>
      {dashboardStats.map((stat, index) => (
        <SmallBox key={index}>
          <div className="box-value">{stat.value}</div>
          <div className="box-label">{stat.label}</div>
        </SmallBox>
      ))}
    </div>
  );
};

