import { createContext } from "react"

export type UpdateCart = boolean
export type UpdateCartState = {
    updateCart:UpdateCart,
    setUpdateCart: React.Dispatch<React.SetStateAction<UpdateCart>>
}

export const UpdateCartContext = createContext<UpdateCartState | undefined>(undefined)



