import {  render } from "@testing-library/react"
import { CouponTable } from "@/components/store/couponTable"
import { mockCoupons } from "../fixtures"

describe("Component CouponTable",()=>{
    it("should render the coupon table correctly",()=>{
        const {queryAllByLabelText,queryByText} = render(
            <CouponTable coupons={mockCoupons}/>
        )
        const discount = queryAllByLabelText("[data-label='Desconto']")
        const quantity = queryAllByLabelText("[data-label='Quantidade']")
        const expiresAt  = queryAllByLabelText("[data-label='Validade']")
        const coupon  = queryAllByLabelText("[data-label='Cupom']")
        
        expect(queryByText("Cupom")).toBeInTheDocument()
        expect(queryByText("Quantidade")).toBeInTheDocument()
        expect(queryByText("Desconto")).toBeInTheDocument()
        expect(queryByText("Validade")).toBeInTheDocument()
        discount.map((_,index)=>{
            const coupons = mockCoupons[index]
            const couponCell = coupon[index]

            const img = couponCell.querySelector("img")
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute("alt", coupons.code)
          
            expect( quantity[index]).toHaveTextContent( coupons.quantity.toString())
            expect(expiresAt[index]).toHaveTextContent( coupons.expiresAt.toString())
       
        })

    })
})