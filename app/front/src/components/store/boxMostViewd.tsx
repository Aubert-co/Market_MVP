import styled from "styled-components";

const SmallBox = styled.div`
  background: #e2e8f0; /* cinza azulado claro */
  color: #1e293b; /* texto escuro para contraste */
  padding: 14px;
  border-radius: 10px;
  width: 160px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  

  .box-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #2563eb; /* azul moderno (não tão chamativo) */
  }

  .box-label {
    font-size: 0.85rem;
    color: #334155; /* cinza-azulado escuro */
  }
`;

// Mock de dados (poderia vir do backend futuramente)
const dashboardStats = [
  { value: "R$ 12.450", label: "Total vendido este mês" },
  { value: "32", label: "Ordens concluídas este mês" },
  { value: "5", label: "Ordens canceladas este mês" },
  { value: "8", label: "Ordens em aberto" },
];

// Componente que renderiza os boxes
export const DashboardStats = () => {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {dashboardStats.map((stat, index) => (
        <SmallBox key={index}>
          <div className="box-value">{stat.value}</div>
          <div className="box-label">{stat.label}</div>
        </SmallBox>
      ))}
    </div>
  );
};

