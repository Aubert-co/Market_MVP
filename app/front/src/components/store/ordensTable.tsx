import { Table } from "@/styles/dashboardStore.style";
import type { Order } from "@/types/storeDashboard.types";
import  {getLocalDate, getOrderStatus} from  "@/utils/index"
import { BaseTable } from "../templates/baseTable";
import { loadImage } from "@/utils/index";


type Props = {
  orders:Order[]
}
export const Theader = ()=>{
    const values = ["Produto","Status","Total","Criada em"]
    return values.map((val,ind)=><th key={ind}>{val}</th>)
}

export const TbodyOrders = ({orders}:Props)=>{
    if(!orders)return;
    return orders.map((val)=>{
        const createdAt = getLocalDate(val.createdAt)
        const status = getOrderStatus(val.status)
        return(
            <tr key={val.id}>
               <td data-label="Produto">
                <img src={loadImage(val.product.imageUrl)} alt={val.product.name} />
                {val.product.name}
                </td>
                <td data-label="Status">{status}</td>
                <td data-label="Total">R$ {val.total.toFixed(2)}</td>
                <td data-label="Criado em">{createdAt}</td>

            </tr>
        )
    })
}
export const OrdersTable = ({orders}:Props) => {
  
  return (
      <Table>
            <BaseTable  thead={<Theader/>} tbody={<TbodyOrders orders={orders}/>}/>
      </Table>
    
  );
};
