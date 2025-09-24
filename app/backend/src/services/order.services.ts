import {  PrismaClient } from "@prisma/client";
import { checkIsAValidNumber } from "../helpers";
import { ErrorMessage } from "../helpers/ErrorMessage";
import {  ICouponRepository } from "../repository/CouponRepository";
import { IOrderRepository } from "../repository/order.repository";
import { IProductRepository } from "../repository/ProductRepository";
import { DatasCreateOrderDto, Order, OrderProductInput } from "../types/order";
import { GetCouponDto,DiscountType } from "../types/coupon";


interface IOrderServices  {
    createOrder({userId,items}:DatasCreateOrderDto):Promise<void>,
}
export class OrderService implements IOrderServices{
    constructor(protected order:IOrderRepository
    ){}

    public async createOrder({userId,items}:DatasCreateOrderDto): Promise<void> {
        await this.createOrder({userId,items})       
    }
  
    
   
}