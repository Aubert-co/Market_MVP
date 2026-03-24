import { Prisma } from '@prisma/client'
import { StatusOrder } from '../../orders/types/order.types'

export type LastOrdersPayload = Prisma.OrderGetPayload<{
  include: {
    product: {
      select: {
        name:true
      }
    }
  }
}>

export type GetLastOrdersDTO = {
    storeId:number,
    status?:StatusOrder
}
export type SearchOrdersDTO = {
    storeId:number,
    skip:number,
    take:number,
    search?:string | number
    status?:StatusOrder
}
export type OrderListPayload = Prisma.OrderGetPayload<{
  select: {
    product: {
      select: {
        name: true
      }
    }
  }
}>