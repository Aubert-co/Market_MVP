import type { Product } from "@/types/products.types";
import styled from "styled-components";







const Table = styled.table`
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
  }
`;


type Props = {
  products:Product[]
}
export const ProductTable = ({products}:Props) => {
  
  return (
      <Table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.imageUrl} width="40" height="40" alt={p.name} />
                {p.name}
              </td>
              <td>{p.category}</td>
              <td>R$ {p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    
  );
};
