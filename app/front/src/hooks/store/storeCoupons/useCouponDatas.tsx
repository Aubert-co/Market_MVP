import { useEffect, useState } from "react";
import {  usableFetchWithPages } from "@/services/fetchs";
import { getStoreCoupons, type StoreCoupons } from "@/services/store/couponAdmin.service";
import type { BaseCoupon } from "@/types/coupons.types";
import type { FilterCoupons } from "@/types/filters.types";
import type { SetPages } from "@/types/services.types";

type Coupom = BaseCoupon<number>

type State= {
  datas:Coupom[],
  message:string,
  status:number,
}
type ReturnCouponsDatas = {
  coupons:Coupom[],
  status:number
}
type Props = {
  nextPage:{currentPage:number},
  couponStatus:FilterCoupons
  setPagesInfos:SetPages
}
export const useCouponDatas = ({setPagesInfos,nextPage,couponStatus}:Props):ReturnCouponsDatas=>{
  const [coupons,setCoupons] = useState<State>({
      datas:[],status:0,message:''
    })
    useEffect(()=>{
      usableFetchWithPages<Coupom[],StoreCoupons>({
        setDatas:setCoupons,
        service:getStoreCoupons,
        setPages:setPagesInfos,
        body:{nextPage:nextPage.currentPage,couponStatus}
      })
    },[nextPage.currentPage,couponStatus])
    return {coupons:coupons.datas,status:coupons.status}
}