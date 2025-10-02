import { BaseTable } from "../baseTable";
import { loadImage } from "@/utils/index";
import type { ProductOrder } from "@/types/storeDashboard.types";

type Props = {
  products: ProductOrder[];
};

const Theader = () => {
  const values = ["Produto", "Quantidade", "Total", "Cliente"];
  return values.map((val, ind) => <th key={ind}>{val}</th>);
};

const Tbody = ({ products }: Props) => {
  return products.map((p, ind) => (
    <tr key={ind}>
      <td data-label="Produto">
        <img src={loadImage(p.product.imageUrl)} width="40" height="40" alt={p.product.name} />
        {p.product.name}
      </td>
      <td data-label="Quantidade">{p.quantity}</td>
      <td data-label="Total">R$ {p.total.toFixed(2)}</td>
      <td data-label="Cliente">{p.user.name}</td>
    </tr>
  ));
};

export const LastPendingOrders = ({ products }: Props) => {
  return (
    <>
      <h3>Últimos pedidos em aberto</h3>
      <BaseTable
        thead={<Theader />}
        tbody={<Tbody products={products} />}
      />
    </>
  );
};