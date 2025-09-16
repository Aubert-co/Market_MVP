import { getItemsFromCart, saveCart,updateItemCart ,removeItemFromCart} from "@/storage/cart.storage"
import { CART_KEY } from "@/constants"
import { userCartMocks } from "../mock"
import * as storages from '@/storage/cart.storage'

const getItem = jest.spyOn(window.localStorage.__proto__,'getItem')
const setItem = jest.spyOn(window.localStorage.__proto__,'setItem')
const mockDate = 13455567677
jest.spyOn(Date,'now').mockReturnValue(mockDate)


describe("localStorage operations for cart",()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
        jest.clearAllMocks()
    })
    it("sshould get items from localStorage correctly",()=>{
    
        getItemsFromCart()
        expect( getItem ).toHaveBeenCalledTimes(1)
        expect( getItem ).toHaveBeenCalledWith(CART_KEY)
    })
    it("should save the items in localStorage correctly",()=>{
        const updatedAt = 3844343311
        const [cart] = userCartMocks
        saveCart({
            cart:[cart],
            updatedAt,
            isSaved:true
        })

        expect( setItem ).toHaveBeenCalledTimes(1)
        const savedValue = JSON.parse( setItem.mock.calls[0][1] as string  ) 
        expect(savedValue).toEqual(expect.objectContaining({
            cart: [cart],
            isSaved: true,
            updatedAt: expect.any(Number)
        }))

    })
    it("should update the values in localStorage correctly",()=>{
        const [cart] = userCartMocks
        const quantity = 3
        jest.spyOn(storages,'getItemsFromCart').mockReturnValue( { cart:[cart], updatedAt:3144,isSaved:true} )
        const setItem = jest.spyOn(storages,'saveCart')
        updateItemCart(cart.id, quantity)
        cart.quantity = quantity
        
        expect( setItem ).toHaveBeenCalledTimes(1)
        expect( setItem ).toHaveBeenCalledTimes(1)
        expect( setItem ).toHaveBeenCalledWith({
            cart:[cart],
            updatedAt:Date.now(),
            isSaved:false
        })        
    })
    it("should remove only one item from localStorage",()=>{
        const [ cart ,cart2] = userCartMocks
        jest.spyOn(storages,'getItemsFromCart').mockReturnValue({cart:[cart,cart2],isSaved:true,updatedAt:Date.now()})
        const setItem = jest.spyOn(storages,'saveCart')
        removeItemFromCart([cart.id])

        expect(setItem).toHaveBeenCalledTimes(1)
        expect(setItem).toHaveBeenCalledWith({cart:[cart2],isSaved:false,updatedAt:Date.now()})
    })
    it("should remove all values from localStorage correctly",()=>{
        const [ cart ,cart2] = userCartMocks
        jest.spyOn(storages,'getItemsFromCart').mockReturnValue({cart:[cart,cart2],isSaved:true,updatedAt:Date.now()})
        const setItem = jest.spyOn(storages,'saveCart')
        removeItemFromCart([cart.id,cart2.id])

        expect(setItem).toHaveBeenCalledTimes(1)
        expect(setItem).toHaveBeenCalledWith({cart:[],isSaved:false,updatedAt:Date.now()})
    })
    it("should not remove anything when there is nothing in localStorage",()=>{
     
        jest.spyOn(storages,'getItemsFromCart').mockReturnValue({cart:[],isSaved:true,updatedAt:Date.now()})
        const setItem = jest.spyOn(storages,'saveCart')
        removeItemFromCart([])

        expect(setItem).toHaveBeenCalledTimes(0)
       
    })
    
})