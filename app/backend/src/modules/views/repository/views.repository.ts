import { PrismaClient } from "@prisma/client";

export type IncreaseProductDTO = {
    productId:number,
    userId?:number,
    sessionId:string
}
export interface IViewsRepository{
    increaseProductViews({productId,userId,sessionId}:IncreaseProductDTO):Promise<void>
}
export class ViewsRepository implements IViewsRepository{
    constructor(protected prisma:PrismaClient){}

    public async  increaseProductViews({productId,userId,sessionId}:IncreaseProductDTO):Promise<void>{
        await this.prisma.view.create({
            data:{
                productId,
                userId,
                sessionId,
                
            }
        })
    }
}