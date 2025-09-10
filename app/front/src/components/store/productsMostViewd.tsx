import type {  ProductView } from "@/types/products.types";
import { BaseTable } from "../baseTable";
import { loadImage } from "@/services";


type Props = {
  products:ProductView[]
}
const Theader = ()=>{
  const values = ["Produto","Visitas","Preço","Estoque"]
  return values.map((val,ind)=><th key={ind}>{val}</th>)
}
const Tbody = ({products}:Props)=>{
  return products.map((p) => (
            <tr key={p.id}>
              <td data-label="Produto">
                <img src={loadImage(p.imageUrl)} width="40" height="40" alt={p.name} />
                {p.name}
              </td>
              <td data-label="Visualizações">{p.views}</td>
              <td data-label="Preço">R$ {p.price.toFixed(2)}</td>
              <td data-label="Estoque">{p.stock}</td>

            </tr>
          ))
}
export const ProductsMovstViewd = ({products}:Props) => {
  
  return (
      <BaseTable 
        thead={<Theader/>}
        tbody={<Tbody products={products}/>}
      />
  );
};
