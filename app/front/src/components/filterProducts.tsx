import { InputWithLabel } from "@/components/forms/inputWithLabel"
import { useSelect } from "@/hooks/useSelect"
import {  mappedCateogires } from "@/constants"
import type { Filter, OrderBy,CategoryMapped,DatasSelect } from "@/types/filters"
import { getMultiInputValues } from "@/utils"
import { useRef, type SetStateAction } from "react"
import styled from "styled-components"

export const FilterProductsContainer = styled.form`
  width: 100%;                
  max-width: 900px;         

  padding: 14px 18px;
  display: flex;
  flex-direction:column;
  gap: 16px;
  
  justify-self:center;
  border-radius: 12px;
 


  .input-with-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 150px;
  }


  .input-with-label label {
    font-size: 14px;
    font-weight: 500;
  }

  select,
  input {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #d0d0d0;
    font-size: 14px;
    max-width:90%;
  }
  select{
    max-width:97%;
  }

  .btn-actions {
    display: flex;
    gap: 10px;
  }

  .btn-actions button {
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    background: #165eeeff;
    color: #fff;
    transition: 0.2s;
  }

  .btn-actions button:nth-child(2) {
    background: #777;
  }

  .btn-actions button:hover {
    opacity: 0.85;
  }


  @media (max-width: 768px) {
    width: 95%;       
    flex-direction: column;
    align-items: stretch;

    .input-with-label {
      width: 100%;
    }

    .btn-actions {
      width: 100%;
      justify-content: space-between;
    }
  }
`;
type Props = {
  setValues:React.Dispatch<SetStateAction<Filter>>
}
const DATASORDERBY = [{value:'asc',text:'menor preço'},{value:'desc',text:'maior preço'}] as DatasSelect<OrderBy>[];


export const FilterProducts = ({setValues}:Props)=>{
    const {Select:SelectCategory,selected:category,setSelected:setCategory} = useSelect<CategoryMapped>(
        {datas:mappedCateogires,text:'Selecione uma categoria',className:"select-category"});

    const {Select:SelectOrderBy,selected:orderBy,setSelected:setOrder} = useSelect<OrderBy>(
        {datas:DATASORDERBY,text:'Ordene por',className:"order-by"});
  
    const minPriceRef = useRef<any>('0')
    const maxPriceRef = useRef<any>('0')

    const onClick = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
    
      const [maxPrice,minPrice] = getMultiInputValues(maxPriceRef,minPriceRef)
    
      setValues({
        category,
        orderBy,
        maxPrice:Number(maxPrice),
        minPrice:Number(minPrice)
      })
        
    }
    const onClean = ()=>{
      setCategory("Todas")
      setOrder("asc")
      minPriceRef.current.value = ""
      maxPriceRef.current.value = ""
    }
    return(
        <FilterProductsContainer onSubmit={onClick} className="filter-products">
           
            <InputWithLabel textLabel="ordernar por:" inputName="checkboxes">
                <SelectOrderBy/>
            </InputWithLabel>
            <InputWithLabel textLabel="Preço minimo:" inputName="min-price">
                <input  placeholder="0" data-testid="min-price" type="number" ref={minPriceRef} name="min-price"/>
            </InputWithLabel>

            <InputWithLabel textLabel="Preço maximo:" inputName="max-price">
                <input placeholder="0" data-testid="max-price" name="max-price" type="number" ref={maxPriceRef}/>
            </InputWithLabel>
            <InputWithLabel textLabel="Selecione uma categoria:" inputName="">
                <SelectCategory/>
            </InputWithLabel>
            <div className="btn-actions">
                <button type="submit">Enviar</button>
                <button type="button" onClick={onClean}>Limpar</button>
            </div>
        </FilterProductsContainer>
    )
}