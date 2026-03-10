import { categories } from "@/constants/filters"
import {  UserFormStyles } from "@/styles/forms.style"
import { InputWithLabel } from "./inputWithLabel"
import { useUpsertProduct, type UpsertProductsRefs, type UseUpsetProduct } from "@/hooks/useUpsertProduct"
import type { OpenSideBarOuDrawer } from "@/types/storeDashboard.types"
import type { UpsertProducts } from "@/types/storeDashboard.types"
import { loadImage } from "@/utils"
import { ButtonsDiv, PrimaryButton } from "@/styles/shared.style"
import { useUpsertProductForm } from "@/hooks/useUpsertProductForm"


type PropsHandle ={
    type: "create" | "update"
    onSend?:()=>void,
    onCancel:(props:OpenSideBarOuDrawer)=>void,
    editRefs:UpsertProducts
}

export const HandlerFormUpsetProduct = ({type,editRefs,onCancel}:PropsHandle)=>{
    const {refs} = useUpsertProductForm(editRefs,type)
    const {submit,BoxMessage} = useUpsertProduct({type,originalValues:editRefs,valuesRef:refs,closeModal:onCancel})

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
    refs:UpsertProductsRefs
}
const renderCategoryOptions = (categories: string[]) =>
  categories.map(category => (
    <option key={category} value={category}>
      {category}
    </option>
  ))

export const FormUpsertProduct = ({refs,submit,BoxMessage,type,onCancel}:Props)=>{
   
    return(
        <UserFormStyles $minHeight="none"> 
            <form onSubmit={submit}>
                <BoxMessage/>
                <InputWithLabel inputName="product_name" textLabel="Defina um nome que ajude os clientes a encontrarem seu produto">
                    <input placeholder="Ex: camisa polo" className="input-form"
                    ref={refs.nameRef} 
                    id="product_name"
                    maxLength={14} 
                    type="text" 
                    data-testid="upsert-name"
                    />
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
                        data-testid="upsert-description"
                        />
                </InputWithLabel>
                    {type === "update"  && <img data-testid="upsert-image-update" src={refs.image && loadImage(refs.image)}/>}
                <InputWithLabel textLabel="Digite o preço do seu produto" inputName="price">
                    <input 
                    placeholder="Ex: 19.99"
                    className="input-form" 
                    ref={refs.priceRef} 
                    type="number" 
                    id="price"
                    step={"0.01"}
                    data-testid="upsert-price"
                    />
                </InputWithLabel>

                <InputWithLabel textLabel="Digite a quantidade de produtos" inputName="stock">
                    <input 
                    placeholder="Ex: 10" 
                    className="input-form"
                    ref={refs.stockRef} 
                    type="number" 
                    id="stock"
                    data-testid="upsert-stock"
                    />
                </InputWithLabel>
                
                <InputWithLabel textLabel="Selecione a categoria que mais representa o seu produto" inputName="category">
                    <select data-testid="select-product" ref={refs.categoryRef} id="category" >
                    <option value="">Selecione uma categoria</option>
                    {renderCategoryOptions(categories)}
                </select>
                </InputWithLabel> 
                <BoxMessage/>

                <ButtonsDiv>
                    <PrimaryButton type="submit" >Enviar</PrimaryButton>
                    <PrimaryButton type="button"
                        $bg="#FF6B6B" 
                        $hoverBg="#FF4C4C" 
                        $color="#fff" 
                        onClick={()=>onCancel(null)}
                        >
                        Cancelar
                    </PrimaryButton>

                </ButtonsDiv>
            </form>
        </UserFormStyles>
    )    
}