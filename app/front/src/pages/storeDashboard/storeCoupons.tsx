import { FormCreateCoupon } from "@/components/forms/formCreateCoupon"
import { ContainerDashboard } from "@/components/layouts/containerDashboard"

import { CouponTable } from "@/components/store/couponTable"
import { selectMenuItem } from "@/constants/menuItems"
import {  storeGetAvailableCoupons } from "@/services/admStore.services"
import { usableFetch } from "@/services/fetchs"
import { Box } from "@/styles/dashboardStore.style"
import type { BaseCoupon } from "@/types/coupons.types"

import { useEffect, useState } from "react"


type State= {
  datas:BaseCoupon<number>[],
  message:string,
  status:number
}

export const StoreCoupons = ()=>{
    const [coupons,setCoupons] = useState<State>({
      datas:[],status:0,message:''
    })

    useEffect(()=>{
      usableFetch<BaseCoupon<number>[],{}>({
        setDatas:setCoupons,
        service:storeGetAvailableCoupons,
        body:{}
      })
    },[])
    return (
        <ContainerDashboard storeName="StoreName" sidebarMenuItems={selectMenuItem("Cupons")}>
          <Box>
              <CouponTable coupons={coupons.datas}/>
          </Box>
           <FormCreateCoupon/>
        </ContainerDashboard>
    )
}