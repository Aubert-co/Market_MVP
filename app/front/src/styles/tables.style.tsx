import styled from "styled-components"


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background-color: #ffffff;

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
    color: #334155;
  }

  th {
    background-color: #f8fafc;
    color: #0f172a;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f1f5f9;
  }

  img {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin-right: 8px;
    vertical-align: middle;
    max-width: 50px;
    max-height:50px;
    object-fit:cover;
  }


@media (max-width: 768px) {
  thead {
    display: none; 
  }

  tr {
    display: flex;
    flex-direction: column;
    align-items: center; 
    margin: 0 auto 20px auto;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    width: 60%;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
  }

  td {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 0;
    border: none;
    width: 100%;
    
  }

  td[data-label="Imagem"] {
    margin-bottom: 12px;
  }

  td[data-label="Imagem"] img {
    max-width: 140px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  td::before {
    content: attr(data-label);
    font-weight: 600;
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 4px;
  }

  td:last-child {
    border-bottom: none;
  }
  td img {
    max-width: 180px; 
    height: auto;    
    max-height:100px;
    margin-bottom: 12px;
  }
}

`