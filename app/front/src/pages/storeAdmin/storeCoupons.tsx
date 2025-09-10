import { FormCreateCoupon } from "@/components/forms/formCreateCoupon"
import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { CouponTable } from "@/components/store/couponTable"
import { selectMenuItem } from "@/constants/menuItems"
import { UsableFetchWithPages } from "@/services/fetchs"
import { getStoreCoupons } from "@/services/admStore.services"
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
      /*UsableFetchWithPages<BaseCoupon<number>>({
        setDatas:setCoupons,
        service:getStoreCoupons,
        body:{currentPage:1},

      })*/
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