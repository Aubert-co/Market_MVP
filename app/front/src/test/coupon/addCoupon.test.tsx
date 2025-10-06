import { AddCoupon } from "@/components/coupon/AddCoupon";
import * as coupon from '../../services/coupons.services'
import { fireEvent, render, waitFor } from "@testing-library/react";


const spyService =  jest.spyOn(coupon,'userAddCoupon')
const setMessage =jest.fn()
describe("component AddCoupon",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should return a successful message when the service returns success",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {getByText} = render(
            <AddCoupon id={3} setMessage={setMessage}/>
        )
        
        const btn = getByText("Pegar")
        fireEvent.click( btn )

       await waitFor(()=>{

       },)

        expect( setMessage ).toHaveBeenCalledTimes(1)
        expect( setMessage ).toHaveBeenCalledWith({content:"Sucesso ao adicionar o cupom",type:"success"})
    })
     it("should return an info message when the service returns 'This user already possesses the coupon'",async()=>{
        spyService.mockResolvedValue({status:404,message:'This user already possesses the coupon.'})
        const {getByText} = render(
            <AddCoupon id={3} setMessage={setMessage}/>
        )
        
        const btn = getByText("Pegar")
        fireEvent.click( btn )

       await waitFor(()=>{

       },)

        expect( setMessage ).toHaveBeenCalledTimes(1)
        expect( setMessage ).toHaveBeenCalledWith({content:"Você já possui este cupom",type:"info"})
    })
     it("should return an info message when the service returns 'Limit of active coupons reached.",async()=>{
        spyService.mockResolvedValue({status:404,message:"Limit of active coupons reached."})
        const {getByText} = render(
            <AddCoupon id={3} setMessage={setMessage}/>
        )
        
        const btn = getByText("Pegar")
        fireEvent.click( btn )

       await waitFor(()=>{

       },)

        expect( setMessage ).toHaveBeenCalledTimes(1)
        expect( setMessage ).toHaveBeenCalledWith({content:"Você já possui muitos cupons",type:"info"})
    })
    it("should return an error message when the service returns 'Something went wrong",async()=>{
        spyService.mockResolvedValue({status:404,message:"Something went wrong"})
        const {getByText} = render(
            <AddCoupon id={3} setMessage={setMessage}/>
        )
        
        const btn = getByText("Pegar")
        fireEvent.click( btn )

       await waitFor(()=>{

       },)

        expect( setMessage ).toHaveBeenCalledTimes(1)
        expect( setMessage ).toHaveBeenCalledWith({content:"Algo deu errado!",type:"error"})
    })
})