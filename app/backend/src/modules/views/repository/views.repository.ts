import { PrismaClient } from "@prisma/client";
import { SourceViews } from "../views.types";

export type IncreaseProductDTO = {
    productId:number,
    userId?:number,
    sessionId:string,
    source:SourceViews
}
export interface IViewsRepository{
    increaseProductViews({productId,userId,sessionId}:IncreaseProductDTO):Promise<void>
}
export class ViewsRepository implements IViewsRepository{
    constructor(protected prisma:PrismaClient){}

    public async  increaseProductViews({productId,userId,sessionId,source}:IncreaseProductDTO):Promise<void>{
        const FIVE_MINUTES = 5 * 60 * 1000

        const exists = await this.prisma.view.findFirst({
        where: {
            productId,
            sessionId,
            viewedAt: {
            gte: new Date(Date.now() - FIVE_MINUTES)
            }
        },
        select: { id: true }
        })
        if(exists)return;
        await this.prisma.view.create({
            data:{
                productId,
                userId,
                sessionId,
                source
            }
        })
    }
}