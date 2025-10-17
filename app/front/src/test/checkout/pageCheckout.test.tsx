import { Checkout } from "@/pages/checkout"
import { render, waitFor } from "@testing-library/react"
import * as storage from '@/storage/checkout.storage'
import * as services from '@/services/userProfile.services'
import { mockProducts } from "../fixtures/products"
import type { ItemsCheckout } from "@/types/checkout.types"
import { mockCoupons } from "../fixtures"
import { BrowserRouter } from "react-router-dom"

const newItems:ItemsCheckout[] = mockProducts.map((val)=>{
    return {...val,quantity:val.id+5}
})
const items = jest.spyOn(storage,'getItemsCheckout')
const userCoupons = jest.spyOn(services,'userCoupons')

describe("Page checkout",()=>{
    it("should successfully render the items",async()=>{
        userCoupons.mockResolvedValue({datas:mockCoupons,status:201,message:'Sucess'})
        items.mockReturnValue( newItems as never )
        const {getByText} = render(
            <BrowserRouter>
                <Checkout/>
            </BrowserRouter>
        )
        const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
            
        await waitFor(()=>{
            expect(getByText(`Total: R$${total.toFixed(2)}`)).toBeInTheDocument()
        })
    })
})