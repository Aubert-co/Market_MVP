import { useEffect, useRef } from "react"
import { useBoxMessage } from "./useBoxMessages"
import { getMultiInputValues } from "@/utils"
import { checkIsAValidCategory, isAValidString ,checkIsAValidNumber,getValidImageFile} from "@/utils/checkIsValid"
import { serviceCreateProduct } from "@/services/admStore.services"
import type { OpenSideBarOuDrawer } from "@/types/storeDashboard.types"
import type { UpsertProducts } from "@/types/storeDashboard.types"


export type FormRefs = {
  nameRef: React.RefObject<HTMLInputElement | null>
  descriptionRef: React.RefObject<HTMLTextAreaElement | null>
  imageRef: React.RefObject<HTMLInputElement | null>
  priceRef: React.RefObject<HTMLInputElement | null>
  stockRef: React.RefObject<HTMLInputElement | null>
  categoryRef: React.RefObject<HTMLSelectElement | null>
  image?:string
}

export type UseUpsetProduct = {
  BoxMessage: () => React.ReactElement
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  refs:FormRefs,
}
type Props = {
  type:"create" | "update",
  valuesForm?:UpsertProducts,
   
  closeModal:(prop:OpenSideBarOuDrawer)=>void
}
export const  useUpsertProduct = ({type,valuesForm,closeModal}:Props): UseUpsetProduct => {

  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const stockRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
      if (type !== 'update' || !valuesForm) return
        const {
          name,
          description,
          price,
          stock,
          category,
          
      } = valuesForm

  if (nameRef.current) nameRef.current.value = name ?? ""
  if (descriptionRef.current) descriptionRef.current.value = description ?? ""
  if (priceRef.current) priceRef.current.value = price ?? ""
  if (stockRef.current) stockRef.current.value = stock ?? ""
  if (categoryRef.current) categoryRef.current.value = category ?? ""
 
  }, [type, valuesForm])
  const { setMessage, BoxMessage } = useBoxMessage({ styledType: "" })

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [name, description, price, stock, category] =
      getMultiInputValues(
        nameRef,
        descriptionRef,
        priceRef,
        stockRef,
        categoryRef
      )

    if (!isAValidString(name)) {
      setMessage({ content: "Digite um nome válido", type: "info" })
      return
    }

    if (!isAValidString(description, 199)) {
      setMessage({ content: "Digite uma descrição válida", type: "info" })
      return
    }

    if (!checkIsAValidNumber(price)) {
      setMessage({ content: "Digite um preço válido", type: "info" })
      return
    }

    if (!checkIsAValidNumber(stock)) {
      setMessage({ content: "Digite um estoque válido", type: "info" })
      return
    }

    if (!checkIsAValidCategory(category)) {
      setMessage({ content: "Selecione uma categoria", type: "info" })
      return
    }

    const file = getValidImageFile(imageRef)

    if (!file) {
      setMessage({ content: "Adicione uma imagem válida", type: "info" })
      return
    }

    const { status } = await serviceCreateProduct({
      name,
      description,
      price,
      stock,
      category,
      image: file
    })
    closeModal('drawer')
    if (status === 201) {
      setMessage({ content: "Produto criado com sucesso", type: "success" })
      return
    }

    if (status === 422) {
      setMessage({ content: "Campos inválidos!", type: "info" })
      return
    }

    setMessage({ content: "Algo deu errado ao criar produto!", type: "info" })
  }

  return {
    BoxMessage,
    submit,
    refs:{
        nameRef,
        priceRef,
        descriptionRef,
        categoryRef,
        imageRef,
        stockRef,
        image:valuesForm?.image
    },
    
  }
}