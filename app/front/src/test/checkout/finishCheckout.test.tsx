import { FinishCheckout } from "@/components/checkout/finishCheckout"
import { fireEvent, render, waitFor } from "@testing-library/react"
import * as storage from "@/storage/checkout.storage"
import { mockProducts } from "../fixtures/products"
import * as services from '@/services/checkout.services'
import type { ItemsCheckout } from "@/types/checkout.types"

const serviceCreateOrder = jest.spyOn( services ,'serviceCreateOrder')
const getItemsCheckout = jest.spyOn(storage,'getItemsCheckout')

const newItems:ItemsCheckout[] = mockProducts.map((val)=>{
    return {...val,quantity:val.id+5}
})
describe("component FinishCheckout",()=>{
    const setMessage = jest.fn()
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should successfully call the service and message",async()=>{
        getItemsCheckout.mockReturnValue( newItems )
        serviceCreateOrder.mockResolvedValue({status:201,message:'lorem iptsu'})
        const couponId = 3933
        const {getByText} = render(
            <FinishCheckout couponId={couponId} setMessage={setMessage}/>
        )
        
        const btnFinish = getByText("Finalizar")

        fireEvent.click( btnFinish )
        
        await waitFor(()=>{
            expect( setMessage ).toHaveBeenCalledTimes(1)
            expect( setMessage ).toHaveBeenCalledWith({content:'Compra realizada com sucesso!',type:'success'})
            expect( serviceCreateOrder ).toHaveBeenCalledTimes(1)
            expect( serviceCreateOrder ).toHaveBeenCalledWith(
                newItems.map((val)=>{
                    return {couponId:couponId,productId:val.id,quantity:val.quantity}
                })
            )
        })
    })
     it("should not call the service when the items are empty",async()=>{
        getItemsCheckout.mockReturnValue( null as never )
        serviceCreateOrder.mockResolvedValue({status:201,message:'lorem iptsu'})
        const couponId = 3933
        const {getByText} = render(
            <FinishCheckout couponId={couponId} setMessage={setMessage}/>
        )
        
        const btnFinish = getByText("Finalizar")

        fireEvent.click( btnFinish )
        
    
        expect( setMessage ).toHaveBeenCalledTimes(0)
        expect( serviceCreateOrder ).toHaveBeenCalledTimes(0)
          
    })
    it("should show an error message when the status is equal to 401",async()=>{
        getItemsCheckout.mockReturnValue( newItems )
        serviceCreateOrder.mockResolvedValue({status:401,message:'lorem iptsu'})
        const couponId = 3933
        const {getByText} = render(
            <FinishCheckout couponId={couponId} setMessage={setMessage}/>
        )
        
        const btnFinish = getByText("Finalizar")

        fireEvent.click( btnFinish )
        
        await waitFor(()=>{
            expect( setMessage ).toHaveBeenCalledTimes(1)
            expect( setMessage ).toHaveBeenCalledWith({content:'Faça login para finalizar a compra!',type:'info'})
            expect( serviceCreateOrder ).toHaveBeenCalledTimes(1)
            
        })
    })
    it("should show an error message when the status is not 201 or 401",async()=>{
        getItemsCheckout.mockReturnValue( newItems )
        serviceCreateOrder.mockResolvedValue({status:500,message:'lorem iptsu'})
        const couponId = 3933
        const {getByText} = render(
            <FinishCheckout couponId={couponId} setMessage={setMessage}/>
        )
        
        const btnFinish = getByText("Finalizar")

        fireEvent.click( btnFinish )
        
        await waitFor(()=>{
            expect( setMessage ).toHaveBeenCalledTimes(1)
            expect( setMessage ).toHaveBeenCalledWith({content:'Algo deu errado ao tentar finalizar a compra!',type:'error'})
            expect( serviceCreateOrder ).toHaveBeenCalledTimes(1)
            
        })
    })
})