import styled from "styled-components";

const Box = styled.div`
  background: #1e293b; /* tom moderno, escuro */
  color: #f8fafc; /* texto claro */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  .box-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: #94a3b8;
  }

  .box-value {
    font-size: 1.4rem;
    font-weight: bold;
    color: #f1f5f9;
  }

  .box-sub {
    font-size: 0.9rem;
    margin-top: 6px;
    color: #38bdf8; /* azul moderno para destaque */
  }
`;

// Exemplo de uso
export const MostViewedProductBox = () => {
  return (
    <Box>
      <div className="box-title">Produto mais visto</div>
      <div className="box-value">Tênis Nike Air</div>
      <div className="box-sub">1200 visualizações</div>
    </Box>
  );
};
