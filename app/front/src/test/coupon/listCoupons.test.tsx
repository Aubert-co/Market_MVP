import { ListCoupons } from "@/components/cupom/listCoupons"
import { fireEvent, render, waitFor } from "@testing-library/react"
import { mockCoupons } from "../fixtures"
import * as services from '../../services/coupons.services'
const mockMessage = jest.fn()
const spyServices = jest.spyOn(services,'userAddCoupon')
describe("component ListCoupons",()=>{
    it("should render the data correctly",async()=>{
        const {getAllByTestId , getAllByText,getByText} =render(
            <ListCoupons datas={mockCoupons} setMessage={mockMessage}/>
        )

        mockCoupons.map((val,index)=>{
            const discountType  =val.discountType === "percent" ? "%" : " R$"
            expect( getByText(val.code) ).toBeInTheDocument()
               expect( getByText(new Date(val.expiresAt).toLocaleDateString("pt-BR"))).toBeInTheDocument()
          
            expect(getAllByTestId("discount")[index]).toHaveTextContent("Desconto:" +" "+ val.discount.toString() +""+ discountType)
            expect(getByText(val.quantity)).toBeInTheDocument()
         
        })

        const [btnAddCoupon] = getAllByText("Pegar")
        fireEvent.click( btnAddCoupon )
        
        await waitFor(()=>{

        })
        expect( mockMessage ).toHaveBeenCalledTimes(1)
        expect(spyServices).toHaveBeenCalledTimes(1)
        expect(spyServices).toHaveBeenCalledWith( mockCoupons[0].id)
    })
})
