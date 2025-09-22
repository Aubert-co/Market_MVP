import { removeItemFromCart } from "@/storage/cart.storage"
import React,{type SetStateAction} from "react"
import type { Message } from "../boxMessages"
import { deleteFromCart } from "@/services/cart.services"

type PropsRemove = {
    setMessage: React.Dispatch<SetStateAction<Message>>,
    setUpdateCart: React.Dispatch<React.SetStateAction<boolean>>
}
export const useRemoveFromCart = ({setMessage,setUpdateCart}:PropsRemove)=>{
    
    const onClick = async(values:Array<number>)=>{
        try {
        
            const {status} = await deleteFromCart(values)
        
            if (status === 200) {
                removeItemFromCart(values);
                setUpdateCart(true);
                setMessage({ content: 'Removido do carrinho com sucesso!', type: 'success' });
                return;
            }

            if (status === 401) {
                setMessage({ content: 'Sua sessão expirou. Faça login novamente.', type: 'error' });
                return;
            }

            setMessage({ content: 'Não foi possível remover o item. Tente novamente mais tarde.', type: 'error' });

        } catch (error) {
            setMessage({ content: 'Ocorreu um erro inesperado. Tente novamente.', type: 'error' });
        }
    }
    return {onClick}
}