import type { BaseCoupon } from "@/types/coupons.types"
import { useEffect, useState } from "react"

import couponImg from '@/assets/coupon.png'
import { ListContainer } from "@/styles/profile.style"
import { usableFetch } from "@/services/fetchs"
import { userCoupons } from "@/services/userProfile.services"
import { Link } from "react-router-dom"
import { RenderDataState } from "@/components/shared/renderDataState"

type StateCoupon = {
    datas:BaseCoupon<number>[],
    status:number
}
type PropsList ={
  datas:BaseCoupon<number>[]
}


export const ListCoupons = ({ datas }: PropsList) => {
  return (
    <>
      {datas.map((val) => (
        <div className="list-item" key={val.id}>
            <div className="list-image">
                <img src={couponImg} alt="" />
            </div>
            <div className="list-info">
                <h3>{val.code}</h3>
                <p>Desconto: {val.discountType === "percent" ? `${val.discount}%` : `R$ ${val.discount}`}</p>
                <p>Quantidade: 1</p>
                <p>Expira em: {new Date(val.expiresAt).toLocaleDateString('pt-BR')}</p>
            </div>
        </div>
      ))}
    </>
  )
}
type PropsUserCoupons = {
  formRef:React.RefObject<HTMLInputElement | null>
}
export const UserCoupons = ({formRef}:PropsUserCoupons)=>{
    const [ coupons  ,setCoupons] = useState<StateCoupon>({datas:[],status:0})
  
    useEffect(()=>{
        usableFetch<BaseCoupon<number>[],{}>({
          setDatas:setCoupons,
          service:userCoupons,
          body:{}
        })
    },[])
    return (
        <ListContainer >
            <div className="text">
              <h1 >Meus cupons</h1>
            </div>
            <div className="list-container">
            <RenderDataState<BaseCoupon<number> >
              datas={coupons.datas}
              status={coupons.status}
              emptyMessage={
                <>
                    Você ainda não possui cupons,<Link to="/cupons">adicione agora mesmo!</Link>
                </>
              }
              errorMessage="Algo deu errado ao buscar pelo seus cupons"
              skeletonLoading={{
                classLoading:'list-item',
                classImg:'list-image',
                length:3
              }}
            >
              <ListCoupons datas={coupons.datas}/>
              
            </RenderDataState>
            </div>
            <div ref={formRef} className="end"></div>
        </ListContainer>
    )
          
    
}