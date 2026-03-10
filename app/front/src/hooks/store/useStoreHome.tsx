import { usableFetch } from "@/services/fetchs"
import { lastOrders } from "@/services/store/storeOrders"
import type { Order } from "@/types/storeDashboard.types"
import { useEffect, useState } from "react"

type OrderState = {
    datas:Order[]
    status:number
}
type ReturnDatas = {
    orders:Order[]
    status:number
}

export const useStoreLastOrders = ():ReturnDatas=>{
    const [orders,setOrders] = useState<OrderState>({datas:[],status:0})
    useEffect(()=>{
        usableFetch<Order[],{}>({
            service:lastOrders,
            setDatas:setOrders,
            body:{}
        })
    },[])
    return {orders:orders.datas,status:orders.status};
}