import {   PrismaClient } from "@prisma/client";
import {  ProductMostViewed } from "../types/storedashboard.types";



export interface IStoreDashboardRep {
    getTotalViews(storeId:number): Promise<number>
    getMonthlyRevenue(storeId:number): Promise<number>
    countReviews(storeId:number):Promise<number>,
    averageReviews(storeId:number):Promise<number>,
    countUserProductsInCart(storeId:number):Promise<number>,
    topViewedProducts(storeId:number):Promise<ProductMostViewed[]>
}

export class StoreDashboardRep   implements IStoreDashboardRep {
    constructor(protected prisma:PrismaClient){}
    
    async countReviews(storeId:number):Promise<number>{
        return await this.prisma.review.count({
            where:{
                product:{
                    storeId
                }
            }
        })
    }
    async averageReviews(storeId:number):Promise<number>{
        const values = await this.prisma.review.aggregate({
            where:{
                product:{
                    storeId
                }
            },
            _avg:{
                rating:true
            }
        })
        return values._avg.rating ?? 0
    }
    
    public async countUserProductsInCart(storeId:number):Promise<number>{
        
        const values = await this.prisma.cartitem.aggregate({
            where:{
                product:{
                    storeId
                }
            },
            _sum:{
                quantity:true
            }
         })
         return values._sum.quantity ?? 0
    }
    public async getTotalViews(storeId: number): Promise<number> {
        
        const count = await this.prisma.view.count({
            where: {
            product: { storeId },
            },
        });
        if(!count)return  0

        return count
       
    }

    public async getMonthlyRevenue(storeId: number): Promise<number> {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const result = await this.prisma.order.aggregate({
            where: {
                product: { storeId },
                createdAt: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth,
                },
                status: { not: "cancelled" },
            },
            _sum: {
                total: true,
            },
        });

        return result._sum.total || 0;
     
    }
    public async topViewedProducts(storeId:number):Promise<ProductMostViewed[]>{
        return await this.prisma.product.findMany({
            where:{
                storeId
            },
            orderBy:{
                views:{
                    _count:'desc'
                }
            },
            take:5,
            select:{
                id:true,
                name:true,
                imageUrl:true,
                _count:{
                    select:{
                        views:true
                    }
                }
            }
            
        })
        
    }
}
