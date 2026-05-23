import { prisma } from "@/lib/prisma";

import { seedDatabase } from "@/tests/_seed_";
import { Router } from "express";


const route = Router()
const isTestE2E = process.env.NODE_ENV ==="test-e2e"

route.post("/test/reset",async(req,res,next)=>{
    if(!isTestE2E)return res.status(403)
    try{
        await prisma.$executeRawUnsafe(`
           TRUNCATE TABLE 
            "CouponUsage",
            "Cartitem",
            "Comment",
            "Review",
            "Order",
            "Product",
            "Coupon",
            stores,
            "User",
            "View"
            RESTART IDENTITY CASCADE;
        `);
        await seedDatabase()
        res.status(200).send({message:"reset"})
    }catch(err:unknown){
      
        next(err)
    }
})

export default route