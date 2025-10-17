import { CheckoutActions } from "@/components/checkout/checkoutActions"
import { fireEvent, render } from "@testing-library/react"
import * as storage from '@/storage/checkout.storage'

const removeItem  =jest.spyOn(storage,'removeItemCheckout')

describe('Remove item from checkout',()=>{
    it("should remove an item from the checkout successfully",()=>{
        const id = 1
        const quantity = 55
        const setUpdate = jest.fn()
        const stock = 55
        const {getByText} = render(
            <CheckoutActions
                id={id}
                quantity={quantity}
                setUpdate={setUpdate}
                stock={stock}
            />
        )
        const remove = getByText("Remover")
        expect( remove ).toBeInTheDocument()

        fireEvent.click( remove )

        expect( setUpdate ).toHaveBeenCalledTimes(1)
        expect( setUpdate ).toHaveBeenCalledWith( true )
        expect( removeItem ).toHaveBeenCalledTimes(1)
        expect( removeItem ).toHaveBeenCalledWith( id )
    })
})