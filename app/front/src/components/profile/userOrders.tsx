import { ListContainer } from "@/styles/profile.style"
import { RenderDataState } from "@/components/shared/renderDataState"
import type { UserOrders } from "@/types/orders.types"
import { useEffect, useState } from "react"
import { userOrders } from "@/services/userProfile.services"
import { usableFetch } from "@/services/fetchs"

import type { DiscountType } from "@/types/coupons.types"
import { loadImage } from "@/utils"
type State = {
  datas: UserOrders[]
  status:number
   
}
type PropsList ={
  orders:UserOrders[]
}
const getDiscount = (coupon?:DiscountType)=>coupon === "fixed" ? "R$" :"%"
export const ListUserOrders = ({orders}:PropsList)=>{
  return orders.map((val)=>{
    return(
      <div className="list-item" key={val.id}>
        <div className="list-image">
          <img src={loadImage(val.product.imageUrl)} alt="" />
        </div>
        <div className="list-info">
            <p className="name"><strong>Produto:</strong> {val.product.name}</p>
            <p><strong>Preço:</strong> R$ {val.price.toFixed(2)}</p>
            <p><strong>Quantidade:</strong> {val.quantity}</p>
            <p><strong>Total:</strong> R$ {val.total.toFixed(2)}</p>
            {val.coupon?.discount && <p> <strong>Desconto:</strong>{val.coupon.discount}{getDiscount(val.coupon.discountType)} </p>}
          </div>
      </div>
    )
  })
}
export const UserOrdersComponent = ()=>{
  const [orders,setDatas] = useState<State>({datas:[],status:0})

  useEffect(()=>{
    usableFetch<UserOrders[],{}>({
      service:userOrders,
      setDatas,
      body:{}
    })
      
  },[])
  return( 
  <ListContainer>
      <div className="text">
          <h1> Minhas compras</h1>
      </div>

      <div className="list-container">
          <RenderDataState<UserOrders>
              datas={orders.datas} 
              status={orders.status}
              emptyMessage={
                  <>Voce ainda não tenhuma compra </>
              }
              errorMessage="Algo deu errado ao buscar suas compras"
              skeletonLoading={{
                classLoading:'list-item',
                classImg:'list-image',
                length:3
              }}
              >
                <ListUserOrders orders={orders.datas}/>
              </RenderDataState>
      </div>
  </ListContainer>
  )
}