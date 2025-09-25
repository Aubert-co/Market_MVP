import { prisma } from "../../lib/prisma"
import { products } from "../__fixtures__/products"
import { CreateOrderDto,ParamsCoupons 
    ,ParamsCart,ParamCouponUsage,DatasCouponUsage,itemCoupon,itemsCart
} from "../test.types"
export const users = [{id:1,name:'lucas',password:'12345667e',email:'lucsssas@gmail.com'},
    {id:4,name:'jose',password:'123456eee',email:'jossse@gmail.com'}
]
export const oneUser = {name:'lucas',password:'1234456',email:'joses@gmail.com',id:1}
export const oneStore = {name:'stores',description:'store description',userId:1,id:1}
export const deleteStore = async():Promise<void>=>{
    await prisma.store.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    }) 
}

export const deleteUser = async():Promise<void>=>{
    await prisma.user.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
}
 
export const deleteProduct = async():Promise<void>=>{
    await prisma.product.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
} 

export const cleanAllDb = async():Promise<void>=>{
    await deleteProduct()
    await deleteStore()
    await deleteUser()
}

export const createOneUser = async():Promise<void>=>{
    await prisma.user.create({data:oneUser})
}
export const cleanUserCart = async():Promise<void>=>{
    await prisma.cartitem.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
}
export const cleanOrders = async():Promise<void>=>{
    await prisma.order.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
}

export const createOrder = async({productId,price,id,userId,total,quantity,status}:CreateOrderDto):Promise<void>=>{
    await prisma.order.create({
        data:{
            productId,price,userId,total,quantity,id,status
        }
    })
}
export const cleanCoupons = async():Promise<void>=>{
     await prisma.couponUsage.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    }) 
    await prisma.coupon.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
   
}



export const addItemToCart = async(data:ParamsCart[]):Promise<itemsCart[]>=>{
    return await prisma.cartitem.createManyAndReturn({
        data
        
    })
}


export const createCoupons = async(data:ParamsCoupons[]):Promise<itemCoupon[]>=>{
    return await prisma.coupon.createManyAndReturn({
        data
    })
}
export const createUserStoreAndProducts = async():Promise<void>=>{
    await prisma.user.createMany( {data:users} )
    await prisma.store.create({data:oneStore})
    await prisma.product.createMany({data:products})
}

export const addCouponUsage = async(data:ParamCouponUsage[]):Promise<DatasCouponUsage[]>=>{
    return await prisma.couponUsage.createManyAndReturn({
        data
    })
}

export const deleteReviewAndComments = async():Promise<void>=>{
    await prisma.review.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
    await prisma.comment.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
}