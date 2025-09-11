import { FormCreateCoupon } from "@/components/forms/formCreateCoupon"
import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/components/pagination"
import { CouponTable } from "@/components/store/couponTable"
import { selectMenuItem } from "@/constants/menuItems"
import { getStoreCoupons } from "@/services/admStore.services"
import { usableFetchWithPages } from "@/services/fetchs"
import { Box } from "@/styles/dashboardStore.style"
import type { BaseCoupon } from "@/types/coupons.types"
import type { GetStoreCoupons } from "@/types/storeDashboard.types"
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
    const changePage = ()=>{};
    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage)
    
    useEffect(()=>{
      usableFetchWithPages<BaseCoupon<number>[],GetStoreCoupons>({
        setDatas:setCoupons,
        service:getStoreCoupons,
        body:{nextPage:pageInfos.currentPage},
        setPages:setPagesInfos

      })
    },[])
    return (
        <ContainerDashboard storeName="StoreName" sidebarMenuItems={selectMenuItem("Cupons")}>
          <Box>
        
              <CouponTable coupons={coupons.datas}/>
              <Pagination/>
          </Box>
           <FormCreateCoupon/>
        </ContainerDashboard>
    )
}