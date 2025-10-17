import type { ItemsCheckout } from "@/types/checkout.types"
import { mockProducts } from "../fixtures/products"
import { getUserTotally } from "@/utils"


const newItems:ItemsCheckout[] = mockProducts.map((val)=>{
    return {...val,quantity:val.id+5}
})


describe("function getUserTotally",()=>{
    it("should return the total when there is no discount",()=>{
        const values = getUserTotally({
            items:newItems,
        })

        const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

        expect( values ).toEqual(total)
    })
    it("should calculate the 50% discount correctly",()=>{
        const mockPercentCoupon = 50
        const values = getUserTotally({
            items:newItems,
            discount:mockPercentCoupon,
            discountType:'percent'
        })
        const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
       
        expect( values ).toEqual(total / 2 )
    })
     it("should calculate the 10% discount correctly",()=>{
        const mockPercentCoupon = 10
        const values = getUserTotally({
            items:newItems,
            discount:mockPercentCoupon,
            discountType:'percent'
        })
        const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const totalWithPercent = total - (total* mockPercentCoupon/100)
        expect( values ).toEqual(totalWithPercent )
    })
     it("should calculate the fixed discount of 50 correctly",()=>{
        const mockPercentCoupon = 50
        const values = getUserTotally({
            items:newItems,
            discount:mockPercentCoupon,
            discountType:'fixed'
        })
        const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
       
        expect( values ).toEqual(total - 50 )
    })
})