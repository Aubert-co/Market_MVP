import type { BaseCoupon } from "@/types/coupons.types";
import CouponAsset from '@/assets/coupon.png'
import { BaseTable } from "../templates/baseTable";
import { getLocalDate } from "@/utils";
import { RenderDataState } from "../shared/renderDataState";
import { TableSkeleton } from "../templates/tableSkeleton";

type Coupom = BaseCoupon<number>

type Props = {
  coupons:Coupom[]
  status:number
}


const Theader = ()=>{
  const values = ["Cupom","Desconto","Quantidade","Validade"]
  return values.map((val,ind)=><th key={ind}>{val}</th>)
}
type TbodyProps = {
  coupons:Coupom[]
}
const Tbody = ({coupons}:TbodyProps)=>{
  return coupons.map((p) => 
  <tr key={p.id}>
      <td data-label="Cupom">
          <img src={CouponAsset} width="40" height="40" alt={p.code} />
          {p.code}
        </td>
        <td data-label="Desconto">
          {p.discount}{p.discountType === "fixed" ? " R$" : "%"}
        </td>
        <td data-label="Quantidade">{p.quantity}</td>
        <td data-label="Validade">{getLocalDate(p.expiresAt)}</td>
    </tr>
  )
}

export const CouponTable = ({coupons,status}:Props) => {
  return (
    <RenderDataState<Coupom>
      datas={coupons}
      status={status}
      emptyMessage={"testing"}
      errorMessage="algo deu errado"
      skeleton={<TableSkeleton/>}
      >
      
      <BaseTable
        thead={<Theader/>}
        tbody={<Tbody coupons={coupons}/>}
      />

    </RenderDataState>
   
    
  );
};

