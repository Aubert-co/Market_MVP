import { CartOverview } from "@/components/cart/cartOverview"
import { fireEvent, render } from "@testing-library/react"
import * as storages from '@/storage/cart.storage'
import { userCartMocks } from "../mock"
import * as cleanCart from '@/components/cart/useRemoveFromCart'

const onClick  = jest.fn()
jest.spyOn(cleanCart, 'useRemoveFromCart').mockImplementation(() => ({
  onClick
}))
describe("Component CartOverview",()=>{
    const setMessage = jest.fn()
    const setUpdateCart  =jest.fn()
    
    it("should render the cart total and action buttons when the cart has items",()=>{
        jest.spyOn(storages,'getItemsFromCart').mockReturnValue({cart:userCartMocks,updatedAt:344,isSaved:false})
        const {getByText,queryByText} = render(
            <CartOverview setMessage={setMessage} setUpdateCart={setUpdateCart} updateCart={false}/>
        )
        const total = userCartMocks.reduce((val,tr)=>{
            val + tr.price * tr.quantity
            return val
        },0)    
        
        expect( queryByText("Seu carrinho está vazio 🛒")).not.toBeInTheDocument()
        expect( queryByText("Limpar carrinho")).toBeInTheDocument()
        expect(queryByText(`Total: R$${total.toFixed(2)}`) )
        expect( queryByText("Finalizar compra")).toBeInTheDocument()

        fireEvent.click( getByText("Limpar carrinho"))
        expect( onClick ).toHaveBeenCalledTimes(1)
        expect(onClick).toHaveBeenCalledWith( userCartMocks.map((val)=>val.id))
    })
     it("should render empty cart message when cart is empty",()=>{
        jest.spyOn(storages,'getItemsFromCart').mockReturnValue({cart:[],updatedAt:344,isSaved:false})
        const {queryByText} = render(
            <CartOverview setMessage={setMessage} setUpdateCart={setUpdateCart} updateCart={false}/>
        )
       
        expect( queryByText("Seu carrinho está vazio 🛒")).toBeInTheDocument()
        expect( queryByText("Limpar carrinho")).not.toBeInTheDocument()
        expect(queryByText(`Total: R$0`) ).not.toBeInTheDocument()
        expect( queryByText("Finalizar compra")).not.toBeInTheDocument()

    
    })
})