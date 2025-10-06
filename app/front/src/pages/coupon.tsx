import { useBoxMessage } from "@/components/boxMessages"
import { ListCoupons } from "@/components/coupon/listCoupons"
import { Container } from "@/components/layouts/container"
import { RenderDataState } from "@/components/renderDataState"
import { availableCoupons } from "@/services/coupons.services"
import { usableFetch } from "@/services/fetchs"
import { CouponCard } from "@/styles/coupomCart.style"
import type { BaseCoupon } from "@/types/coupons.types"
import { useEffect, useState } from "react"

type Coupons = BaseCoupon<number>[]
type State = {
  datas:Coupons,
  status:number
}


export const Coupon = ()=>{
  const {BoxMessage,setMessage}  =useBoxMessage({styledType:'toast'})
  const [coupons,setCoupons] = useState<State>({
    datas:[] as Coupons,status:0
  })
  useEffect(()=>{
    usableFetch<Coupons,{}>({
      service:availableCoupons,
      body:{},
      setDatas:setCoupons
    })
  },[])
  return(
        <Container>
          <BoxMessage/>
          <CouponCard>
            <div className="coupon-container">
              <RenderDataState<BaseCoupon<number>>
                  datas={coupons.datas}
                  status={coupons.status}
                  errorMessage={
                    "Algo deu errado ao carregar os cupons"
                  }
                  emptyMessage={
                    "Ainda não há cupons disponiveis"
                  }
                  skeletonLoading={{classImg:'coupon-image',classLoading:'coupon-item',length:10}}>
              
                <ListCoupons 
                  setMessage={setMessage} 
                  datas={ coupons.datas }/>
              </RenderDataState>
            </div>
             </CouponCard>
        </Container>
    )
    
}