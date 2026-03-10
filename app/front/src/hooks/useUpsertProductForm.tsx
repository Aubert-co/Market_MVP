import type { UpsertProducts } from "@/types/storeDashboard.types"
import { useEffect, useRef } from "react"
import type { UpsertProductsRefs } from "./useUpsertProduct"


type UseUpsetProductForm = {
  refs:UpsertProductsRefs
}

export const useUpsertProductForm = (valuesForm: UpsertProducts, type: "create" | "update"):UseUpsetProductForm => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const stockRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (type !== "update") return

    if (nameRef.current) nameRef.current.value = valuesForm.name
    if (descriptionRef.current) descriptionRef.current.value = valuesForm.description
    if (priceRef.current) priceRef.current.value = String(valuesForm.price)
    if (stockRef.current) stockRef.current.value = String(valuesForm.stock)
    if (categoryRef.current) categoryRef.current.value = valuesForm.category
  }, [type, valuesForm])

  

  return {
    refs: {
      nameRef,
      descriptionRef,
      imageRef,
      priceRef,
      stockRef,
      categoryRef
    },
  }
}