import { categories } from "@/constants"
import { StyleBtn, UserFormStyles } from "@/styles/forms.style"
import { InputWithLabel } from "./inputWithLabel"
import { useUpsertProduct, type UseUpsetProduct } from "@/hooks/useUpsertProduct"
import type { OpenSideBarOuDrawer } from "@/types/storeDashboard.types"
import type { UpsertProducts } from "@/types/storeDashboard.types"
import { loadImage } from "@/utils"


type PropsHandle ={
    type: "create" | "update"
    onSend?:()=>void,
    onCancel:(props:OpenSideBarOuDrawer)=>void,
    editRefs?:UpsertProducts
}

export const HandlerFormUpsetProduct = ({type,editRefs,onCancel}:PropsHandle)=>{
    const {submit,BoxMessage,refs} = useUpsertProduct({type,valuesForm:editRefs,closeModal:onCancel})

    return (
        <FormUpsertProduct
            submit={submit}
            BoxMessage={BoxMessage}
            refs={refs}
            type={type}
            onCancel={onCancel}
        />
    )
}
type Props = UseUpsetProduct &{
    type:"create" | "update",
    onCancel:(v:null)=>void
}
const renderCategoryOptions = (categories: string[]) =>
  categories.map(category => (
    <option key={category} value={category}>
      {category}
    </option>
  ))

export const FormUpsertProduct = ({refs,submit,BoxMessage,type,onCancel}:Props)=>{
 
    return(
        <UserFormStyles>
            <form onSubmit={submit}>
                {type === "create" ? <h1 className="type_form">Criar produto</h1> :
                 <h1 className="type_form">Editar produto</h1>}
                {type === "update"  && <img src={refs.image && loadImage(refs.image)}/>}
                <BoxMessage/>
                <InputWithLabel inputName="product_name" textLabel="Defina um nome que ajude os clientes a encontrarem seu produto">
                    <input placeholder="Ex: camisa polo" className="input-form"
                    ref={refs.nameRef} 
                    id="product_name"
                    maxLength={15} 
                    type="text" />
                </InputWithLabel>

                <InputWithLabel inputName="image" textLabel="Imagem do produto:">
                    <input className="input-form"
                        ref={refs.imageRef} 
                        type="file" 
                        id="image" 
                        accept="image/*"
                        data-testid="image-product"
                        />
                </InputWithLabel>

                <InputWithLabel inputName="description" textLabel="Descrição do produto" >
                     <textarea placeholder="Ex: uma camisa para eventos..."
                        className="input-form" 
                        ref={refs.descriptionRef} 
                        id="description" 
                        maxLength={199}
                        />
                </InputWithLabel>

                <InputWithLabel textLabel="Digite o preço do seu produto" inputName="price">
                    <input 
                    placeholder="Ex: 19.99"
                    className="input-form" 
                    ref={refs.priceRef} 
                    type="number" 
                    id="price"/>
                </InputWithLabel>

                <InputWithLabel textLabel="Digite a quantidade de produtos" inputName="stock">
                    <input 
                    placeholder="Ex: 10" 
                    className="input-form"
                    ref={refs.stockRef} 
                    type="number" 
                    id="stock"/>
                </InputWithLabel>
                
                <InputWithLabel textLabel="Selecione a categoria que mais representa o seu produto" inputName="category">
                    <select data-testid="select-product" ref={refs.categoryRef} id="category" >
                    <option value="">Selecione uma categoria</option>
                   {renderCategoryOptions(categories)}
                </select>
                </InputWithLabel>
                  <BoxMessage/>
                <StyleBtn >Enviar</StyleBtn>
                <StyleBtn type="button" onClick={()=>onCancel(null)}>Cancelar</StyleBtn>
            </form>
        </UserFormStyles>
    )    
}