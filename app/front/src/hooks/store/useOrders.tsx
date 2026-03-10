import {  usableFetchWithPages } from "@/services/fetchs"
import { getStoreOrders } from "@/services/store/storeOrders"
import type {  SetPages } from "@/types/services.types"
import type { GetStoreOrders, Order, OrderStatus } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"

type OrderState = {
    datas:Order[]
    status:number
}
type ReturnDatas = {
    orders:Order[]
    status:number
}
type Props = {
    nextPage:number,
    orderStatus:OrderStatus,
    setPagesInfos:SetPages,
    search:any
}
export const useStoreOrders = ({nextPage,orderStatus
    ,setPagesInfos,search
}:Props):ReturnDatas=>{
    const [orders,setOrders] = useState<OrderState>({datas:[],status:0})
    useEffect(()=>{
        usableFetchWithPages<Order[],GetStoreOrders>({
            service:getStoreOrders,
            setDatas:setOrders,
            body:{nextPage,status:orderStatus,search},
            setPages:setPagesInfos
        })
    },[nextPage,orderStatus])
    return {orders:orders.datas,status:orders.status};
}
