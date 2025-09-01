import { createContext } from "react"

export type UpdateCart = boolean
export type UpdateCartState = {
    updateCart:UpdateCart,
    setUpdateCart:(state:UpdateCart)=>void,
}

export const UpdateCartContext = createContext<UpdateCartState | undefined>(undefined)



