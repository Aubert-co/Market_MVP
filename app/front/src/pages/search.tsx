import { FilterProducts } from "@/components/filterProducts"
import { Container } from "@/components/layouts/container"
import { BoxProducts } from "@/components/product/boxProducts"
import { usableFetch } from "@/services/fetchs"
import { searchProduct, type BodySearch } from "@/services/productsService"
import type { Product } from "@/types/products.types"
import type { Filter } from "@/types/filters"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Collapse } from "@/components/collapse"
import styled from "styled-components"

type ProductState ={
  datas: Product[];
  status: number;
  message:string
}

const SearchBox = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; 
  width: 95%;
  height: 100%;
  gap : 20px;
  .filtered{
    margin-left:15%;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .collapse-container {
      width: 70%;
      background: #ffffff; 
      border-radius: 12px;
      border: 1px solid rgba(0,0,0,0.08);
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
      transition: all 0.3s ease;
      justify-self:start;
    }
    .filtered{
      width:100%;
    }
  }
`;

export const Search  = ()=>{
    const [products,setProducts] = useState<ProductState>({
        datas:[] as Product[],status:0,message:''
    })
    const {product} = useParams()
    const [values,setValues] = useState<Filter>({
        minPrice:0,maxPrice:0,orderBy:'asc',category:'Todas'
    })
    useEffect(()=>{
      usableFetch<Product[],BodySearch>({
      body:{name:product , ...values},
      service:searchProduct,
      setDatas:setProducts
      })
    },[product,values])
    return (
        <Container>
            <SearchBox>
                <div className="filtered">
                    <Collapse title="Filtrar">
                        <FilterProducts setValues={setValues}/>
                    </Collapse>
                </div>
            
                <BoxProducts datas={products.datas} status={products.status}/>
            </SearchBox>
        </Container>
    )
}