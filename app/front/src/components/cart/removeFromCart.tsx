import { UpdateCartContext } from "@/context/cart.context"
import { removeItemFromCart } from "@/storage/cart.storage"
import  { useContext } from "react"
import { FaTrash } from "react-icons/fa"

type Props ={
    id:number
}
export const RemoveFromCart = ({id}:Props)=>{
    const {setUpdateCart} = useContext(UpdateCartContext)!
    const click = ()=>{
       
        removeItemFromCart(id)
        setUpdateCart(true)
    }
    return <FaTrash onClick={click}/>
    
}