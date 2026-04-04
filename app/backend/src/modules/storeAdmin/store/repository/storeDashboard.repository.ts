import {  PrismaClient } from "@prisma/client";
import { StoreRepository } from "./store.repository";


export interface IStoreDashboardRep {

    getTotalViews(storeId:number): Promise<number>
}
export class StoreDashboardRep extends StoreRepository implements IStoreDashboardRep {
    constructor(prisma:PrismaClient){
        super(prisma)
    }
    
   
    public async getTotalViews(storeId: number): Promise<number> {
        try{
            const count = await this.prisma.view.count({
                where: {
                product: { storeId },
                },
            });
            if(!count)return  0

            return count
        }catch(err:any){
            return 0
        } 
    }

}
