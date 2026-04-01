import { PrismaClient } from "@prisma/client";
import { Order , StatusOrder,DatasCreateOrderDto, GetOrder} from "../types/order.types";
import { ErrorMessage, getPrismaError } from "../../../helpers/ErrorMessage";
import { applyDiscount } from "../../../helpers/applyDiscount";
import { CouponRepository } from "../../coupon/repository/coupon.repository";
import { DiscountType, GetCouponDto } from "../../coupon/types/coupon.types";

export interface IOrderRepository {
    createOrder({userId,items}:DatasCreateOrderDto):Promise<void>,
    getOrder(userId:number):Promise<GetOrder[]>,
    getOrderItems(orderId:number):Promise<Order[]>,
    storeGetOrderItems(storeId:number):Promise<Order[]>,
    getOrderItemByIdAndUserId(userId:number,orderItemId:number,status:StatusOrder):Promise<Order | null>
}

export class OrderRepository implements IOrderRepository{
    constructor(protected prisma:PrismaClient,protected coupon:CouponRepository){}

    protected async getCouponById(couponId:number | undefined ,userId:number):Promise<GetCouponDto>{
        if(!couponId)return {discount:undefined,discountType:undefined}

        const coupon = await this.coupon.getCouponById(couponId)
        if (!coupon) {
    
             throw new ErrorMessage({
                message:"Coupon not found or is invalid.",
                status:404,
                action:"getCouponById",
                service:"OrderRepository",
                context:{
                    userId
                }
            })
        }
        const checkCouponUsage = await this.coupon.isUserUsedCoupon( userId,couponId )
        if(!checkCouponUsage){
   
            throw new ErrorMessage({
                message:"Coupon has already been used",
                status:409,
                action:"getCouponById",
                service:"OrderRepository",
                context:{
                    userId
                }
            })
        }
        return {
            discount:coupon.discount,discountType:coupon.discountType as DiscountType
        }
    }
    public async getOrder(userId:number):Promise<GetOrder[]>{
        return await this.prisma.order.findMany({
            where:{userId},
            select:{
                id:true,
                total:true,
                quantity:true,
                status:true,
                price:true,
                createdAt:true,
                coupon:{
                    select:{
                        discount:true,
                        discountType:true
                    }
                },
                product:{
                    select:{
                        name:true,
                        imageUrl:true
                    }
                }
            },
            take:5
        })
    }
    public async getOrderItems(id:number):Promise<Order[]>{
        return await this.prisma.order.findMany({
            where:{id},
            take:5,
            include:{'product':true}
        })
    }
    public async storeGetOrderItems(storeId:number):Promise<Order[]>{
        return await this.prisma.order.findMany({
            where:{product:{
                storeId
            }},
            take:5
        })
    }
    public async getOrderItemByIdAndUserId(userId:number,orderId:number,status:StatusOrder):Promise<Order| null>{
        return await this.prisma.order.findUnique({
            where:{id:orderId, userId,status},
        })
    }
    public async createOrder({userId,items}:DatasCreateOrderDto):Promise<void>{

        try{
            await this.prisma.$transaction(async (tx) => {
                for (const val of items) {
                    const product = await tx.product.findFirst({
                        where:{id:val.productId},
                        select:{
                            price:true,stock:true
                        }
                    })
                    
                    if (!product) {
                
                         throw new ErrorMessage({
                            message:"No valid product found to create the order.",
                            status:404,
                            action:"createOrder",
                            service:"OrderRepository",
                            context:{
                                userId
                            }
                        })
                    }

                    if (product.stock < val.quantity) {
         
                         throw new ErrorMessage({
                            message:"Insufficient product stock for the requested quantity.",
                            status:400,
                            action:"createOrder",
                            service:"OrderRepository",
                            context:{
                                userId
                            }
                        })
                    }

                    const {discount,discountType} = await this.getCouponById(val.couponId ,userId)

                    const total = applyDiscount({
                        total: product.price * val.quantity,
                        discount,
                        discountType
                    });

                    await tx.order.create({
                        data:{
                        price: product.price,
                        productId: val.productId,
                        userId,
                        couponId:val.couponId,
                        quantity: val.quantity,
                        total
                        }
                    });

                    await tx.product.update({
                        where:{id:val.productId},
                        data:{stock: product.stock -  val.quantity}
                    });
                    if(val.couponId){
                        await tx.couponUsage.update({
                           where: {
                                userId_couponId:{
                                    userId,
                                    couponId:val.couponId
                                },
                            },
                            data:{
                                usedAt:new Date()
                            }
                        })
                    }
                }
            });

       }catch(err:unknown){
            if(err instanceof ErrorMessage){
                 throw new ErrorMessage({
                    message:err.message,
                    status:err.status,
                    action:"createOrder",
                    service:"OrderRepository",
                    context:err.context
                })
            }
           
            const prismaError = getPrismaError(err)
            throw new ErrorMessage({
                message:"Internal error while creating the order.",
                status:500,
                action:"createOrder",
                service:"OrderRepository",
                prismaError
            })
        }

        
    }
}