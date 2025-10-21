import { ErrorMessage } from "../helpers/ErrorMessage";
import { IOrderRepository } from "../repository/order.repository";
import { DatasCreateOrderDto, GetOrder } from "../types/order.types";


interface IOrderServices  {
    createOrder({userId,items}:DatasCreateOrderDto):Promise<void>,
}
export class OrderService implements IOrderServices{
    constructor(protected order:IOrderRepository
    ){}

    public async createOrder({userId,items}:DatasCreateOrderDto): Promise<void> {
        await this.order.createOrder({userId,items})       
    }
  
    public async getUserOrder(userId:number):Promise<GetOrder[]>{
        try{
            const datas = await this.order.getOrder( userId )
            return datas
        }catch(err:any){
            throw new ErrorMessage("Database error while fetching user orders.", 500)
        }
    }
   
}