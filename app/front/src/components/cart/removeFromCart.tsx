import { UpdateCartContext} from "@/context/cart.context"
import  { useContext } from "react"
import { FaTrash } from "react-icons/fa"
import React,{type SetStateAction} from "react"
import type { Message } from "../boxMessages"
import { useRemoveFromCart } from "./useRemoveFromCart"

type Props ={
    id:number,
    setMessage: React.Dispatch<SetStateAction<Message>>
}



export const RemoveFromCart = ({id,setMessage}:Props)=>{
    const {setUpdateCart} = useContext(UpdateCartContext)!
    const {onClick} = useRemoveFromCart({
        setMessage,
        setUpdateCart:setUpdateCart
    })
    const click = ()=>{
        onClick([id])
    }
    return <FaTrash  key={id} data-testid="delete-item" onClick={click}/>
    
}