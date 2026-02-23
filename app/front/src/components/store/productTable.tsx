import type { Product } from "@/types/products.types";
import { BaseTable } from "../templates/baseTable";
import { loadImage } from "@/utils/index";
import { CompactButton } from "@/styles/shared.style";


type Props = {
  products:Product[],
  openModal:(product:Product[])=>void
}
const Theader = ()=>{
  const values = ["Produto","Categoria","Preço","Estoque","Ações"]
  return values.map((val,ind)=><th key={ind}>{val}</th>)
}

const Tbody = ({products,openModal}:Props)=>{
  if(!products)return;
  return products.map((p) => (
      <tr key={p.id}>
        <td data-label="Produto">
          <img src={loadImage(p.imageUrl)} width="40" height="40" alt={p.name} />
          {p.name}
        </td>
        <td data-label="Categoria">{p.category}</td>
        <td data-label="Preço">R$ {p.price.toFixed(2)}</td>
        <td data-label="Estoque">{p.stock}</td>
        <td>
          <CompactButton 
          aria-label={`Abrir modal do produto ${p.name}`}
          onClick={()=>openModal([p])
          }>...
          </CompactButton>
        </td>
      </tr>
    ))
}
export const ProductTable = ({products,openModal}:Props) => {
  
  return (
      <BaseTable 
        thead={<Theader/>}
        tbody={<Tbody products={products} openModal={openModal}/>}
      />
  );
};
