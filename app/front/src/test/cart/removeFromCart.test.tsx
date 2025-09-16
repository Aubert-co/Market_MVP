import { RemoveFromCart } from "@/components/cart/removeFromCart";
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as services from '@/services/cart.services'
import * as storages from '@/storage/cart.storage' 
import { UpdateCartContext } from "@/context/cart.context";
import type { Response } from "@/types/services.types";

const deleteFromCart = jest.spyOn(services,'deleteFromCart')

const storage = jest.spyOn(storages,'removeItemFromCart')
describe("Component RemoveFromCart",()=>{
    const setMessage = jest.fn()
    const setUpdateCart = jest.fn()
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should remove an item from the cart successfully",async()=>{
        deleteFromCart.mockResolvedValue({status:201,message:'ee'}as Response) 
        const {getByTestId} =render(
            <UpdateCartContext.Provider value={{
                setUpdateCart,
                updateCart:true
            }}>
                <RemoveFromCart id={1} setMessage={setMessage}/>
            </UpdateCartContext.Provider>
        )
        const btn = getByTestId("delete-item")

    
        fireEvent.click( btn )
        
       await waitFor(() => {});
        
        expect(storage).toHaveBeenCalledTimes(1);
        expect(setUpdateCart).toHaveBeenCalledWith(true);
        expect(setMessage).toHaveBeenCalledTimes(1);
        expect(setMessage).toHaveBeenCalledWith({
            content: 'Removido do carrinho com sucesso!',
            type: 'success'
        });
        
    })
    it("should not remove the item if the user is not logged in",async()=>{
        deleteFromCart.mockResolvedValue({status:401,message:'ee'}as Response) 
        const {getByTestId} =render(
            <UpdateCartContext.Provider value={{
                setUpdateCart,
                updateCart:true
            }}>
                <RemoveFromCart id={1} setMessage={setMessage}/>
            </UpdateCartContext.Provider>
        )
        const btn = getByTestId("delete-item")

    
        fireEvent.click( btn )
        
       await waitFor(() => {});
        
        expect(storage).toHaveBeenCalledTimes(0);
        expect(setUpdateCart).not.toHaveBeenCalled();
        expect(setMessage).toHaveBeenCalledTimes(1);
        expect(setMessage).toHaveBeenCalledWith({
            content: 'Sua sessão expirou. Faça login novamente.',
            type: 'error'
        });
        
    })
     it("should not remove the item if the status is 500",async()=>{
        deleteFromCart.mockResolvedValue({status:500,message:'ee'}as Response) 
        const {getByTestId} =render(
            <UpdateCartContext.Provider value={{
                setUpdateCart,
                updateCart:true
            }}>
                <RemoveFromCart id={1} setMessage={setMessage}/>
            </UpdateCartContext.Provider>
        )
        const btn = getByTestId("delete-item")

    
        fireEvent.click( btn )
        
       await waitFor(() => {});
        
        expect(storage).toHaveBeenCalledTimes(0);
        expect(setUpdateCart).not.toHaveBeenCalled();
        expect(setMessage).toHaveBeenCalledTimes(1);
        expect(setMessage).toHaveBeenCalledWith({
            content: 'Não foi possível remover o item. Tente novamente mais tarde.',
            type: 'error'
        });
        
    })
    it("should not remove the item if the service throws an error",async()=>{
        deleteFromCart.mockRejectedValue({status:500,message:'ee'}as Response) 
        const {getByTestId} =render(
            <UpdateCartContext.Provider value={{
                setUpdateCart,
                updateCart:true
            }}>
                <RemoveFromCart id={1} setMessage={setMessage}/>
            </UpdateCartContext.Provider>
        )
        const btn = getByTestId("delete-item")

    
        fireEvent.click( btn )
        
       await waitFor(() => {});
        
        expect(storage).toHaveBeenCalledTimes(0);
        expect(setUpdateCart).not.toHaveBeenCalled();
        expect(setMessage).toHaveBeenCalledTimes(1);
        expect(setMessage).toHaveBeenCalledWith({
            content: 'Ocorreu um erro inesperado. Tente novamente.',
            type: 'error'
        });
        
    })
})
