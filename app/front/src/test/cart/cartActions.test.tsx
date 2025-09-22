
import { UpdateCartContext } from "@/context/cart.context"
import { fireEvent, render } from "@testing-library/react"
import * as storage from '@/storage/cart.storage'
import { CartActions } from "@/components/cart/cartActions"

const decreaseStorage = jest.spyOn(storage,'updateItemCart')
describe('Component UpdateCartQuantity',()=>{
    const setUpdateCart = jest.fn()
    const id = 3
    const setQuantity =jest.fn()
    const setMessage = jest.fn()
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should decrease and increase the quantity correctly",()=>{
        let quantity = 3
         setQuantity.mockImplementation((updater) => {
            if (typeof updater === "function") {
                updater( quantity ) 
            }
        })
        const {getByText}= render(

              <UpdateCartContext.Provider value={{
                            setUpdateCart,
                            updateCart:true
                        }}>
                            <CartActions stock={10} id={id} quantity={quantity} setMessage={setMessage}/>
                </UpdateCartContext.Provider>
        )

        const decrease = getByText("-")
        const increase = getByText("+")

        // now the quantity 3-1
        fireEvent.click( decrease )
        expect( setUpdateCart).toHaveBeenCalledTimes(1)
        expect( setUpdateCart ).toHaveBeenCalledWith(true)
        

        expect( decreaseStorage ).toHaveBeenCalledTimes(1)
        expect( decreaseStorage ).toHaveBeenCalledWith(id , quantity-1)

        
        expect( getByText( quantity -1)).toBeInTheDocument()

        // now the quantity is 2+1
        fireEvent.click( increase)
        expect( getByText( 3 )).toBeInTheDocument()
    })
    
})