import { useBoxMessage } from "./useBoxMessages"
import { getMultiInputValues } from "@/utils"
import { checkIsAValidCategory, isAValidString ,checkIsAValidNumber,getValidImageFile, buildUpdatePayload, hasChanges} from "@/utils/checkIsValid"

import type { OpenSideBarOuDrawer } from "@/types/storeDashboard.types"
import type { UpsertProducts } from "@/types/storeDashboard.types"
import { serviceCreateProduct, serviceUpdateProduct } from "@/services/store/productAdmin"
import { renderMessage } from "@/utils/returnMessages"


export type UpsertProductsRefs = {
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
}
type Props = {
  type:"create" | "update",
  valuesRef:UpsertProductsRefs,
  closeModal:(prop:OpenSideBarOuDrawer)=>void,
  originalValues:UpsertProducts
}


export const  useUpsertProduct = ({type,valuesRef,closeModal,originalValues}:Props): UseUpsetProduct => {

  const {nameRef,descriptionRef,priceRef,stockRef,categoryRef,imageRef} = valuesRef
 
  const { setMessage, BoxMessage } = useBoxMessage({ styledType: "" })


  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
     const [name,description,price,stock,category] = getMultiInputValues(nameRef,descriptionRef,priceRef,stockRef,categoryRef)
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

    if(type === "update"){
      const originalFields = {
        name:originalValues.name,
        category:originalValues.category,
        price:originalValues.price,
        stock:originalValues.stock,
        description:originalValues.description
      }
      if(!hasChanges(originalFields,{name,description,category,stock,price}) && !file){
     
        setMessage({content:"Campos não foram alterados",type:'info'})
        return;
      }
      const payload = buildUpdatePayload({
        originalFields,
        newFields:{
          name,description,category,stock,price
        }
      })
    
      const {status} = await serviceUpdateProduct({...payload,id:originalValues.id,image:file})
      const {content,type:typeMessage} = renderMessage({action:'update',status})

      setMessage({content,type:typeMessage})
      if(status === 201)closeModal(null)
      return;
    }
    if (!file ) {
      setMessage({ content: "Adicione uma imagem", type: "info" })
      return
    } 

   
      const {status} = await serviceCreateProduct({
        name,
        image: file,
        description,
        category,
        stock,
        price
      })
      const { content,type:typeMessage} = renderMessage({action:"create",status})
      setMessage({content,type:typeMessage})
      if(status === 201){
        closeModal(null)
      }
    }

    
  return {
    BoxMessage,
    submit,
  }
}

