import { UpdateCartQuantity } from "@/components/cart/updateCartQuantity"
import { UpdateCartContext } from "@/context/cart.context"
import { fireEvent, render } from "@testing-library/react"
import * as storage from '@/storage/cart.storage'

const decreaseStorage = jest.spyOn(storage,'updateItemCart')
describe('Component UpdateCartQuantity',()=>{
    const setUpdateCart = jest.fn()
    const id = 3
    const setQuantity =jest.fn()
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should decrease the quantity correctly",()=>{
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
                            <UpdateCartQuantity stock={5} setQuantity={setQuantity} id={id} quantity={quantity}/>
                </UpdateCartContext.Provider>
        )

        const decrease = getByText("-")
 

        fireEvent.click( decrease )
        expect( setUpdateCart).toHaveBeenCalledTimes(1)
        expect( setUpdateCart ).toHaveBeenCalledWith(true)
        
        expect( setQuantity ).toHaveBeenCalledTimes(1)
        expect(setQuantity).toHaveBeenCalledWith(expect.any(Function))
        const updater = setQuantity.mock.calls[0][0]
        expect(updater(3)).toBe(2) 
        expect( decreaseStorage ).toHaveBeenCalledTimes(1)
        expect( decreaseStorage ).toHaveBeenCalledWith(id , quantity-1)
    })
    it("should increase the quantity correctly",async()=>{
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
                            <UpdateCartQuantity stock={6} setQuantity={setQuantity} id={id} quantity={quantity}/>
                </UpdateCartContext.Provider>
        )

      
        const increase =getByText("+")

        fireEvent.click( increase )
        expect( setUpdateCart).toHaveBeenCalledTimes(1)
        expect( setUpdateCart ).toHaveBeenCalledWith(true)
       
        expect( setQuantity ).toHaveBeenCalledTimes(1)
        expect(setQuantity).toHaveBeenCalledWith(expect.any(Function))
        const updater = setQuantity.mock.calls[0][0]
        expect(updater(3)).toBe(4) 
        expect( decreaseStorage ).toHaveBeenCalledTimes(1)
        expect( decreaseStorage ).toHaveBeenCalledWith(id , quantity+1)

       
    })
    it("should not decrease the quantity when the quantity is equal to 1",()=>{
        let quantity = 1
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
                            <UpdateCartQuantity stock={10} setQuantity={setQuantity} id={id} quantity={quantity}/>
                </UpdateCartContext.Provider>
        )

        const decrease = getByText("-")
 

        fireEvent.click( decrease )
        expect( setUpdateCart).toHaveBeenCalledTimes(0)
    
        expect( setQuantity ).toHaveBeenCalledTimes(0)
    
        expect( decreaseStorage ).toHaveBeenCalledTimes(0)
     
    })
     it("should not increase the quantity when the quantity is equal to 5",async()=>{
        let quantity = 5
       
        const {getByText}= render(

              <UpdateCartContext.Provider value={{
                            setUpdateCart,
                            updateCart:true
                        }}>
                            <UpdateCartQuantity stock={50} setQuantity={setQuantity} id={id} quantity={quantity}/>
                </UpdateCartContext.Provider>
        )

      
        const increase =getByText("+")

        fireEvent.click( increase )
        expect( setUpdateCart).toHaveBeenCalledTimes(0)
        expect( setQuantity ).toHaveBeenCalledTimes(0)
        expect( decreaseStorage ).toHaveBeenCalledTimes(0)
     

       
    })
      it("should not allow increasing quantity beyond available stock of 3",async()=>{
        let quantity = 3
        const stock = 3
        const {getByText}= render(

              <UpdateCartContext.Provider value={{
                            setUpdateCart,
                            updateCart:true
                        }}>
                            <UpdateCartQuantity stock={stock} setQuantity={setQuantity} id={id} quantity={quantity}/>
                </UpdateCartContext.Provider>
        )

      
        const increase =getByText("+")

        fireEvent.click( increase )
        expect( setUpdateCart).toHaveBeenCalledTimes(0)
        expect( setQuantity ).toHaveBeenCalledTimes(0)
        expect( decreaseStorage ).toHaveBeenCalledTimes(0)
     

       
    })
})