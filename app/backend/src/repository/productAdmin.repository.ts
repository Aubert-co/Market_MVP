import { Prisma, PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../helpers/ErrorMessage";

export interface IProductAdminRepository{
    createProduct(data:{category:string,name:string,description:string,
        storeId:number,price:number,stock:number,imageUrl:string
    }):Promise<void>,
    deleteProduct(storeId:number,productId:number):Promise<void>,
    countStoreProducts(storeId:number):Promise<number>
}

export class ProductAdminRepository  implements IProductAdminRepository{
    constructor(private prisma:PrismaClient){}

    public async createProduct(data: { category:string,name: string; description: string; storeId: number; price: number; stock: number; imageUrl: string; }): Promise<void> {
        try{
            await this.prisma.product.create({data})
        }catch(err:any){
            throw new Error()
        }
        
    }
    public async countStoreProducts(storeId:number):Promise<number>{
        const countProducts = await this.prisma.product.count({
            where:{storeId}
        })
        if(!countProducts)return 0
        return countProducts
    }
    public async deleteProduct(storeId:number,productId:number):Promise<void>{
        await this.prisma.product.deleteMany({where:{id:productId,storeId}})
    }
  
    
}