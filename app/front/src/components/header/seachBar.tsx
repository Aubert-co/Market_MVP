import { useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getInputValue } from "@/utils"
import type { NavigateMode } from "./topBar"


type Props = {
    searchEvent:SearchEvent
}
type Params = {
    mode:NavigateMode
}
type SearchEvent = (params:string)=>void

export const useSearch = ({mode}:Params)=>{
    const [searchProduct,setSearchProduct] = useState<string>()
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const searchEvent = (search:string)=>{

        if(mode === "navigate"){
            navigate({
                pathname: "/buscas",
                search: new URLSearchParams({ q: search }).toString()
            });
            return;
        }
        const newParams = new URLSearchParams(searchParams);
        newParams.set("q", search);
        
        setSearchParams(newParams);
        setSearchProduct(search)
    }
    return {
        searchProduct,setSearchProduct,
        searchEvent
    }
}
export const SearchBar = ({searchEvent}:Props)=>{
    const searchRef = useRef<HTMLInputElement >(null)
    const onClick = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        let search = getInputValue(searchRef)
        if(search.length ===0)return;

        searchEvent( search )
        
    }
    return (
        <form onSubmit={(e)=>onClick(e)} className="search" name="form_search">
            <div className="search-items">
                <input ref={searchRef}  name="input_search"  minLength={2} maxLength={20} className="input_search"  placeholder="FAÇA UMA BUSCA"/>
                <button className="btn_search" name="btn_search" type="submit" >BUSCAR</button>
            </div>
        </form>
    )
}