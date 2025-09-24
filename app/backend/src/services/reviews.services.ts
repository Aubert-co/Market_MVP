import { AddReviewDto } from "../types/reviews.types";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { IOrderRepository } from "../repository/order.repository";
import { IReviewsRepository } from "../repository/reviews.repository";
import { Order } from "../types/order.types";


export interface IRewviewsService {
   
    addReview({rating,content,orderId,userId}:AddReviewDto):Promise<void>
}
export class ReviewsService implements IRewviewsService{
    constructor(protected reviews:IReviewsRepository,
        protected  order:IOrderRepository
    ){}

    protected async checkOrder(userId:number,OrderId:number):Promise<Order>{
        const order = await this.order.getOrderItemByIdAndUserId(userId,OrderId,"completed")
        if (!order) {
            throw new ErrorMessage("Order item not found or does not belong to the user.", 404);
        }

        return order;
    }
   
    public async addReview({rating,content,orderId,userId}:AddReviewDto):Promise<void>{
        const order  = await this.checkOrder(userId,orderId)
        if(rating > 5)rating =5
        if(rating <=0)rating = 1

        await this.reviews.addReview({
            userId,rating,orderId:order.id,productId:order.productId,
            content
        })
       
    }
}