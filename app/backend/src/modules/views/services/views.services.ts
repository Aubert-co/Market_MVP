import { IncreaseProductDTO, IViewsRepository } from "../repository/views.repository";


export interface  IViewServices{
    increaseProductViews({productId,sessionId,userId,source}:IncreaseProductDTO):Promise<void>
}
export class ViewsServices implements IViewServices{
    constructor(protected views:IViewsRepository){}

    async increaseProductViews({productId,sessionId,userId,source}:IncreaseProductDTO):Promise<void>{
        try{
            await this.views.increaseProductViews({productId,userId,sessionId,
                source
            })
        }catch(err:unknown){
            return  
        }
    }
}