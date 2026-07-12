import { startLogger } from "@/config/logger/logger";
import { ErrorMessage, getPrismaError } from "../../../helpers/ErrorMessage";
import { IOrderRepository } from "../repository/order.repository";
import { DatasCreateOrderDto, GetOrder } from "../types/order.types";


interface IOrderServices  {
    createOrder({userId,items}:DatasCreateOrderDto):Promise<void>,
}
export class OrderService implements IOrderServices{
    private readonly logger = startLogger();
    constructor(protected order:IOrderRepository
    ){}

    public async createOrder({userId,items}:DatasCreateOrderDto): Promise<void> {
        await this.order.createOrder({userId,items})      
        this.logger.info({
            event: "order_created",
            message: "Order created successfully.",
            status: 201,
            action: "createOrder",
            userId,
            itemsCount: items.length,
        }) 
    }
  
    public async getUserOrder(userId:number):Promise<GetOrder[]>{
        try{
            const datas = await this.order.getOrder( userId )
            return datas
        }catch(err:unknown){
      
            const prismaError = getPrismaError(err)
             throw new ErrorMessage({
                message:"Database error while fetching user orders.",
                status:500,
                action:"getCouponById",
                service:"OrderRepository",
                context:{
                    userId
                },
                prismaError
            })
        }
    }
   
}