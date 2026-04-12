import { Prisma } from '@prisma/client'
import { StatusOrder } from '../../orders/types/order.types'


export type LastOrdersPayload = Prisma.OrderGetPayload<{
  omit:{
    couponId:true
  },
  include: {
    product: {
      select: {
        name:true,
        imageUrl:true
        
      }
    },
    user:{
      select:{
        id:true,
        name:true
      }
    }
  },
  select:{
    status:true,quantity:true,price:true,total:true,
    createdAt:true
  }
}>

export type GetLastOrdersDTO = {
    storeId:number,
    status?:StatusOrder
}

export type OrderListPayload = Prisma.OrderGetPayload<{
  select:{
        user:{
            select:{name:true,id:true}
        },
        coupon:{
            select:{
                discount:true,
                discountType:true,
                code:true
            },
        },
        product:{
            select:{
                name:true,imageUrl:true
            }
        },
        total:true,status:true,id:true,
        quantity:true,productId:true,price:true,createdAt:true
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
  pagination:{
    totalPages:number,
    currentPage:number,
    skip:number
  }
}

export type SearchOrdersDTO = {
    storeId:number,
    searchByOrderId?:number
    status?:StatusOrder
    orderBy?:'asc' | 'desc'
    pagination:{
        limit:number,
        skip:number
    }
}
