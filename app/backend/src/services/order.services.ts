import { IOrderRepository } from "../repository/order.repository";
import { DatasCreateOrderDto } from "../types/order.types";


interface IOrderServices  {
    createOrder({userId,items}:DatasCreateOrderDto):Promise<void>,
}
export class OrderService implements IOrderServices{
    constructor(protected order:IOrderRepository
    ){}

    public async createOrder({userId,items}:DatasCreateOrderDto): Promise<void> {
        await this.order.createOrder({userId,items})       
    }
  
    
   
}