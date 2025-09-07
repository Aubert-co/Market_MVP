import { categories } from "@/constants"
import {  useState } from "react"


export const useSearchByCategory = ()=>{
    const [category,setCategory] = useState("")
    const [values,_] = useState( ["Todas",...categories])
   
    const SearhByCategory = ()=>{
        return (
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option disabled >Selecione uma categoria</option>
            {values.map((val,index)=><option key={index}>{val}</option>)}
        </select>)
    }
    return {category,setCategory,SearhByCategory}
}