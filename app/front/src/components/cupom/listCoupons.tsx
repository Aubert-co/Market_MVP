import type { BaseCoupon } from "@/types/coupons.types";
import assets from '@/assets/coupon.png'
import type { SetStateAction } from "react"
import type { Message } from "../boxMessages"
import { AddCoupon } from "./AddCoupon";



type Props = {
  datas:BaseCoupon<number>[],
 setMessage: React.Dispatch<SetStateAction<Message>>
}
export const ListCoupons = ({ datas,setMessage }: Props) => {
  return (
 
      <>
      {datas.map((val) => (
        <div key={val.id} className="coupon-item">
          <img
            src={assets}
            alt={`Cupom ${val.code}`}
            className="coupon-image"
          />
          <div className="coupon-details">
            <div><strong>Código:</strong> {val.code}</div>
            <div><strong>Quantidade:</strong> {val.quantity}</div>
            <div>
              <strong>Desconto:</strong> {val.discount}
              {val.discountType === "percent" ? "%" : " R$"}
            </div>
            <div>
              <strong>Expira em:</strong>{" "}
              {new Date(val.expiresAt).toLocaleDateString("pt-BR")}
            </div>
            </div>
            <AddCoupon id={val.id} setMessage={setMessage}/>
        </div>
      ))}
      </>

  );
};
