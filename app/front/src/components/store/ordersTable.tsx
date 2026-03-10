import type { Order } from "@/types/storeDashboard.types";
import  {getLocalDate, getOrderStatus} from  "@/utils/index"
import { BaseTable } from "../templates/baseTable";
import { loadImage } from "@/utils/index";
import { RenderDataState } from "../shared/renderDataState";
import { TableSkeleton } from "../templates/tableSkeleton";
import { CompactButton } from "@/styles/shared.style";
import { StatusBadge } from "./listOrderDetail";


type TableType = "mini_table" | "table";

type PropsTbody = {
  orders:Order[]
  typeTable:TableType
  openModal?:(order:Order[])=>void

}
type Props = PropsTbody &{ 
  status:number
  
}
type PropsTheader = {
  typeTable: TableType;
};

const TABLE_HEADERS: Record<TableType, string[]> = {
  mini_table: ["Produto", "Status", "Total", "Criada em"],
  table: ["Produto", "Status", "Total", "Criada em", "Ações"],
};

export const Theader = ({ typeTable }: PropsTheader) => {
  return (
    <>
      {TABLE_HEADERS[typeTable].map((label) => (
        <th key={label}>{label}</th>
      ))}
    </>
  );
};



export const TbodyOrders = ({orders,typeTable,openModal}:PropsTbody)=>{
    
    return orders.map((val)=>{
        const createdAt = getLocalDate(val.createdAt)
        const status = getOrderStatus(val.status)
        return(
            <tr key={val.id}>
               <td data-label="Produto">
                <img src={loadImage(val.product.imageUrl)} alt={val.product.name} />
                {val.product.name}
                </td>
                <td data-label="Status">
                    <StatusBadge $status={val.status}>{status}</StatusBadge>
                </td>
                <td data-label="Total">R$ {val.total.toFixed(2)}</td>
                <td data-label="Criado em">{createdAt}</td>
                {typeTable === "table" && (
                      <td >
                        <CompactButton 
                          aria-label={`Abrir detalhes do pedido ${val.id}`} 
                          onClick={()=>openModal?.([val])}>...</CompactButton>
                      </td>
                )}
            </tr>
        )
    })
}
export const OrdersTable = ({orders ,typeTable,openModal,status}:Props) => {
  return (
    <RenderDataState<Order>
      emptyMessage="Nenhum pedido encontrado."
      errorMessage="Erro ao carregar os pedidos. Tente novamente."
        datas={orders}
        status={status}
        skeleton={
            <TableSkeleton/>
        }
        >
      
            <BaseTable  thead={
            <Theader 
            typeTable={typeTable}/>} 
            tbody={
                <TbodyOrders
                typeTable={typeTable} 
                orders={orders}
                openModal={openModal}
                />
            }/>

    </RenderDataState>
  )
};
