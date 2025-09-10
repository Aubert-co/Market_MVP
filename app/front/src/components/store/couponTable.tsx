import type { BaseCoupon } from "@/types/coupons.types";
import CouponAsset from '@/assets/coupon.png'
import { BaseTable } from "../baseTable";
import { getLocalDate } from "@/utils";


type Props = {
  coupons:BaseCoupon<number>[]
}
const Theader = ()=>{
  const values = ["Cupom","Desconto","Quantidade","Validade"]
  return values.map((val,ind)=><th key={ind}>{val}</th>)
}
const Tbody = ({coupons}:Props)=>{
  return coupons.map((p) => {
            return(  
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
          )})
}
export const CouponTable = ({coupons}:Props) => {
 
  return (
     <BaseTable
      thead={<Theader/>}
      tbody={<Tbody coupons={coupons}/>}
     />
    
  );
};

