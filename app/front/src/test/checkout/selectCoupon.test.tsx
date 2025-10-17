import { SelectCoupon } from "@/components/checkout/selectCoupon"
import { fireEvent, render, waitFor } from "@testing-library/react"
import * as services from '@/services/userProfile.services'
import { mockCoupons } from "../fixtures"

const userCoupons = jest.spyOn(services,'userCoupons')
describe("component selectCoupon",()=>{
    const  setCoupon =jest.fn()
    
    it("should render the options correctly",async()=>{
        userCoupons.mockResolvedValue({datas:mockCoupons,status:201,message:''})
        const {getByText,getByTestId} =render(
            <SelectCoupon setCoupon={setCoupon}/>
        )
        const textSelect = getByText("Selecione um cupom")
        
        expect(textSelect).toBeInTheDocument()
    
        await waitFor(()=>{
            mockCoupons.map((val)=>{
                expect(getByText(val.code)).toBeInTheDocument()
            })
            const select = getByTestId("select-coupon")
            const options = select.querySelectorAll('option')
            
            expect(options).toHaveLength( mockCoupons.length + 1)
            fireEvent.change(select, { target: { value: "1" } })
            expect( setCoupon ).toHaveBeenCalledTimes(1)
            expect( setCoupon ).toHaveBeenCalledWith({item:mockCoupons[0]})
        })
    })
    it("should render the option 'Nenhum cupom disponível' when no data is provided",async()=>{
         userCoupons.mockResolvedValue({datas:[],status:201,message:''})
        const {getByText,getByTestId} =render(
            <SelectCoupon setCoupon={setCoupon}/>
        )
        const textSelect = getByText("Selecione um cupom")
        const select = getByTestId("select-coupon")
        expect(textSelect).toBeInTheDocument()
    
        await waitFor(()=>{
            const options = select.querySelectorAll('option')
            expect(options).toHaveLength(2)
            expect( getByText("Nenhum cupom disponível")).toBeInTheDocument()
        })
    })
})