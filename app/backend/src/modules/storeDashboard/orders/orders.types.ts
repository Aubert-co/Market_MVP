import { Prisma } from '@prisma/client'
import { StatusOrder } from '../../orders/types/order.types'
import { Pagination } from '../../../types/pagination.types'

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
    limit:number,
    search?:string | number
    status?:StatusOrder
    orderBy?:'asc' | 'desc'
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
export type SearchOrdersReturn = {
  datas:OrderListPayload[],
  pageInfo:{
    totalItems:number,
  }
}

export type SearchOrdersResponse = {
  datas:OrderListPayload[],
  pagination:Pagination
}