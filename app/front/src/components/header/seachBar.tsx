import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getInputValue } from "@/utils"

type Props = {
    type?:"useSearch" | "admSearch",
}
export const SearchBar = ({type}:Props)=>{
    const navigate = useNavigate()
    const searchRef = useRef<HTMLInputElement >(null)

    const onClick = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        let search = getInputValue(searchRef)

        if( !search ){
            return;
        }
        if(type === "admSearch"){
            
        }
        navigate(`/buscas/${search}`)
        
    }
    return (

        <form onSubmit={(e)=>onClick(e)} className="search">
            <div className="search-items">
                <input ref={searchRef}  name="input_search"  minLength={2} maxLength={20} className="input_search"  placeholder="FAÇA UMA BUSCA"/>
                <button className="btn_search" type="submit" >BUSCAR</button>
            </div>
        </form>
    )
}