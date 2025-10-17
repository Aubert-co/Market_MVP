import { ListCheckoutItems } from "@/components/checkout/listCheckoutItems"
import { SelectCoupon } from "@/components/checkout/selectCoupon"
import { Container } from "@/components/layouts/container"
import { getItemsCheckout } from "@/storage/checkout.storage"

import { useEffect,useState } from "react"
import type { BaseCoupon } from "@/types/coupons.types"
import { ProductsCheckout } from "@/styles/checkout.style"

import { FinishCheckout } from "@/components/checkout/finishCheckout"
import { useBoxMessage } from "@/components/boxMessages"
import type { ItemsCheckout } from "@/types/checkout.types"
import { getUserTotally } from "@/utils"

type StateCoupon = {
  item:BaseCoupon<number>
}


export const Checkout = ()=>{
    const {BoxMessage,setMessage} = useBoxMessage({styledType:'toast'})
    const [datas,setDatas] = useState({
      items:[] as ItemsCheckout[]
    })
    const [totally,setTotally] = useState( 0 )
    const [updateItems,setUpdate] = useState( true )
    const [coupon,setCoupon] = useState<StateCoupon> ({
      item:{} as BaseCoupon<number>
    })
    useEffect(()=>{
      
      const items = getItemsCheckout()
      setDatas({items})
      
      const sumTotally = getUserTotally({
        items,
        discount:coupon.item.discount,
        discountType:coupon.item.discountType
      })
      setTotally( sumTotally  )
      return()=>{
        setUpdate(false)
      }
    },[ updateItems ,coupon])

   
    return (
        <Container>
          <BoxMessage/>
          <ProductsCheckout>
              <div className="list-buy">
                  <ListCheckoutItems setUpdate={setUpdate} datas={datas.items}/>
              </div>
            
          <SelectCoupon setCoupon={setCoupon}/>
          
          <div className="overview">
              <p > Total: R${totally.toFixed(2)}</p>
              <FinishCheckout  setMessage={setMessage} couponId={coupon.item?.id}/>
          </div>
          </ProductsCheckout>
       
        </Container>
    )
}