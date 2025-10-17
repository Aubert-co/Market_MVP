import { usableFetch } from "@/services/fetchs";
import { userCoupons } from "@/services/userProfile.services";
import { CouponContainer } from "@/styles/checkout.style";
import type { BaseCoupon } from "@/types/coupons.types";
import { useEffect, useState, type SetStateAction } from "react"


type StateCoupon = {
  datas:BaseCoupon<number>[],
  status:number
}
type Props = {
  setCoupon:React.Dispatch<SetStateAction< {item:BaseCoupon<number> } >>,
}

export const SelectCoupon = ({setCoupon}:Props)=>{
    const [ coupons  ,setStateCoupons] = useState<StateCoupon>({datas:[],status:0})
    useEffect(()=>{
        usableFetch<BaseCoupon<number>[],{}>({
          setDatas:setStateCoupons,
          service:userCoupons,
          body:{}
        })
    
    },[])
    const onSelectCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = Number(e.target.value);
      const selectedCoupon = coupons.datas.find(c => c.id === selectedId);
      if(selectedCoupon)setCoupon({item:selectedCoupon})
    
    };
     return (
        <CouponContainer>
        <label htmlFor="coupon">Selecionar Cupom</label>
        <select onChange={onSelectCoupon} data-testid="select-coupon" id="coupon" defaultValue="">
           <option value="" disabled>
            Selecione um cupom
          </option>
            {coupons.datas?.length === 0 ? (
                <option value="" disabled>
                Nenhum cupom disponível
                </option>
            ) : (
                coupons.datas.map((coupon) => (
                <option key={coupon.id} value={coupon.id}>
                    {coupon.code}
                </option>
                ))
            )}
        </select>

        </CouponContainer>
  );
}