import { ParamsCoupons } from "."

export const couponsDatas = (storeId:number)=>{
const validCoupons:ParamsCoupons[]= [
  
  {
    id:17,
    code: "ACTIVE15",
    discount: 15,
    discountType: "percent",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    quantity: 100,
    storeId
  },
  {
    id:29,
    code: "ACTIVE20",
    discount: 20,
    discountType: "fixed",
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 
    quantity: 75,
    storeId
  },
  {
    id:35,
    code: "ACTIVE5",
    discount: 50,
    discountType: "percent",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
    quantity: 10,
    storeId
  },
  {
    id:45,
    code: "ACTIVE501",
    discount: 50,
    discountType: "percent",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
    quantity: 10,
    storeId
  },
  {
    id:55,
    code: "ACTIVE502",
    discount: 50,
    discountType: "percent",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
    quantity: 10,
    storeId
  },
  {
    id:56,
    code: "ACTIVE5021",
    discount: 50,
    discountType: "percent",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
    quantity: 10,
    storeId
  }
]
const expiredCoupons:ParamsCoupons[]=[{
    id:10,
    code: "EXPIRED1",
    discount: 10,
    discountType: "percent",
    expiresAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
    quantity: 50,
    storeId
  },
  {
    id:15,
    code: "EXPIRED56",
    discount: 5,
    discountType: "fixed",
    expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
    quantity: 30,
    storeId
  },
   {
    id:156,
    code: "EXPIRED565",
    discount: 5,
    discountType: "fixed",
    expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
    quantity: 30,
    storeId
  },
   {
    id:1555,
    code: "EXPIRED546",
    discount: 5,
    discountType: "fixed",
    expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
    quantity: 30,
    storeId
  }
]
    return {
        validCoupons,expiredCoupons
    }
}