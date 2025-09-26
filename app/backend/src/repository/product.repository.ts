import { Prisma, PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { Product, ProductWithCountsAndRatings, ProductWithPriceAndStock, SelectedProduct } from "../types/product.types";

export interface IProductRepository{
    createProduct(data:{category:string,name:string,description:string,
        storeId:number,price:number,stock:number,imageUrl:string
    }):Promise<void>,
    getProducts(limit:number,skip:number):Promise<SelectedProduct[]>,
    findManyByName(name:string,limit:number,skip:number):Promise<Array<Product>>
    selectByCategory(category:string,limit:number,skip:number):Promise<Product[] >,
    getProductById(id:number):Promise< GetProductById>,
    countProducts():Promise<number >,
    deleteProduct(storeId:number,productId:number):Promise<void>,
    selectProductPrice(productId:number):Promise<ProductWithPriceAndStock | null>,
    decreaseStock(productId:number,stock:number):Promise<void>
}
export type GetProductById = {
  product: Prisma.ProductGetPayload<{
    include: {
        reviews:{
            select:{
                rating:true
            }
        }
      comments: {
        select:{
           
            content:true,
            user:{
                select:{
                    name:true
                }
            }
        }
      }
    }
  }> | null,
  ratings: {
  _avg: { rating: number | null },
  _count: { rating: number }
}

}
export class ProductRepository  implements IProductRepository{
    constructor(private prisma:PrismaClient){}

    public async createProduct(data: { category:string,name: string; description: string; storeId: number; price: number; stock: number; imageUrl: string; }): Promise<void> {
        try{
            await this.prisma.product.create({data})
        }catch(err:any){
            throw new Error()
        }
        
    }
    public async getProducts(limit:number , skip:number = 0): Promise<SelectedProduct[] > {
         
        try{
            const [products, ratings] = await this.prisma.$transaction([
                this.prisma.product.findMany({
                    take: limit,
                    skip,
                    select: {
                        id: true,
                        name: true,
                        imageUrl:true,
                        price:true
                    },
                    orderBy:{
                        id:'asc'
                    }
                }),
                this.prisma.review.groupBy({
                    by: ['productId'],
                    _avg: {
                    rating: true
                    },
                    orderBy:{
                        productId:'asc'
                    }
                })
                ]);
                const ratingMap = new Map(
                    ratings.map(r => [r.productId, r._avg?.rating ?? null])
                );

                
                const productsWithRatings = products.map(product => ({
                    ...product,
                    averageRating: ratingMap.get(product.id) ?? null 
            }));  
            return productsWithRatings
        }catch(err:any){
            throw new ErrorMessage("An unexpected error occurred. Please try again later.",500)
        }
    }
    public async findManyByName(name: string, limit: number=10, skip: number = 0): Promise<Product[]> {
        
        const datas = await this.prisma.product.findMany({
            where: {
                name,
            },
            take: limit,
            skip,
        });

        return datas;
       
    }
   public async selectByCategory(category:string,limit:number=10,skip:number=0):Promise<Product[]>{
        const datas = await this.prisma.product.findMany({
            where:{
                category
            },
            take: limit,
            skip
        })
        return datas;
       
   }
    
    
    public async getProductById(id:number):Promise< GetProductById >{
        try{
            const product = await this.prisma.product.findUnique({
            where:{id},
            include:{
                reviews:{
                    select:{
                        rating:true
                    }
                },
                comments:{
                    select:{content:true,
                        user:{
                        select:{name:true}
                        
                    }},
                    take:5
                },
            }
            })
            const ratings = await this.prisma.review.aggregate({
                where:{productId:id},
                _avg:{rating:true},
                _count:{rating:true}
            })
            return {
                product,ratings
            }
        }catch(err:any){
            throw new ErrorMessage("Failed to find product.",500)
        }
    }
   
    public async countProducts():Promise<number >{
        return await this.prisma.product.count()
    }
    
    
    
   
    public async deleteProduct(storeId:number,productId:number):Promise<void>{
        await this.prisma.product.deleteMany({where:{id:productId,storeId}})
    }
    public async selectProductPrice(productId:number):Promise<ProductWithPriceAndStock | null>{
        return await this.prisma.product.findFirst({
            where:{id:productId},
           select:{
            price:true,stock:true
           }
        })
    }
    public async decreaseStock(productId:number,stock:number):Promise<void>{
        await this.prisma.product.update({
            where:{id:productId},
            data:{stock}
        })
    }
}